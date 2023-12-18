import type { GameData } from '~/types'

export default defineEventHandler(async (event): Promise<GameData> => {
  const { database, closeConnection } = useMysql(event)
  const { id } = getQuery(event)

  const [gameData] = await database('games_data').where('id', id)
  closeConnection()

  if (!gameData) {
    throw createError({
      status: 404,
      statusMessage: `id=${id} doesn't exist in the database`
    })
  }

  return gameData
})

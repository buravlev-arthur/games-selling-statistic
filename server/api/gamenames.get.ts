import { Games, Game } from '~/types'

export default defineEventHandler(async (event): Promise<Games> => {
  const { database, closeConnection } = useMysql(event)
  const games = await database<Game>('games').orderBy('id')
  closeConnection()
  return games
})

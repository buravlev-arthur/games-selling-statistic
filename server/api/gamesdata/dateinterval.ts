import type { GameDataInsertInstances, DateIntervalQueryParams } from '~/types'

export default defineEventHandler(async (event) => {
  const { from, until } = getQuery<DateIntervalQueryParams>(event)
  const { database, closeConnection } = useMysql(event)

  if (new Date(from) > new Date(until)) {
    throw createError({
      status: 400,
      statusMessage: '"until" query property must be more than "from" or equal'
    })
  }

  const rows = await database<GameDataInsertInstances>('games_data')
    .orderBy('parsed_date')
    .whereBetween('parsed_date', [new Date(from), new Date(until)])
  await closeConnection()

  return rows
})

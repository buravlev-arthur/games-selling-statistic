import { MinDate, MaxDate, AvailableDatesResponse } from '~/types'

export default defineEventHandler(
  async (event): Promise<AvailableDatesResponse> => {
    const { database, closeConnection } = useMysql(event)

    const [{ 'min(`parsed_date`)': minDate }] =
      await database('games_data').min<MinDate>('parsed_date')
    const [{ 'max(`parsed_date`)': maxDate }] =
      await database('games_data').max<MaxDate>('parsed_date')
    await closeConnection()

    return { min: new Date(minDate), max: new Date(maxDate) }
  }
)

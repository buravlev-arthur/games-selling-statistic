import { Editions, Edition } from '~/types'

export default defineEventHandler(async (event): Promise<Editions> => {
  const { database, closeConnection } = useMysql(event)
  const editions = await database<Edition>('editions').orderBy('id')
  closeConnection()
  return editions
})

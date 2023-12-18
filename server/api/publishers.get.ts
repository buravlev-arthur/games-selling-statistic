import { Publisher, Publishers } from '~/types'

export default defineEventHandler(async (event): Promise<Publishers> => {
  const { database, closeConnection } = useMysql(event)
  const publishers = await database<Publisher>('publishers').orderBy('id')
  closeConnection()
  return publishers
})

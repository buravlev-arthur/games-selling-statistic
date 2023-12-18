import { Shop, Shops } from '~/types'

export default defineEventHandler(async (event): Promise<Shops> => {
  const { database, closeConnection } = useMysql(event)
  const shops = await database<Shop>('shops').orderBy('id')
  closeConnection()
  return shops
})

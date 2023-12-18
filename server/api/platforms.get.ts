import { Platform, Platforms } from '~/types'

export default defineEventHandler(async (event): Promise<Platforms> => {
  const { database, closeConnection } = useMysql(event)
  const platforms = await database<Platform>('platforms').orderBy('id')
  closeConnection()
  return platforms
})

import knex from 'knex'
import type { UseMysql } from '~/types'

export const useMysql: UseMysql = (event) => {
  const config = useRuntimeConfig(event)

  const database = knex({
    client: 'mysql2',
    connection: {
      host: config.dbHost,
      port: Number(config.dbPort),
      user: config.dbUser,
      password: config.dbPassword,
      database: config.dbName
    }
  })

  const closeConnection = async () => {
    await database.destroy()
  }

  return { database, closeConnection }
}

import type { Knex } from 'knex'
import type { H3Event, EventHandlerRequest } from 'h3'

export type UseMysql = (event: H3Event<EventHandlerRequest>) => {
  database: Knex
  closeConnection: () => Promise<void>
}

export interface DateIntervalQueryParams {
  from: string
  until: string
}

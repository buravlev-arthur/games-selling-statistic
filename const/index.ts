import type { Periods } from '~/types'

export const periods: Periods = {
  day: 0,
  week: 7,
  month: 30,
  season: 90,
  year: 365
}

export const defaultPeriod: keyof Periods = 'week'

export const textColor: string = '#fff'

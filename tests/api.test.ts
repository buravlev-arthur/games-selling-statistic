import { fileURLToPath } from 'node:url'
import { describe, expect, test } from 'vitest'
import { setup, fetch } from '@nuxt/test-utils'

describe('API Testing', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('..', import.meta.url))
  })

  test('Getting terminal dates', async () => {
    const response = await fetch('/api/gamesdata/availabledates')
    const jsonData = await response.json()
    expect(response.status).toEqual(200)
    expect(jsonData.min).toBeTypeOf('string')
    expect(jsonData.max).toBeTypeOf('string')
    expect(new Date(jsonData.min)).toBeTruthy()
    expect(new Date(jsonData.max)).toBeTruthy()
  })

  test('Getting data by date interval', async () => {
    const getRequestUrl = (dates: { from: string; until: string }): string => {
      return `/api/gamesdata/dateinterval?from=${dates.from}&until=${dates.until}`
    }
    const existDates = {
      from: '12/13/2023',
      until: '12/14/2023'
    }
    const invalidDates = {
      from: '12/15/2023',
      until: '12/14/2023'
    }
    const nonExistDates = {
      from: '12/10/2022',
      until: '12/20/2022'
    }

    const existDatesResponse = await fetch(getRequestUrl(existDates))
    const existData = await existDatesResponse.json()
    const { status: invalidResponseStatus } = await fetch(
      getRequestUrl(invalidDates)
    )
    const nonExistDatesResponse = await fetch(getRequestUrl(nonExistDates))
    const nonExistData = await nonExistDatesResponse.json()

    expect(invalidResponseStatus).toEqual(400)
    expect(Array.isArray(nonExistData)).toBeTruthy()
    expect(nonExistData.length).toEqual(0)
    expect(Array.isArray(existData)).toBeTruthy()
    expect(existData.length).not.toEqual(0)
    expect(new Date(existData[0].parsed_date)).toEqual(
      new Date(existDates.from)
    )
    expect(new Date(existData[existData.length - 1].parsed_date)).toEqual(
      new Date(existDates.until)
    )
  })
})

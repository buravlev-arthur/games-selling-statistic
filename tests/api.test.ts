import { fileURLToPath } from 'node:url'
import { describe, expect, test } from 'vitest'
import { setup, fetch } from '@nuxt/test-utils'
import type { Publishers } from '~/types'

describe('API testing', async () => {
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

  test('Getting game data by date interval', async () => {
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

  test('Getting game data by id', async () => {
    const existId = 450
    const nonExistId = 1
    const existResponse = await fetch(`/api/gamesdata/byid?id=${existId}`)
    const nonExistResponse = await fetch(`/api/gamesdata/byid?id=${nonExistId}`)
    const existGameData = await existResponse.json()
    expect(existGameData.id).toEqual(existId)
    expect(nonExistResponse.status).toEqual(404)
  })

  test('Getting game names', async () => {
    const response = await fetch('/api/gamenames')
    const gameNames = await response.json()
    expect(Array.isArray(gameNames)).toBeTruthy()
    expect(gameNames.length).not.toEqual(0)
    expect(gameNames[0].name).toBeTypeOf('string')
    expect(gameNames[0].name.length).not.toEqual(0)
    expect(gameNames[0].alias_3).toBeDefined()
  })

  test('Getting editions', async () => {
    const response = await fetch('/api/editions')
    const editions = await response.json()
    expect(Array.isArray(editions)).toBeTruthy()
    expect(editions.length).not.toEqual(0)
    expect(editions[0].name).toBeTypeOf('string')
    expect(editions[0].name.length).not.toEqual(0)
    expect(editions[0].name_rus).toBeDefined()
  })

  test('Getting platforms', async () => {
    const response = await fetch('/api/platforms')
    const platforms = await response.json()
    expect(Array.isArray(platforms)).toBeTruthy()
    expect(platforms.length).not.toEqual(0)
    expect(platforms[0].name).toBeTypeOf('string')
    expect(platforms[0].name.length).not.toEqual(0)
    expect(platforms[0].manufactorer).toBeDefined()
  })

  test('Getting publishers', async () => {
    const response = await fetch('/api/publishers')
    const publishers: Publishers = await response.json()
    const index = publishers.findIndex(({ name }) => name === 'Rockstar Games')
    expect(Array.isArray(publishers)).toBeTruthy()
    expect(publishers.length).not.toEqual(0)
    expect(publishers[0].name).toBeTypeOf('string')
    expect(publishers[0].name.length).not.toEqual(0)
    expect(index).not.toEqual(-1)
  })

  test('Getting shops', async () => {
    const response = await fetch('/api/shops')
    const shops = await response.json()
    expect(Array.isArray(shops)).toBeTruthy()
    expect(shops.length).not.toEqual(0)
    expect(shops[0].name).toBeTypeOf('string')
    expect(shops[0].name.length).not.toEqual(0)
    expect(shops[0].url).toBeDefined()
  })
})

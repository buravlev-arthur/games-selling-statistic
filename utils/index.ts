import type { Editions, Games, Platforms, Publishers } from '~/types'

export const getNameItemById = (
  searchId: number,
  items: Games | Platforms | Editions | null
): string => items?.find(({ id }) => id === searchId)?.name ?? ''

export const getPublisherByGameId = (
  gameId: number,
  publishers: Publishers | null,
  games: Games | null
): string => {
  const publisherId = games?.find(({ id }) => id === gameId)?.publisher ?? -1
  return publishers?.find(({ id }) => id === publisherId)?.name ?? ''
}

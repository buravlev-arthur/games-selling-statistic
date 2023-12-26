export type PlatformName = 'Steam' | 'Xbox' | 'PlayStation'
export type PlatformOptions = Array<{
  label: string
  value: PlatformName | 'all'
}>
type IconType = 'r_expand_more' | 'r_expand_less'
type IconColor = 'positive' | 'negative'

export interface GameListItemData {
  price: number
  priceIcon: IconType
  priceIconColor: IconColor
  offers: number
  offersIcon: IconType
  offersIconColor: IconColor
}

export type GamesListData = Record<string, GameListItemData>

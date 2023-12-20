import type { Ref } from 'vue'
import type {
  Edition,
  Editions,
  Game,
  Games,
  Publisher,
  Platform,
  Platforms,
  GameData,
  Publishers
} from './database.js'

export type * from './server.ts'
export type * from './database.js'

export interface DatabaseEntries {
  games: Games | null
  editions: Editions | null
  platforms: Platforms | null
  publishers: Publishers | null
}

export interface Periods {
  day: number
  week: number
  month: number
  season: number
  year: number
}

export type PeriodProperty = keyof Periods

export interface GameDataWithValues {
  id: GameData['id']
  name: Game['name']
  edition: Edition['name']
  platform: Platform['name']
  publisher: Publisher['name']
  priceMin: GameData['price_min']
  priceMax: GameData['price_max']
  priceAvg: GameData['price_avg']
  offersCount: GameData['offers_count']
  date: Date
  dateLocalString: GameData['parsed_date']
}

export type GamesDataWithValues = Array<GameDataWithValues>

export interface UseScreenReturn {
  isMobile: Ref<boolean>
  isDesktop: Ref<boolean>
}

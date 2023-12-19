import { ref } from 'vue'
import type { Ref } from 'vue'
import type {
  GamesData,
  Games,
  Editions,
  Platforms,
  DatabaseEntries,
  PeriodProperty,
  GamesDataWithValues
} from '~/types'
import { periods } from '~/const'

export const useGamesDataByPeriod = async (
  period: PeriodProperty
): Promise<Ref<GamesData | null>> => {
  const daysBefore = periods[period]
  const { data: availableDates } = await useFetch(
    '/api/gamesdata/availabledates'
  )
  const until = new Date(
    availableDates.value?.max as string
  ).toLocaleDateString('en')
  const from = new Date(
    new Date().setDate(new Date(until).getDate() - daysBefore)
  ).toLocaleDateString('en')
  const url = `/api/gamesdata/dateinterval?from=${from}&until=${until}`
  const { data } = await useFetch<GamesData>(url)
  return data
}

export const useDatabaseEntries = async (): Promise<DatabaseEntries> => {
  const { data: games } = await useFetch<Games>('/api/gamenames')
  const { data: platforms } = await useFetch<Platforms>('/api/platforms')
  const { data: publishers } = await useFetch<Platforms>('/api/publishers')
  const { data: editions } = await useFetch<Editions>('/api/editions')

  const entries: DatabaseEntries = reactive({
    games,
    platforms,
    editions,
    publishers
  })

  return entries
}

export const useGamesDataValues = (
  gamesData: GamesData | null
): Ref<GamesDataWithValues> => {
  const gamesDataWithValue = ref<GamesDataWithValues>([])
  const { games, platforms, editions, publishers } =
    useState<DatabaseEntries>('databaseEntries').value

  if (gamesData?.length) {
    gamesDataWithValue.value = gamesData.map((game) => ({
      id: game.id,
      name: getNameItemById(game.name, games),
      edition: getNameItemById(game.edition, editions),
      platform: getNameItemById(game.platform, platforms),
      publisher: getPublisherByGameId(game.name, publishers, games),
      priceMin: game.price_min,
      priceAvg: game.price_avg,
      priceMax: game.price_max,
      offersCount: game.offers_count,
      date: new Date(game.parsed_date),
      dateLocalString: new Date(game.parsed_date).toLocaleDateString('ru')
    }))
  }

  return gamesDataWithValue
}

export const useSetStates = async (period: PeriodProperty): Promise<void> => {
  const isStatesLoaded = useState<boolean>('isStatesLoaded')
  isStatesLoaded.value = false

  const databaseEntires = useState<DatabaseEntries>('databaseEntries')
  if (!databaseEntires.value) {
    const entries = await useDatabaseEntries()
    databaseEntires.value = entries
  }

  const gamesDataByPeriod = await useGamesDataByPeriod(period)
  const gamesDataWithValues = useGamesDataValues(gamesDataByPeriod.value)
  const gamesData = useState<GamesDataWithValues>('gamesData')
  gamesData.value = gamesDataWithValues.value

  isStatesLoaded.value = true
}

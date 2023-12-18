import type { Ref } from 'vue'
import type { GamesData } from '~/types'

export const useGamesDataByWeek = async (): Promise<Ref<GamesData | null>> => {
  const until = new Date().toLocaleDateString('en')
  const from = new Date(
    new Date().setDate(new Date(until).getDate() - 7)
  ).toLocaleDateString('en')
  const url = `/api/gamesdata/dateinterval?from=${from}&until=${until}`
  const { data } = await useFetch<GamesData>(url)
  return data
}

export const useGamesDataByLastDay = async (): Promise<
  Ref<GamesData | null>
> => {
  const { data: availableDates } = await useFetch(
    '/api/gamesdata/availabledates'
  )
  const dateStr = new Date(
    availableDates.value?.max as string
  ).toLocaleDateString('en')
  const url = `/api/gamesdata/dateinterval?from=${dateStr}&until=${dateStr}`
  const { data: gamesData } = await useFetch<GamesData>(url)
  useState<GamesData | null>('gamesDataByLastDay', () => gamesData.value)
  return gamesData
}

export const useGamesDataByMonth = async (): Promise<Ref<GamesData | null>> => {
  const until = new Date().toLocaleDateString('en')
  const from = new Date(
    new Date().setDate(new Date(until).getDate() - 30)
  ).toLocaleDateString('en')
  const url = `/api/gamesdata/dateinterval?from=${from}&until=${until}`
  const { data } = await useFetch<GamesData>(url)
  useState<GamesData | null>('gamesDataByMonth', () => data.value)
  return data
}

export const useSetStates = async (): Promise<void> => {
  const isStatesLoaded = useState<boolean>('isStatesLoaded', () => false)

  const gameDataByWeek = await useGamesDataByWeek()
  useState<GamesData | null>('gamesDataByWeek', () => gameDataByWeek.value)

  const gamesDataByLastDay = await useGamesDataByLastDay()
  useState<GamesData | null>(
    'gamesDataByLastDay',
    () => gamesDataByLastDay.value
  )

  const gamesDataByMonth = await useGamesDataByMonth()
  useState<GamesData | null>('gamesDataByMonth', () => gamesDataByMonth.value)

  isStatesLoaded.value = true
}

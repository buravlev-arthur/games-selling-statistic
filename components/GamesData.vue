<template>
  <div class="row col-1 items-center q-mt-md">
    <h6>Сводная информация</h6>
  </div>
  <div class="col-9 q-mt-md">
    <div v-for="gameName in gameNames" :key="gameName">
      <GameData
        :game-name="gameName"
        :active="activeGames.includes(gameName)"
        :game-list-item-data="gamesListData[gameName] ?? {}"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import uniq from 'lodash/uniq'
import type {
  DatabaseEntries,
  GamesDataWithValues,
  GamesListData
} from '~/types'

type GamesValues = Record<
  string,
  Record<
    string,
    {
      price: number
      offers: number
    }
  >
>

const allGames = useState<GamesDataWithValues>('gamesData')
const entries = useState<DatabaseEntries>('databaseEntries')

const activeGames = computed<Array<string>>(
  () =>
    uniq(
      allGames.value?.filter(({ active }) => active).map(({ name }) => name)
    ) ?? []
)

const gamesValues = computed<GamesValues>(
  () =>
    allGames.value
      ?.sort((a, b) => (a.date > b.date ? 1 : -1))
      ?.reduce((acc: GamesValues, game) => {
        if (!acc[game.name]) {
          acc[game.name] = {}
        }
        if (!acc[game.name][game.dateLocalString]) {
          acc[game.name][game.dateLocalString] = {
            price: game.priceAvg,
            offers: game.offersCount
          }
        }
        const currentPrice = acc[game.name][game.dateLocalString].price
        const currentOffers = acc[game.name][game.dateLocalString].offers
        acc[game.name][game.dateLocalString].price = Math.round(
          (currentPrice + game.priceAvg) / 2
        )
        acc[game.name][game.dateLocalString].offers = Math.round(
          (currentOffers + game.offersCount) / 2
        )
        return acc
      }, {})
)

const gamesListData = computed<GamesListData>(() => {
  if (!gamesValues.value) {
    return {}
  }
  const data: GamesListData = {}
  for (const gameName in gamesValues.value) {
    const prices = Object.entries(gamesValues.value[gameName]).map(
      ([, { price }]) => price
    )
    const offers = Object.entries(gamesValues.value[gameName]).map(
      ([, { offers }]) => offers
    )
    const priceIcon =
      prices[0] > prices[prices.length - 1] ? 'r_expand_more' : 'r_expand_less'
    const offersIcon =
      offers[0] > offers[offers.length - 1] ? 'r_expand_more' : 'r_expand_less'
    data[gameName] = {
      price: Math.round(
        prices.reduce((sum, price) => sum + price, 0) / prices.length
      ),
      offers: Math.round(
        offers.reduce((sum, offer) => sum + offer) / offers.length
      ),
      priceIcon,
      offersIcon,
      priceIconColor: priceIcon === 'r_expand_less' ? 'positive' : 'negative',
      offersIconColor: offersIcon === 'r_expand_less' ? 'positive' : 'negative'
    }
  }
  return data
})

const gameNames = computed<Array<string>>(() => {
  return entries.value?.games?.map(({ name }) => name) ?? []
})
</script>

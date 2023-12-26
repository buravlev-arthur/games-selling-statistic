<template>
  <ClientOnly>
    <div class="column" style="height: 100%">
      <div class="col-4 col-md-2 row justify-between items-center">
        <div class="row col-12 col-md-6">
          <h6 :class="isDesktop ? 'offset-1' : ''">Динамика стоимости</h6>
        </div>
        <div
          class="row col-12 col-md-6"
          :class="isDesktop ? 'justify-end' : ''"
        >
          <div class="col-12 col-md-5 q-mb-sm q-mr-md">
            <QSelect
              v-model="selectedPlatform"
              rounded
              dense
              standout
              :options="platformOptions"
              options-selected-class="active-select-option"
              label="Платформа"
            />
          </div>
          <div class="col-12 col-md-6">
            <QSelect
              v-model="selectedPrice"
              rounded
              dense
              standout
              :options="priceOptions"
              options-selected-class="active-select-option"
              label="Цена"
            />
          </div>
        </div>
      </div>
      <div class="col-8 col-md-10">
        <VChart :option="option" autoresize />
      </div>
    </div>
  </ClientOnly>
</template>

<script lang="ts" setup>
import VChart from 'vue-echarts'
import { getCssVar } from 'quasar'
import { use } from 'echarts/core'
import uniq from 'lodash/uniq'
import type { ComposeOption } from 'echarts/core'
import { LineChart } from 'echarts/charts'
import type { LineSeriesOption } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { SVGRenderer } from 'echarts/renderers'
import {
  TooltipComponent,
  GridComponent,
  LegendComponent
} from 'echarts/components'
import type {
  TooltipComponentOption,
  GridComponentOption,
  LegendComponentOption
} from 'echarts/components'
import type { GamesDataWithValues, PlatformOptions } from '~/types'

type Option = ComposeOption<
  | TooltipComponentOption
  | GridComponentOption
  | LegendComponentOption
  | LineSeriesOption
>

interface PriceOption {
  label: string
  value: 'priceMax' | 'priceAvg' | 'priceMin'
}

const priceOptions: Array<PriceOption> = [
  { label: 'Максимальная', value: 'priceMax' },
  { label: 'Средняя', value: 'priceAvg' },
  { label: 'Минимальная', value: 'priceMin' }
]

const platformOptions: PlatformOptions = [
  { label: 'Все', value: 'all' },
  { label: 'Steam', value: 'Steam' },
  { label: 'Xbox', value: 'Xbox' },
  { label: 'PlayStation', value: 'PlayStation' }
]

const allGames = useState<GamesDataWithValues>('gamesData')
const { isDesktop } = useScreen()

use([
  TooltipComponent,
  GridComponent,
  LegendComponent,
  LineChart,
  SVGRenderer,
  UniversalTransition
])

const gamesData = computed<GamesDataWithValues>(
  () => allGames.value?.filter(({ active }) => active) ?? []
)

const selectedPlatform = ref<PlatformOptions[number]>(platformOptions[0])
const selectedPrice = ref<PriceOption>(priceOptions[1])

const gameNames = computed<Array<string>>(
  () => uniq(gamesData.value?.map(({ name }) => name)) ?? []
)

const dates = computed<Array<string>>(
  () =>
    uniq(gamesData.value?.map(({ date }) => date.toLocaleDateString('ru'))) ??
    []
)

const getSeriesData = (gameName: string): Array<number> =>
  gamesData.value?.reduce((acc: Array<number>, game) => {
    const index = dates.value?.findIndex(
      (date) => date === game.date.toLocaleDateString('ru')
    )
    const isNotSelectedPlatform =
      game.platform !== selectedPlatform.value.value &&
      selectedPlatform.value.value !== 'all'

    if (game.name !== gameName || index === -1 || isNotSelectedPlatform) {
      return acc
    }
    const price = game[selectedPrice.value.value] ?? 0
    acc[index] = Math.round(((acc[index] ?? price) + price) / 2)
    return acc
  }, []) ?? []

const series = computed<Option['series']>(
  () =>
    gameNames.value?.map((gameName) => ({
      name: gameName,
      type: 'line',
      symbol: 'circle',
      data: getSeriesData(gameName)
    })) ?? []
)

const option = computed<Option>(() => ({
  legend: {
    icon: 'circle',
    itemWidth: isDesktop.value ? 14 : 8,
    itemHeight: isDesktop.value ? 14 : 8,
    right: isDesktop.value ? 0 : 'auto',
    left: isDesktop.value ? 'auto' : 0,
    data: gameNames.value,
    textStyle: {
      color: '#fff',
      overflow: 'truncate',
      ellipsis: '...',
      width: isDesktop.value ? 120 : 50
    }
  },
  tooltip: {
    borderWidth: 0,
    confine: true,
    backgroundColor: getCssVar('dark') as string,
    valueFormatter: (value) => (Number(value) ? `${value} руб.` : '-'),
    textStyle: {
      color: getCssVar('primary') as string
    },
    trigger: 'axis',
    axisPointer: {
      type: 'line',
      lineStyle: {
        color: getCssVar('accent') as string
      }
    }
  },
  grid: {
    left: isDesktop.value ? '10%' : '3%',
    right: isDesktop.value ? '1%' : '3%',
    height: isDesktop.value ? '70%' : '54%'
  },
  xAxis: {
    type: 'category',
    data: dates.value,
    boundaryGap: false,
    axisTick: {
      show: false
    },
    axisLine: {
      lineStyle: {
        color: getCssVar('dark') as string
      }
    },
    axisLabel: {
      align: 'right',
      rotate: isDesktop.value ? 0 : 90,
      width: isDesktop.value ? 120 : 70,
      fontSize: 10,
      margin: 14,
      overflow: 'truncate',
      ellipsis: '...',
      color: getCssVar('accent') as string
    }
  },
  yAxis: {
    type: 'value',
    show: isDesktop.value,
    min: 'dataMin',
    max: 'dataMax',
    splitLine: {
      show: false
    },
    axisLabel: {
      formatter: '{value} руб.',
      color: getCssVar('secondary') as string
    }
  },
  series: series.value,
  backgroundColor: getCssVar('dark-page') as string,
  textStyle: {
    fontFamily: 'Nunito'
  }
}))
</script>

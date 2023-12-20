<template>
  <ClientOnly>
    <div class="column col-12 col-md-8">
      <div class="col-4 col-md-2 row justify-between">
        <div class="col-12 col-md-3">
          <QSelect
            v-model="selectedPlatform"
            rounded
            standout
            :options="platformOptions"
            options-selected-class="active-select-option"
            label="Платформа"
          />
        </div>
        <div class="col-12 col-md-3">
          <QSelect
            v-model="selectedPrice"
            rounded
            standout
            :options="priceOptions"
            options-selected-class="active-select-option"
            label="Цена"
          />
        </div>
      </div>
      <div class="col-8 col-md-10">
        <VChart :option="options" autoresize />
      </div>
    </div>
  </ClientOnly>
</template>

<script lang="ts" setup>
import VChart from 'vue-echarts'
import { getCssVar } from 'quasar'
import uniq from 'lodash/uniq'
import { use } from 'echarts/core'
import type { ComposeOption } from 'echarts/core'
import { BarChart } from 'echarts/charts'
import type { BarSeriesOption } from 'echarts/charts'
import {
  DatasetComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent
} from 'echarts/components'
import type {
  DatasetComponentOption,
  TooltipComponentOption,
  GridComponentOption,
  LegendComponentOption
} from 'echarts/components'
import { SVGRenderer } from 'echarts/renderers'
import { textColor } from '~/const'
import type { GameDataWithValues, GamesDataWithValues } from '~/types'

type Option = ComposeOption<
  | GridComponentOption
  | DatasetComponentOption
  | TooltipComponentOption
  | LegendComponentOption
  | BarSeriesOption
>

type PriceProperty = 'priceMin' | 'priceAvg' | 'priceMax'
type PlatformProperty = 'Steam' | 'Xbox' | 'PlayStation'
type SourceItem = Record<string, number | string>
// type DatasetSource = Array<SourceItem>
type PriceOptions = Array<{ label: string; value: PriceProperty }>

use([
  BarChart,
  DatasetComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  SVGRenderer
])

const { isDesktop, isMobile } = useScreen()
const gamesData = useState<GamesDataWithValues>('gamesData')

const platformOptions: Array<PlatformProperty> = [
  'Steam',
  'Xbox',
  'PlayStation'
]
const priceOptions: PriceOptions = [
  { label: 'Минимальная', value: 'priceMin' },
  { label: 'Средняя', value: 'priceAvg' },
  { label: 'Максимальная', value: 'priceMax' }
]

const selectedPlatform = ref<PlatformProperty>('Steam')
const selectedPrice = ref<PriceOptions[0]>(priceOptions[0])

const dataset = computed<DatasetComponentOption>(() => {
  if (!gamesData.value) {
    return {}
  }
  return getDataset(selectedPrice.value, selectedPlatform.value)
})

const getEditions = (): Array<GameDataWithValues['edition']> => {
  return gamesData.value.map(({ edition }) => edition)
}

const getDimensions = (): DatasetComponentOption['dimensions'] => {
  const editions = getEditions()
  return ['game', ...uniq(editions)]
}

const createNewSourceItem = (
  game: string,
  edition: string,
  price: number
): SourceItem => {
  const editions = getEditions()
  const sourceItem: SourceItem = editions.reduce(
    (acc, edition) => ({ ...acc, [edition]: 0 }),
    {}
  )
  sourceItem[edition] = price
  return { game, ...sourceItem }
}

const getDataset = (
  { value: price }: PriceOptions[0],
  platfrom: PlatformProperty
): DatasetComponentOption => {
  const dimensions = getDimensions()
  const unsortedSource = gamesData.value?.reduce(
    (acc: Array<SourceItem>, gameData) => {
      if (gameData.platform !== platfrom) {
        return acc
      }
      const index = acc?.findIndex(({ game }) => game === gameData.name)
      if (index !== -1) {
        const currentPrice = acc[index][gameData.edition]
          ? acc[index][gameData.edition]
          : gameData[price]
        acc[index][gameData.edition] = Math.round(
          ((currentPrice as number) + gameData[price]) / 2
        )
        return acc
      }
      return [
        ...acc,
        createNewSourceItem(gameData.name, gameData.edition, gameData[price])
      ]
    },
    []
  )
  const source = unsortedSource.sort((a, b) => (a.game > b.game ? 1 : -1))
  return { source, dimensions }
}

const options = computed<Option>(() => ({
  legend: {
    left: 'left',
    itemWidth: 14,
    itemheight: 18,
    itemGap: 20,
    textStyle: {
      color: textColor
    }
  },
  tooltip: {},
  dataset: dataset.value,
  grid: {
    left: isDesktop.value ? '8%' : 0,
    right: 0
  },
  xAxis: {
    type: 'category',
    offset: 10,
    axisTick: {
      show: false
    },
    axisLine: {
      lineStyle: {
        color: getCssVar('dark') as string
      }
    },
    axisLabel: {
      rotate: isDesktop.value ? 0 : 90,
      width: isMobile.value ? 50 : 120,
      margin: 0,
      overflow: 'truncate',
      ellipsis: '...',
      color: getCssVar('accent') as string
    }
  },
  yAxis: {
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
  series: Array((dataset.value.dimensions?.length ?? 1) - 1).fill({
    type: 'bar',
    itemStyle: {
      borderRadius: [6, 6, 0, 0]
    }
  }),
  backgroundColor: getCssVar('dark-page') as string,
  textStyle: {
    fontFamily: 'Nunito'
  }
}))
</script>

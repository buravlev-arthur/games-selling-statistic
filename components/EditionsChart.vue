<template>
  <ClientOnly>
    <div class="column" style="height: 100%">
      <div class="col-4 col-md-2 row justify-between items-center">
        <div class="col-12 col-md-6">
          <h6>Стоимость изданий</h6>
        </div>
        <div class="row col-12 col-md-6 q-col-gutter-sm">
          <div class="col-12 col-md-6">
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
import type {
  GameDataWithValues,
  GamesDataWithValues,
  PlatformOptions
} from '~/types'

type Option = ComposeOption<
  | GridComponentOption
  | DatasetComponentOption
  | TooltipComponentOption
  | LegendComponentOption
  | BarSeriesOption
>

type PriceProperty = 'priceMin' | 'priceAvg' | 'priceMax'
type SourceItem = Record<string, number | string>
type PriceOptions = Array<{ label: string; value: PriceProperty }>

use([
  BarChart,
  DatasetComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  SVGRenderer
])

const { isDesktop } = useScreen()
const allGames = useState<GamesDataWithValues>('gamesData')

const platformOptions: PlatformOptions = [
  { label: 'Все', value: 'all' },
  { label: 'Steam', value: 'Steam' },
  { label: 'Xbox', value: 'Xbox' },
  { label: 'PlayStation', value: 'PlayStation' }
]

const priceOptions: PriceOptions = [
  { label: 'Минимальная', value: 'priceMin' },
  { label: 'Средняя', value: 'priceAvg' },
  { label: 'Максимальная', value: 'priceMax' }
]

const selectedPlatform = ref<PlatformOptions[number]>(platformOptions[0])
const selectedPrice = ref<PriceOptions[number]>(priceOptions[0])

const gamesData = computed<GamesDataWithValues>(
  () => allGames.value?.filter(({ active }) => active) ?? []
)

const dataset = computed<DatasetComponentOption>(() => {
  if (!gamesData.value) {
    return {}
  }
  return getDataset(selectedPrice.value, selectedPlatform.value.value)
})

const series = computed<Option['series']>(() => {
  const editionsCount = (dataset.value.dimensions?.length ?? 1) - 1
  return Array(editionsCount).fill({
    type: 'bar',
    itemStyle: {
      borderRadius: [6, 6, 0, 0]
    }
  })
})

const getEditions = (): Array<GameDataWithValues['edition']> => {
  return uniq(gamesData.value.map(({ edition }) => edition))
}

const getDimensions = (): DatasetComponentOption['dimensions'] => {
  const editions = getEditions()
  return ['game', ...editions]
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
  { value: price }: PriceOptions[number],
  platfrom: PlatformOptions[number]['value']
): DatasetComponentOption => {
  const dimensions = getDimensions()
  const unsortedSource = gamesData.value?.reduce(
    (acc: Array<SourceItem>, gameData) => {
      if (gameData.platform !== platfrom && platfrom !== 'all') {
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

const option = computed<Option>(() => ({
  legend: {
    left: 'left',
    itemWidth: 14,
    itemheight: 18,
    itemGap: 20,
    textStyle: {
      color: '#fff'
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
      type: 'shadow',
      shadowStyle: {
        opacity: 0.1
      }
    }
  },
  dataset: dataset.value,
  grid: {
    left: isDesktop.value ? '8%' : 0,
    right: 0,
    height: isDesktop.value ? '74%' : '54%'
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
      width: isDesktop.value ? 120 : 50,
      interval: 0,
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
  series: series.value,
  backgroundColor: getCssVar('dark-page') as string,
  textStyle: {
    fontFamily: 'Nunito'
  }
}))
</script>

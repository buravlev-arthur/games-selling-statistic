<template>
  <div class="column" style="height: 100%">
    <div
      class="col-3 row q-col-gutter-md items-center"
      :class="isDesktop ? 'justify-end' : ''"
    >
      <h6>Количество предложений</h6>
      <QSelect
        v-model="selectedPlatform"
        class="col-12 col-md-4"
        rounded
        dense
        standout
        :options="platformOptions"
        options-selected-class="active-select-option"
        label="Платформа"
      />
    </div>
    <div class="col-9">
      <VChart :option="option" autoresize />
    </div>
  </div>
</template>

<script lang="ts" setup>
import VChart from 'vue-echarts'
import { getCssVar } from 'quasar'
import { use } from 'echarts/core'
import type { ComposeOption } from 'echarts/core'
import { PieChart } from 'echarts/charts'
import type { PieSeriesOption } from 'echarts/charts'
import { TooltipComponent, LegendComponent } from 'echarts/components'
import type {
  TooltipComponentOption,
  LegendComponentOption
} from 'echarts/components'
import { LabelLayout } from 'echarts/features'
import { SVGRenderer } from 'echarts/renderers'
import type { PlatformOptions, GamesDataWithValues } from '~/types'

type Option = ComposeOption<
  TooltipComponentOption | LegendComponentOption | PieSeriesOption
>
type SeriesDataAccumulator = Array<{ name: string; value: number }>

const { isDesktop } = useScreen()
const allGames = useState<GamesDataWithValues>('gamesData')

const platformOptions: PlatformOptions = [
  { label: 'Все', value: 'all' },
  { label: 'Steam', value: 'Steam' },
  { label: 'Xbox', value: 'Xbox' },
  { label: 'PlayStation', value: 'PlayStation' }
]

use([PieChart, TooltipComponent, LegendComponent, SVGRenderer, LabelLayout])

const selectedPlatform = ref<PlatformOptions[number]>(platformOptions[0])

const gamesData = computed<GamesDataWithValues>(
  () => allGames.value?.filter(({ active }) => active) ?? []
)

const seriesData = computed<PieSeriesOption['data']>(() => {
  const unsortedSeriesData = gamesData.value?.reduce(
    (acc: SeriesDataAccumulator, { name, platform, offersCount }) => {
      const currentPlatform = selectedPlatform.value.value
      if (platform !== currentPlatform && currentPlatform !== 'all') {
        return acc
      }
      const index = acc.findIndex(({ name: itemName }) => itemName === name)
      if (index !== -1) {
        acc[index].value += offersCount
        return acc
      }
      return [...acc, { name, value: offersCount }]
    },
    []
  )
  return unsortedSeriesData?.sort((a, b) => (a.name > b.name ? 1 : -1))
})

const option = computed<Option>(() => ({
  tooltip: {
    borderWidth: 0,
    backgroundColor: getCssVar('dark') as string,
    textStyle: {
      color: getCssVar('primary') as string
    },
    trigger: 'item',
    axisPointer: {
      type: 'shadow',
      shadowStyle: {
        opacity: 0.1
      }
    }
  },
  legend: {
    orient: 'vertical',
    top: isDesktop.value ? 0 : 30,
    left: 'right',
    itemWidth: 14,
    itemheight: 18,
    itemGap: 20,
    textStyle: {
      width: isDesktop.value ? 96 : 80,
      color: '#fff',
      overflow: 'truncate',
      ellipsis: '...'
    }
  },
  series: [
    {
      name: 'Количество предложений',
      type: 'pie',
      right: 120,
      radius: ['70%', isDesktop.value ? '96%' : '100%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 14,
          color: '#fff'
        }
      },
      labelLine: {
        show: false
      },
      data: seriesData.value
    }
  ],
  backgroundColor: getCssVar('dark-page') as string,
  textStyle: {
    fontFamily: 'Nunito'
  }
}))
</script>

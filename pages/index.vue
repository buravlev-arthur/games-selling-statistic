<template>
  <div class="row">
    <QBtn label="Set week data" @click="setGamesData('week')" />
    <QBtn label="Set day data" @click="setGamesData('day')" />
    <!-- <div class="col-12 col-md-4">
      <VChart class="chart" :option="optionsMax" autoresize theme="dark" />
    </div>
    <div class="col-12 col-md-4">
      <VChart class="chart" :option="optionsMin" autoresize theme="dark" />
    </div>
    <div class="col-12 col-md-4">
      <VChart class="chart" :option="optionsAvg" autoresize theme="dark" />
    </div> -->
  </div>
</template>

<script lang="ts" setup>
// import { getCssVar } from 'quasar'
// import VChart from 'vue-echarts'
import { use } from 'echarts/core'
// import type { ComposeOption } from 'echarts/core'
import { GridComponent, TitleComponent } from 'echarts/components'
// import type {
//   GridComponentOption,
//   TitleComponentOption
// } from 'echarts/components'
import { LineChart } from 'echarts/charts'
// import type { LineSeriesOption } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { SVGRenderer } from 'echarts/renderers'
import type { GamesDataWithValues, PeriodProperty } from '~/types'

const gamesData = useState<GamesDataWithValues>('gamesData')

const setGamesData = async (period: PeriodProperty): Promise<void> => {
  await useSetStates(period)
  console.log(`Period: ${period}, Data: ${JSON.stringify(gamesData.value)}`)
}

// type Option = ComposeOption<
//   GridComponentOption | LineSeriesOption | TitleComponentOption
// >

use([
  GridComponent,
  LineChart,
  SVGRenderer,
  UniversalTransition,
  TitleComponent
])

// const maxCosts = computed<Array<Array<string | number>>>(() =>
//   Object.entries(
//     gamesByWeek.value?.reduce((acc: Record<string, number>, gameData) => {
//       const date = new Date(gameData.parsed_date).toLocaleDateString('ru')
//       const maxCost = gameData.price_max
//       if ((acc[date] && acc[date] < maxCost) || !acc[date]) {
//         acc[date] = maxCost
//         return acc
//       }
//       return acc
//     }, {}) ?? {}
//   )
// )

// const minCosts = computed<Array<Array<string | number>>>(() =>
//   Object.entries(
//     gamesByWeek.value?.reduce((acc: Record<string, number>, gameData) => {
//       const date = new Date(gameData.parsed_date).toLocaleDateString('ru')
//       const minCost = gameData.price_min
//       if ((acc[date] && acc[date] > minCost) || !acc[date]) {
//         acc[date] = minCost
//         return acc
//       }
//       return acc
//     }, {}) ?? {}
//   )
// )

// const avgCosts = computed<Array<Array<string | number>>>(() => {
//   return maxCosts.value.map(([date, cost], index) => [
//     date,
//     ((minCosts.value[index][1] as number) + (cost as number)) / 2
//   ])
// })

// const optionsMax = computed<Option>(() => ({
//   title: {
//     text: 'Максимальная стоимость игр'
//   },
//   xAxis: {
//     type: 'category',
//     boundaryGap: false
//   },
//   yAxis: {
//     type: 'value',
//     boundaryGap: [0, 0],
//     min: 'dataMin',
//     max: 'dataMax'
//   },
//   series: [
//     {
//       data: maxCosts.value,
//       type: 'line',
//       smooth: true,
//       color: 'red'
//     }
//   ],
//   backgroundColor: getCssVar('dark-page')
// }))

// const optionsMin = computed<Option>(() => ({
//   title: {
//     text: 'Минимальная стоимость игр'
//   },
//   xAxis: {
//     type: 'category',
//     boundaryGap: false
//   },
//   yAxis: {
//     type: 'value',
//     boundaryGap: [0, 0],
//     min: 'dataMin',
//     max: 'dataMax'
//   },
//   series: [
//     {
//       data: minCosts.value,
//       type: 'line',
//       smooth: true,
//       color: 'green'
//     }
//   ],
//   backgroundColor: getCssVar('dark-page')
// }))

// const optionsAvg = computed<Option>(() => ({
//   title: {
//     text: 'Средняя стоимость игр'
//   },
//   xAxis: {
//     type: 'category',
//     boundaryGap: false
//   },
//   yAxis: {
//     type: 'value',
//     boundaryGap: [0, 0],
//     min: 'dataMin',
//     max: 'dataMax'
//   },
//   series: [
//     {
//       data: avgCosts.value,
//       type: 'line',
//       smooth: true,
//       color: 'orange'
//     }
//   ],
//   backgroundColor: getCssVar('dark-page')
// }))
</script>

<style lang="scss">
.chart {
  height: 400px;
}
</style>

<template>
  <VChart class="chart" :option="option" autoresize theme="dark" />
</template>

<script lang="ts" setup>
import { getCssVar } from 'quasar'
import { ref } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import type { ComposeOption } from 'echarts/core'
import { GridComponent } from 'echarts/components'
import type { GridComponentOption } from 'echarts/components'
import { LineChart } from 'echarts/charts'
import type { LineSeriesOption } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { SVGRenderer } from 'echarts/renderers'
import type { GamesData, AvailableDatesResponse } from '~/types'

// test request
const { data: rows } = await useFetch<GamesData>(
  '/api/gamesdata/dateinterval?from=12/13/2024&until=12/15/2024'
)

const { data: dates } = await useFetch<AvailableDatesResponse>('/api/gamesdata/availabledates')

console.log('min, max dates: ', dates.value)
console.log(rows.value)

type Option = ComposeOption<GridComponentOption | LineSeriesOption>

use([GridComponent, LineChart, SVGRenderer, UniversalTransition])

const option = ref<Option>({
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line',
      smooth: true
    }
  ],
  backgroundColor: getCssVar('dark-page')
})
</script>

<style lang="scss">
.chart {
  height: 400px;
}
</style>

<template>
  <ClientOnly>
    <VChart
      class="chart"
      :option="option"
      autoresize
      theme="dark"
    />
  </ClientOnly>
</template>

<script lang="ts" setup>
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
  ]
})
</script>

<style lang="scss">
.chart {
  height: 800px;
}
</style>

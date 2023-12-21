<template>
  <div>
    <div class="row buttons-block items-center">
      <QBtn label="Set week data" @click="setGamesData('week')" />
      <QBtn label="Set day data" @click="setGamesData('day')" />
    </div>
    <div class="row q-col-gutter-lg charts-block">
      <div class="col-12 col-md-8" :style="chartContainerStyles">
        <EditionsChart />
      </div>
      <div class="col-12 col-md-4" :style="chartContainerStyles">
        <OffersChart />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { GamesDataWithValues, PeriodProperty } from '~/types'

const gamesData = useState<GamesDataWithValues>('gamesData')
const { isDesktop } = useScreen()

const chartContainerStyles = computed<Record<string, string>>(() => ({
  height: isDesktop.value ? '100%' : '50%'
}))

const setGamesData = async (period: PeriodProperty): Promise<void> => {
  await useSetStates(period)
  // eslint-disable-next-line no-console
  console.log(`Period: ${period}, Data: ${JSON.stringify(gamesData.value)}`)
}
</script>

<style lang="scss">
.buttons-block {
  height: 100px;
}

.charts-block {
  height: 400px;

  @media (max-width: $breakpoint-sm-max) {
    height: 900px;
  }
}
</style>

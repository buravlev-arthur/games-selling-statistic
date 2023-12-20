<template>
  <div>
    <div class="row buttons-block items-center">
      <QBtn label="Set week data" @click="setGamesData('week')" />
      <QBtn label="Set day data" @click="setGamesData('day')" />
    </div>
    <div class="row charts-block">
      <EditionsChart />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { GamesDataWithValues, PeriodProperty } from '~/types'

const gamesData = useState<GamesDataWithValues>('gamesData')

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
}
</style>

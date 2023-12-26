<template>
  <div class="column">
    <div class="top-container row">
      <div class="column col-12 col-md-4" :style="chartContainerStyles">
        <GamesData />
      </div>
      <div class="col-12 col-md-8" :style="chartContainerStyles">
        <PricesChart />
      </div>
    </div>
    <div class="bottom-container row">
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
const { isDesktop } = useScreen()

const chartContainerStyles = computed<Record<string, string>>(() => ({
  height: isDesktop.value ? '100%' : '50%'
}))
</script>

<style lang="scss">
.top-container {
  height: 400px;

  @media (max-width: $breakpoint-sm-max) {
    height: 1040px;
  }
}

.bottom-container {
  height: 400px;

  @media (max-width: $breakpoint-sm-max) {
    height: 900px;
  }
}
</style>

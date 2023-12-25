<template>
  <div class="column">
    <div class="row">
      <div class="col-12 col-md-4" :style="chartContainerStyles">
        <p>Block #1</p>
      </div>
      <div class="col-12 col-md-8" :style="chartContainerStyles">
        <PricesChart />
      </div>
    </div>
    <div class="row">
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
.q-page > .column > .row {
  height: 400px;

  @media (max-width: $breakpoint-sm-max) {
    height: 900px;
  }
}
</style>

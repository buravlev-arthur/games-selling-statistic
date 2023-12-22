<template>
  <QLayout view="hhh lpr fff">
    <QHeader class="row items-center bg-dark q-px-md justify-between">
      <QImg
        src="/logo.svg"
        width="140px"
        height="60px"
        spinner-color="accent"
      />
      <SettingsMenu />
    </QHeader>

    <QPageContainer>
      <QPage padding>
        <slot />
        <QInnerLoading :showing="!isStatesLoaded" />
      </QPage>
    </QPageContainer>
  </QLayout>
</template>

<script lang="ts" setup>
const isStatesLoaded = useState<boolean>('isStatesLoaded')
</script>

<style lang="scss">
.q-header {
  height: 76px;
}
</style>

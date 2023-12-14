<template>
  <QLayout view="hhh lpr fff">
    <QHeader class="bg-dark q-pa-sm">
      <QImg
        src="/logo.svg"
        width="140px"
        height="60px"
        spinner-color="accent"
      />
    </QHeader>

    <QPageContainer>
      <QPage padding>
        <slot />
      </QPage>
    </QPageContainer>
  </QLayout>
</template>

<style lang="scss">
.q-header {
  height: 76px;
}
</style>

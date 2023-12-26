<template>
  <QCard flat class="row q-pa-sm" :class="isMobile ? 'q-my-xs' : 'q-my-sm'">
    <QCardSection class="row col-12 col-md-1 items-center justify-center">
      <QIcon :name="iconSrc" size="sm" />
    </QCardSection>
    <QCardSection class="column col-4 col-md-5">
      <div class="col-6 text-blue-grey-6 text-caption">Название</div>
      <div class="game-name col-6 text-primary">{{ gameName }}</div>
    </QCardSection>
    <QCardSection class="column col-4 col-md-3">
      <div
        class="row col-6 text-blue-grey-6 text-caption"
        :class="isMobile ? 'justify-center' : 'justify-left'"
      >
        Средняя цена
      </div>
      <div
        class="row col-6 items-center"
        :class="isMobile ? 'justify-center' : 'justify-left'"
      >
        <QIcon
          :name="gameListItemData.priceIcon"
          :color="gameListItemData.priceIconColor"
        />
        <div class="text-primary">{{ gameListItemData.price ?? 0 }} руб.</div>
      </div>
    </QCardSection>
    <QCardSection class="column col-4 col-md-3">
      <div
        class="row col-6 text-blue-grey-6 text-caption"
        :class="isMobile ? 'justify-end' : 'jusitfy-start'"
      >
        Кол-во товаров
      </div>
      <div
        class="row col-6 items-center"
        :class="isMobile ? 'justify-end' : 'jusitfy-start'"
      >
        <QIcon
          :name="gameListItemData.offersIcon"
          :color="gameListItemData.offersIconColor"
        />
        <div class="text-primary">{{ gameListItemData.offers }}</div>
      </div>
    </QCardSection>
    <div v-if="!active" class="absolute-full bg-dark" style="opacity: 0.8" />
  </QCard>
</template>

<script lang="ts" setup>
import type { GameListItemData } from '~/types'

const { isMobile } = useScreen()

const props = defineProps<{
  gameName: string
  active: boolean
  gameListItemData: GameListItemData
}>()

const iconSrc = ref<string>(
  `img:/images/games/${props.gameName.toLowerCase().replaceAll(' ', '_')}.png`
)
</script>

<style lang="scss" scoped>
.q-card {
  &__section {
    padding: 0;
    overflow: hidden;

    div {
      white-space: nowrap;
    }

    .game-name {
      @media (max-width: $breakpoint-sm-max) {
        width: 110px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>

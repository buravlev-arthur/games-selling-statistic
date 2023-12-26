<template>
  <QBtnDropdown
    flat
    dropdown-icon="r_tune"
    no-icon-animation
    padding="xs"
    size="lg"
    color="accent"
    :menu-offset="[16, 10]"
    content-class="settings-menu"
  >
    <div class="column q-col-gutter-md q-px-lg q-py-md">
      <div class="column q-col-gutter-sm">
        <p>Период:</p>
        <div class="row">
          <QBtnGroup class="row col-12 light-item" flat>
            <QBtn
              label="Год"
              :unelevated="false"
              no-caps
              class="col-4"
              :class="selectedPeriod === 'year' ? 'q-btn--selected' : ''"
              :disable="!isStatesLoaded"
              @click="setPeriod('year')"
            />
            <QBtn
              label="Месяц"
              :unelevated="false"
              no-caps
              class="col-4"
              :class="selectedPeriod === 'month' ? 'q-btn--selected' : ''"
              :disable="!isStatesLoaded"
              @click="setPeriod('month')"
            />
            <QBtn
              label="Неделя"
              :unelevated="false"
              no-caps
              class="col-4"
              :class="selectedPeriod === 'week' ? 'q-btn--selected' : ''"
              :disable="!isStatesLoaded"
              @click="setPeriod('week')"
            />
          </QBtnGroup>
        </div>
      </div>
      <div class="column q-col-gutter-sm">
        <p>Игры:</p>
        <QSelect
          v-model="selectedGames"
          standout
          :options="gamesSelectorOptions"
          :loading="!isStatesLoaded"
          :disable="!isStatesLoaded"
          dense
          multiple
          emit-value
          @update:model-value="setGames"
        >
          <template #selected>
            <span>Выбрано: {{ selectedGames.length }}</span>
          </template>
          <template #option="{ itemProps, opt, selected, toggleOption }">
            <QItem v-bind="itemProps">
              <QItemSection avatar>
                <QIcon :name="`img:${opt.icon}`" />
              </QItemSection>
              <QItemSection>
                <QItemLabel>{{ opt.label }}</QItemLabel>
                <QItemLabel caption>
                  {{ opt.publisher }}
                </QItemLabel>
              </QItemSection>
              <QItemSection side>
                <QToggle
                  :model-value="selected"
                  dense
                  @update:model-value="toggleOption(opt)"
                />
              </QItemSection>
            </QItem>
          </template>
        </QSelect>
      </div>
    </div>
  </QBtnDropdown>
</template>

<script lang="ts" setup>
import type { QSelectProps } from 'quasar'
import type {
  PeriodProperty,
  DatabaseEntries,
  GamesDataWithValues,
  SelectedGames
} from '~/types'

const isStatesLoaded = useState<boolean>('isStatesLoaded')
const selectedPeriod = useState<string>('selectedPeriod')
const entries = useState<DatabaseEntries>('databaseEntries')
const gamesData = useState<GamesDataWithValues>('gamesData')
const selectedGames = useState<SelectedGames>('selectedGames')

watch(entries, (newVal, oldVal) => {
  if (!oldVal && newVal) {
    const { games, publishers } = entries.value
    gamesSelectorOptions.value = games?.map(({ name, publisher }) => ({
      label: name,
      value: name,
      publisher: publishers?.find(({ id }) => id === publisher)?.name,
      icon: `/images/games/${name.toLowerCase().replaceAll(' ', '_')}.png`
    }))
  }
})

const gamesSelectorOptions = ref<QSelectProps['options']>([])

const setPeriod = async (period: PeriodProperty): Promise<void> => {
  await useSetStates(period)
}

const setGames = (selectedGames: Array<string>): void => {
  gamesData.value = gamesData.value
    .map((game) => ({
      ...game,
      active: selectedGames.includes(game.name)
    }))
    .sort((a, b) => (a.name > b.name ? 1 : -1))
}
</script>

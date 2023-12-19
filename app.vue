<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { defaultPeriod } from './const'

onBeforeMount(async () => {
  await useSetStates(defaultPeriod)
})
</script>

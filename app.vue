<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup>
onBeforeMount(async () => {
  await useSetStates()
})
</script>

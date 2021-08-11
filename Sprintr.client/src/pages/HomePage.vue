<template>
  <div class="home col-12 flex-grow-1">
    <Project v-for="p in projects" :key="p.id" :project="p" />
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  name: 'Home',
  setup() {
    return {
      projects: computed(() => AppState.projects)
    }
  }
}
</script>

<style scoped lang="scss">
</style>

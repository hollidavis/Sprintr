<template>
  <div class="row">
    <div class="col-12">
      <Sprint :sprint="activeSprint" />
    </div>
  </div>
</template>

<script>
import { computed, watchEffect } from '@vue/runtime-core'
import { sprintsService } from '../services/SprintsService'
import Pop from '../utils/Notifier'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
export default {
  name: 'SprintPage',
  setup() {
    const route = useRoute()
    watchEffect(async() => {
      try {
        if (!route.params.sprintId) {
          return
        }
        await sprintsService.setActiveSprint(route.params.sprintId)
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    return {
      activeSprint: computed(() => AppState.activeSprint)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

<template>
  <div class="row">
    <div class="col-12" v-for="b in backlogs" :key="b.id">
      <Backlog :backlog="b" />
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  setup() {
    return {
      backlogs: computed(() => AppState.backlogs)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

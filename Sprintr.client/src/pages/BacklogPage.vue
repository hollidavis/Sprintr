<template>
  <div class="row">
    <div class="col-12">
      <button type="submit"
              class="btn btn-outline-primary"
              data-toggle="modal"
              data-target="#createBacklogModal"
              title="Create Backlog Button"
      >
        New Backlog Item
      </button>
    </div>
    <div class="col-12" v-for="b in backlogs" :key="b.id">
      <Backlog :backlog="b" />
    </div>
  </div>
  <CreateBacklogModal />
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

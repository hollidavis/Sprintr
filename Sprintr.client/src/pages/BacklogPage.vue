<template>
  <div class="row">
    <div class="col-12" v-for="b in backlogs" :key="b.id">
      <Backlog :backlog="backlogs" />
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  name: 'BacklogPage',
  setup() {
    return {
      backlogs: computed(() => AppState.backlogs)
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>

<template>
  <div class="row">
    <div class="col-12">
      {{ activeSprint }}
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { sprintsService } from '../services/SprintsService'
import Pop from '../utils/Notifier'
import { AppState } from '../AppState'
export default {
  name: 'Sprint',
  props: {
    active: { type: Object, required: true }
  },
  setup() {
    const route = useRoute()
    onMounted(async() => {
      try {
        await sprintsService.setActiveSprint(route.params.sprintId)
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    return {
      activeSprint: computed(() => AppState.activeSprint)
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>

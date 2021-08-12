<template>
  <div class="row">
    <div class="col-12">
      <div>
        <h3 class="m-0">
          {{ sprint.name }}
        </h3>
        <p class="m-0">
          {{ startDate }} - {{ sprint.endDate }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { sprintsService } from '../services/SprintsService'

export default {
  props: {
    sprint: { type: Object, required: true }
  },
  setup(props) {
    const startDate = computed(() => sprintsService.convertTime(props.sprint.startDate))
    return {
      startDate
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

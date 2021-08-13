<template>
  <div class="row">
    <div class="col-12">
      <div>
        <h3 class="m-0">
          {{ sprint.name }}
        </h3>
        <p class="m-0">
          {{ startDate }} - {{ endDate }}
        </p>
      </div>
      <p><span class="fa fa-balance-scale"></span> <b>{{ totalWeight }}</b></p>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, watchEffect } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { tasksService } from '../services/TasksService'
import Pop from '../utils/Notifier'
import { sprintsService } from '../services/SprintsService'
import { useRoute } from 'vue-router'

export default {
  props: {
    sprint: { type: Object, required: true }
  },
  setup(props) {
    const route = useRoute()
    const tasks = computed(() => AppState.tasks[props.sprint.id] || [])
    const totalWeight = computed(() => tasksService.countWeight(tasks.value))
    watchEffect(async() => {
      try {
        await sprintsService.getTasksBySprintId(route.params.sprintId)
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    return {
      tasks,
      totalWeight,
      startDate: computed(() => {
        if (props.sprint.startDate) {
          const start = new Date(props.sprint.startDate)
          return new Intl.DateTimeFormat('en-US').format(start)
        }
      }),
      endDate: computed(() => {
        if (props.sprint.endDate) {
          const end = new Date(props.sprint.endDate)
          return new Intl.DateTimeFormat('en-US').format(end)
        }
      }),
      async deleteBacklog() {
        try {
          if (await Pop.confirm()) {
            await sprintsService.deleteBacklog(props.sprint.id, route.params.projectId)
            Pop.toast('Successfully Deleted!', 'success')
          }
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

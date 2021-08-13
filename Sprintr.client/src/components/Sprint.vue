<template>
  <!-- Header -->
  <div class="row">
    <div class="col-12 d-flex align-items-center mb-3">
      <div>
        <!-- Name -->
        <h3 class="m-0">
          {{ sprint.name }}
        </h3>
        <!-- Dates -->
        <p class="m-0">
          {{ startDate }} - {{ endDate }}
        </p>
      </div>
      <!-- Total Weight -->
      <h4 class="m-0 ml-4 mr-auto">
        <span class="fa fa-balance-scale"></span> <b>{{ totalWeight }}</b>
      </h4>
      <!-- Delete Button -->
      <div class="text-dark d-flex align-items-center justify-content-end m-3">
        <p class="m-0 pointer" :title="'Delete ' + sprint.name" @click="deleteSprint">
          <span class="fas fa-lg fa-trash"></span>
        </p>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-12" v-for="t in tasks" :key="t.id">
      <Task :task="t" />
    </div>
  </div>
</template>

<script>
import { computed, watchEffect } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { tasksService } from '../services/TasksService'
import Pop from '../utils/Notifier'
import { sprintsService } from '../services/SprintsService'
import { useRoute } from 'vue-router'
import { router } from '../router'

export default {
  props: {
    sprint: { type: Object, required: true }
  },
  setup(props) {
    const route = useRoute()
    const tasks = computed(() => AppState.tasks[props.sprint.id] || [])
    const totalWeight = computed(() => tasksService.countWeight(tasks.value))
    watchEffect(async() => {
      if (route.params.sprintId) {
        try {
          await sprintsService.getTasksBySprintId(route.params.sprintId)
        } catch (error) {
          Pop.toast(error, 'error')
        }
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
      async deleteSprint() {
        try {
          if (await Pop.confirm()) {
            await sprintsService.deleteSprint(props.sprint.id, route.params.projectId)
            router.push({ name: 'BacklogPage', params: { projectId: route.projectId } })
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

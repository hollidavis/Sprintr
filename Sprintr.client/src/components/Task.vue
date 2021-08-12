<template>
  <div class="row">
    <div class="col-12 d-flex align-items-center my-2">
      <p class="m-0 mr-2 pointer" title="Delete Task" @click="deleteTask">
        <span class="fas fa-times"></span>
      </p>
      <h5 class="m-0 mr-auto">
        {{ task.body }}
      </h5>
      <p class="m-0 mr-3">
        <span class="fa fa-balance-scale"></span> <b>{{ task.weight }}</b>
      </p>
      <p class="m-0">
        {{ task.status }}
      </p>
    </div>
  </div>
</template>

<script>
import { tasksService } from '../services/TasksService'
import Pop from '../utils/Notifier'
export default {
  props: {
    task: { type: Object, required: true }
  },
  setup(props) {
    return {
      async deleteTask() {
        try {
          await tasksService.deleteTask(props.task.id, props.task.backlogId)
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

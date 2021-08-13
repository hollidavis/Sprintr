<template>
  <div class="row bg-info rounded shadow mx-2">
    <div class="col-12 d-flex align-items-center my-2">
      <p class="m-0 mr-2 pointer" title="Delete Task" @click="deleteTask">
        <span class="fas fa-times"></span>
      </p>
      <h5 class="m-0 mr-auto pointer"
          data-toggle="modal"
          :data-target="'#taskDetailsModal'+ task.id"
          title="See Task Details"
      >
        <b>{{ task.body }}</b>
      </h5>
      <p class="m-0 mr-3">
        <span class="fa fa-balance-scale"></span> <b>{{ task.weight }}</b>
      </p>
      <p class="m-0">
        <b>{{ task.status }}</b>
      </p>
    </div>
  </div>
  <TaskDetailsModal :task="task" />
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
        if (await Pop.confirm()) {
          try {
            await tasksService.deleteTask(props.task.id, props.task.backlogId)
          } catch (error) {
            Pop.toast(error, 'error')
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

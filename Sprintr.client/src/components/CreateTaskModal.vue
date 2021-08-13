<template>
  <!-- Modal -->
  <div class="modal fade"
       :id="'createTaskModal' + backlog.id"
       tabindex="-1"
       role="dialog"
       aria-labelledby="modelTitleId"
       aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            Create Task
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="createTask">
            <!-- status input -->
            <div class="form-group">
              <select
                name="status"
                v-model="state.newTask.status"
                class="form-control"
                :aria-describedby="backlog.name+'TaskStatus'"
                required
              >
                <option value="Pending">
                  Pending
                </option>
                <option value="In-Progress">
                  In-Progress
                </option>
                <option value="Review">
                  Review
                </option>
                <option value="Done">
                  Done
                </option>
              </select>
              <small :id="backlog.name+'TaskStatus'" class="text-muted">Input Task Status</small>
            </div>
            <!-- body input -->
            <div class="form-group">
              <input type="text"
                     name="body"
                     v-model="state.newTask.body"
                     class="form-control"
                     placeholder="Task Description..."
                     :aria-describedby="backlog.name+'TaskDescription'"
                     required
              >
              <small :id="backlog.name+'TaskDescription'" class="text-muted">Input Task Description</small>
            </div>
            <!-- weight input -->
            <div class="form-group">
              <input type="number"
                     name="weight"
                     v-model="state.newTask.weight"
                     class="form-control"
                     placeholder="Task Weight..."
                     :aria-describedby="backlog.name+'TaskWeight'"
                     required
              >
              <small :id="backlog.name+'TaskWeight'" class="text-muted">Input Task Weight</small>
            </div>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">
              Close
            </button>
            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import Pop from '../utils/Notifier'
import { tasksService } from '../services/TasksService'
import $ from 'jquery'
export default {
  props: {
    backlog: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      newTask: {
        backlogId: props.backlog.id,
        projectId: props.backlog.projectId
      }
    })
    return {
      state,
      async createTask() {
        try {
          await tasksService.createTask(state.newTask)
          state.newTask = {
            backlogId: props.backlog.id,
            projectId: props.backlog.projectId
          }
          $('#createTaskModal' + props.backlog.id).modal('hide')
          Pop.toast('Successfully Created!', 'success')
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

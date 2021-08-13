<template>
  <!-- Modal -->
  <div class="modal fade"
       :id="'taskDetailsModal' + task.id"
       tabindex="-1"
       role="dialog"
       aria-labelledby="modelTitleId"
       aria-hidden="true"
  >
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            {{ task.body }}
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" :title="'Close ' + task.body + ' Modal'">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="editTask" class="d-flex col-12 pb-2 line">
            <!-- status input -->
            <div class="form-group m-0 w-100">
              <select
                name="status"
                v-model="state.newTask.status"
                class="form-control"
                :aria-describedby="task.body+'TaskStatus'"
                required
              >
                <option value="Pending" selected>
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
              <small :id="task.body+'TaskStatus'" class="text-muted">Update Task Status</small>
            </div>
            <!-- sprint input -->
            <div class="form-group m-0 w-100 ml-3 mr-auto">
              <select
                name="sprintId"
                v-model="state.newTask.sprintId"
                class="form-control"
                :aria-describedby="task.body+'TaskSprint'"
                required
              >
                <option v-for="s in sprints" :key="s.id" :value="s.id">
                  {{ s.name }}
                </option>
              </select>
              <small :id="task.body+'TaskSprint'" class="text-muted">Assign Task Sprint</small>
            </div>
            <div class="ml-3">
              <button type="submit" class="btn btn-primary shadow" :title="'Save ' + task.body + ' Changes'">
                Save
              </button>
            </div>
          </form>
          <NoteThread :notes="notes" :task="task" />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary shadow" data-dismiss="modal" :title="'Close ' + task.body + ' Modal'">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from '@vue/runtime-core'
import { AppState } from '../AppState'
import Pop from '../utils/Notifier'
import { tasksService } from '../services/TasksService'
import $ from 'jquery'
import { router } from '../router'
export default {
  props: {
    task: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      newTask: {}
    })
    const notes = computed(() => AppState.notes[props.task.id] || [])
    onMounted(async() => {
      try {
        await tasksService.getNotesByTaskId(props.task.id)
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    return {
      state,
      notes,
      sprints: computed(() => AppState.sprints),
      async editTask() {
        try {
          const newId = await tasksService.editTask(state.newTask, props.task.id)
          $('#taskDetailsModal' + props.task.id).modal('hide')
          router.push({ name: 'SprintPage', params: { sprintId: newId } })
          Pop.toast('Successfully Edited', 'success')
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

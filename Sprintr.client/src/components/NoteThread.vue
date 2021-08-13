<template>
  <div class="col-12 mt-3">
    <form @submit.prevent="createNote" class="d-flex">
      <!-- body input -->
      <div class="form-group w-75 m-0">
        <input type="text"
               name="body"
               v-model="state.newNote.body"
               class="form-control"
               placeholder="Note Description..."
               :aria-describedby="task.body+'NoteDescription'"
               required
        >
        <small :id="task.body+'NoteDescription'" class="text-muted">Input Note Description</small>
      </div>
      <div class="w-25 d-flex justify-content-end align-items-start">
        <button type="submit" class="btn btn-primary shadow" :title="'Create Note for ' + task.body">
          Create Note
        </button>
      </div>
    </form>
  </div>
  <div>
    <h5>Notes:</h5>
    <div class="col-12" v-for="n in notes" :key="n.id">
      <Note :note="n" />
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { notesService } from '../services/NotesService'
import Pop from '../utils/Notifier'
export default {
  props: {
    notes: { type: Array, required: true },
    task: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      newNote: {
        taskId: props.task.id,
        backlogId: props.task.backlogId,
        projectId: props.task.projectId
      }
    })
    return {
      state,
      async createNote() {
        try {
          await notesService.createNote(state.newNote)
          state.newNote = {
            taskId: props.task.id,
            backlogId: props.task.backlogId,
            projectId: props.task.projectId
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

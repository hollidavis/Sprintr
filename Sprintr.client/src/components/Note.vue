<template>
  <div class="row bg-secondary rounded shadow mx-1 my-3">
    <div class="col-12 d-flex align-items-center mt-2">
      <img class="profile-img mr-3" :src="note.creator.picture" :alt="note.creator.name">
      <p class="m-0 mr-auto">
        <b>{{ note.creator.name }}</b>
      </p>
      <p class="m-0 mr-2 pointer" title="Delete Task" @click="deleteNote">
        <span class="fas fa-times"></span>
      </p>
    </div>
    <div class="col-12 d-flex align-items-center my-2">
      <p class="m-0">
        {{ note.body }}
      </p>
    </div>
  </div>
</template>

<script>
import { notesService } from '../services/NotesService'
import Pop from '../utils/Notifier'
export default {
  props: {
    note: { type: Object, required: true }
  },
  setup(props) {
    return {
      async deleteNote() {
        try {
          if (await Pop.confirm()) {
            await notesService.deleteNote(props.note.id, props.note.taskId)
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
.profile-img{
  height: 7vh;
  width: 7vh;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
}
</style>

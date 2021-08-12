<template>
  <!-- Modal -->
  <div class="modal fade"
       id="createBacklogModal"
       tabindex="-1"
       role="dialog"
       aria-labelledby="modelTitleId"
       aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            Create Backlog
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="createBacklog">
            <!-- name input -->
            <div class="form-group">
              <input type="text"
                     name="name"
                     v-model="state.newBacklog.name"
                     class="form-control"
                     placeholder="Backlog Name..."
                     aria-describedby="helpId"
                     required
              >
              <small id="helpId" class="text-muted">Input Backlog Name</small>
            </div>
            <!-- body input -->
            <div class="form-group">
              <input type="text"
                     name="body"
                     v-model="state.newBacklog.body"
                     class="form-control"
                     placeholder="Backlog Description..."
                     aria-describedby="helpId"
                     required
              >
              <small id="helpId" class="text-muted">Input Backlog Description</small>
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
import { backlogsService } from '../services/BacklogsService'
import $ from 'jquery'
import { router } from '../router'
import { useRoute } from 'vue-router'
export default {
  setup() {
    const route = useRoute()
    const state = reactive({
      newBacklog: {
        projectId: route.params.projectId
      }
    })
    return {
      state,
      async createBacklog() {
        try {
          await backlogsService.createBacklog(state.newBacklog)
          state.newBacklog = {}
          $('#createBacklogModal').modal('hide')
          router.push({ name: 'BacklogPage' })
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

<template>
  <!-- Modal -->
  <div class="modal fade"
       id="createSprintModal"
       tabindex="-1"
       role="dialog"
       aria-labelledby="modelTitleId"
       aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            Create Sprint
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="createSprint">
            <!-- name input -->
            <div class="form-group">
              <input type="text"
                     name="name"
                     v-model="state.newSprint.name"
                     class="form-control"
                     placeholder="Sprint Name..."
                     aria-describedby="helpId"
                     required
              >
              <small id="helpId" class="text-muted">Input Sprint Name</small>
            </div>
            <!-- startDate input -->
            <div class="form-group">
              <input type="date"
                     name="startDate"
                     v-model="state.newSprint.startDate"
                     class="form-control"
                     placeholder="Sprint Start Date..."
                     aria-describedby="helpId"
                     required
              >
              <small id="helpId" class="text-muted">Input Sprint Start Date</small>
            </div>
            <!-- endDate input -->
            <div class="form-group">
              <input type="date"
                     name="endDate"
                     v-model="state.newSprint.endDate"
                     class="form-control"
                     placeholder="Sprint End Date..."
                     aria-describedby="helpId"
                     required
              >
              <small id="helpId" class="text-muted">Input Sprint End Date</small>
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
import { sprintsService } from '../services/SprintsService'
import $ from 'jquery'
import { router } from '../router'
import { useRoute } from 'vue-router'
export default {
  setup() {
    const route = useRoute()
    const state = reactive({
      newSprint: {
        projectId: route.params.projectId
      }
    })
    return {
      state,
      async createSprint() {
        try {
          const newId = await sprintsService.createSprint(state.newSprint)
          state.newSprint = {}
          $('#createSprintModal').modal('hide')
          router.push({ name: 'SprintPage', params: { sprintId: newId } })
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

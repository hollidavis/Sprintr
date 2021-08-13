<template>
  <!-- Modal -->
  <div class="modal fade"
       id="createProjectModal"
       tabindex="-1"
       role="dialog"
       aria-labelledby="modelTitleId"
       aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            Create Project
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="createProject">
            <!-- name input -->
            <div class="form-group">
              <input type="text"
                     name="name"
                     v-model="state.newProject.name"
                     class="form-control"
                     placeholder="Project Name..."
                     aria-describedby="inputProjectName"
                     required
              >
              <small id="inputProjectName" class="text-muted">Input Project Name</small>
            </div>
            <!-- description input -->
            <div class="form-group">
              <input type="text"
                     name="description"
                     v-model="state.newProject.description"
                     class="form-control"
                     placeholder="Project Description..."
                     aria-describedby="inputProjectDescription"
                     required
              >
              <small id="inputProjectDescription" class="text-muted">Input Project Description</small>
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
import { projectsService } from '../services/ProjectsService'
import $ from 'jquery'
import { router } from '../router'
export default {
  setup() {
    const state = reactive({
      newProject: {}
    })
    return {
      state,
      async createProject() {
        try {
          const newId = await projectsService.createProject(state.newProject)
          state.newProject = {}
          $('#createProjectModal').modal('hide')
          router.push({ name: 'BacklogPage', params: { projectId: newId } })
          Pop.toast('Successfully Created', 'success')
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

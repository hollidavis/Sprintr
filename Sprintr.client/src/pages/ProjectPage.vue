<template>
  <div class="col-12">
    <div class="row">
      <div class="col-12 p-0 child-navbar">
        <ChildNavbar :active="activeProject" :sprints="sprints" :backlogs="backlogs" />
      </div>
      <div class="row w-100">
        <!-- <div class="col-6">
          <div class="ml-3 mt-2 d-flex flex-column justify-content-center">
            <h3 class="m-0">
              Backlog Items
            </h3>
            <p class="m-0">
              Group your tasks into backlogs for over-arching collections for better organization.
            </p>
          </div>
          <div class="ml-3 mt-2 d-flex flex-column justify-content-center">
            <h3 class="m-0">
              Backlog Items
            </h3>
            <p class="m-0">
              Group your tasks into backlogs for over-arching collections for better organization.
            </p>
          </div>
        </div> -->
        <div class="col-12 d-flex justify-content-end my-3">
          <!-- create backlog button -->
          <button type="submit"
                  class="btn btn-outline-success mr-3"
                  data-toggle="modal"
                  data-target="#createBacklogModal"
                  title="Create Backlog Button"
          >
            New Backlog Item
          </button>
          <!-- create sprint button -->
          <button type="submit"
                  class="btn btn-outline-success"
                  data-toggle="modal"
                  data-target="#createSprintModal"
                  title="Create Sprint Button"
          >
            New Sprint
          </button>
        </div>
      </div>
      <div class="col-12">
        <router-view />
      </div>
    </div>
  </div>
  <CreateBacklogModal />
  <CreateSprintModal />
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { projectsService } from '../services/ProjectsService'
import Pop from '../utils/Notifier'
import { AppState } from '../AppState'
export default {
  setup() {
    const route = useRoute()
    onMounted(async() => {
      try {
        await projectsService.setActiveProject(route.params.projectId)
        await projectsService.getSprintsByProjectId(route.params.projectId)
        await projectsService.getBacklogsByProjectId(route.params.projectId)
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    return {
      activeProject: computed(() => AppState.activeProject),
      sprints: computed(() => AppState.sprints),
      backlogs: computed(() => AppState.backlogs)
    }
  }
}
</script>

<style lang="scss" scoped>
.child-navbar{
  height: fit-content;
}
</style>

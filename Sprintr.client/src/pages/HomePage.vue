<template>
  <div class="home col-12 shadow">
    <!-- Project heading and create project button -->
    <div class="row align-items-center">
      <div class="col-6">
        <div class="mt-3 ml-3">
          <h2 class="m-0">
            Projects
          </h2>
          <p>This is a list of all your projects</p>
        </div>
      </div>
      <div class="col-6 d-flex justify-content-end">
        <button type="button"
                class="btn btn-outline-primary"
                data-toggle="modal"
                data-target="#createProjectModal"
                title="Create Project Button"
        >
          Create Project
        </button>
      </div>
    </div>
    <Project v-for="p in projects" :key="p.id" :project="p" />
  </div>
  <CreateProjectModal />
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  setup() {
    return {
      projects: computed(() => AppState.projects)
    }
  }
}
</script>

<style scoped lang="scss">
</style>

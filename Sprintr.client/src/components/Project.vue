<template>
  <div class="project row my-4 mx-2 line bg-primary shadow rounded">
    <div class="col-11 d-flex text-light align-items-center py-2">
      <router-link class="text-light" :to="{ name: 'ProjectPage', params: { projectId: project.id } }" :title="project.name + ' Details Page'">
        <h3 class="m-0 mr-4">
          {{ project.name }}
        </h3>
      </router-link>
      <p class="m-0 text-break">
        {{ project.description }}
      </p>
    </div>
    <div class="col-1 text-light d-flex align-items-center justify-content-end">
      <p class="m-0 pointer" :title="'Delete ' + project.name" @click="deleteProject">
        <span class="fas fa-trash"></span>
      </p>
    </div>
  </div>
</template>

<script>
import { projectsService } from '../services/ProjectsService'
import Pop from '../utils/Notifier'
export default {
  name: 'Project',
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      async deleteProject() {
        try {
          if (await Pop.confirm()) {
            await projectsService.deleteProject(props.project.id)
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
</style>

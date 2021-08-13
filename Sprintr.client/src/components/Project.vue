<template>
  <div class="project row my-4 mx-2 bg-primary shadow rounded">
    <div class="col-11 d-flex text-light align-items-center py-2">
      <h3 class="m-0 mr-4 pointer text-shadow"
          :title="'Navigate to '
            + project.name + ' Details Page'"
          @click="setActiveProject"
      >
        {{ project.name }}
      </h3>
      <p class="m-0 text-break text-shadow">
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
import { router } from '../router'
import { projectsService } from '../services/ProjectsService'
import Pop from '../utils/Notifier'
export default {
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
      },
      async setActiveProject() {
        try {
          await projectsService.setActiveProject(props.project.id)
          router.push({ name: 'BacklogPage', params: { projectId: props.project.id } })
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

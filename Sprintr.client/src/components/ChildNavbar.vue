<template>
  <nav class="child-navbar navbar navbar-expand-lg navbar-dark bg-primary text-shadow">
    <a class="navbar-brand">{{ active.name }}</a>
    <button class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor01"
            aria-controls="navbarColor01"
            aria-expanded="false"
            aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarColor01">
      <ul class="navbar-nav me-auto">
        <li class="nav-item">
          <router-link :to="{name:'BacklogPage' }" class="nav-link active" title="Navigate to Backlog Page">
            BackLog
          </router-link>
        </li>
        <li class="nav-item" v-for="s in sprints" :key="s.id">
          <router-link :to="{name:'SprintPage', params: { sprintId: s.id } }" class="nav-link active" :title="'Navigate to ' + s.name + ' Page'">
            {{ s.name }}
          </router-link>
        </li>
      </ul>
    </div>
    <p class="m-0 pointer" title="Delete Project" @click="deleteProject">
      <span class="fas fa-trash"></span>
    </p>
  </nav>
</template>

<script>
import { useRoute } from 'vue-router'
import { router } from '../router'
import { projectsService } from '../services/ProjectsService'
import Pop from '../utils/Notifier'
export default {
  props: {
    active: { type: Object, required: true },
    sprints: { type: Array, required: true },
    backlogs: { type: Array, required: true }
  },
  setup(props) {
    const route = useRoute()
    return {
      route,
      async deleteProject() {
        try {
          if (await Pop.confirm()) {
            await projectsService.deleteProject(route.params.projectId)
            Pop.toast('Successfully Deleted!', 'success')
          }
          router.push({ name: 'Home' })
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.child-navbar{
  height: fit-content;
}
</style>

<template>
  <div class="row bg-primary shadow  mx-2 mt-2">
    <div class="col-11 d-flex text-light align-items-center py-2">
      <button class="btn mr-2"
              type="button"
              data-toggle="collapse"
              :data-target="'#collapse' + backlog.id"
      >
        <span class="fas fa-chevron-down text-white"></span>
      </button>
      <h3 class="m-0 mr-4 pointer"
          :title="'Navigate to '
            + backlog.name + ' Details Page'"
      >
        {{ backlog.name }}
      </h3>
      <p class="m-0 text-break">
        {{ backlog.description }}
      </p>
    </div>
    <div class="col-1 text-light d-flex align-items-center justify-content-end">
      <p class="m-0 pointer" :title="'Delete ' + backlog.name" @click="deleteBacklog">
        <span class="fas fa-trash"></span>
      </p>
    </div>
  </div>
  <div class="collapse" :id="'collapse' + backlog.id">
    <div class="row bg-info shadow mx-2">
      <div class="col-12" v-for="t in tasks" :key="t.id">
        <Task :task="tasks" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { backlogsService } from '../services/BacklogsService'
import Pop from '../utils/Notifier'
import { AppState } from '../AppState'
export default {
  props: {
    backlog: { type: Object, required: true }
  },
  setup(props) {
    const route = useRoute()
    onMounted(async() => {
      try {
        await backlogsService.getTasksByBacklogId(props.backlog.id)
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    return {
      tasks: computed(() => AppState.tasks[props.backlog.id] || []),
      async deleteBacklog() {
        try {
          if (await Pop.confirm()) {
            await backlogsService.deleteBacklog(props.backlog.id, route.params.projectId)
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

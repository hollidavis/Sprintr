<template>
  <nav class="child-navbar navbar navbar-expand-lg navbar-dark bg-primary">
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
          <router-link :to="{name:'BacklogPage' }" class="nav-link active">
            BackLog
          </router-link>
        </li>
        <li class="nav-item" v-for="s in sprints" :key="s.id">
          <router-link :to="{name:'SprintPage', params: { sprintId: s.id } }" class="nav-link active" href="#">
            {{ s.name }}
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    active: { type: Object, required: true },
    sprints: { type: Array, required: true },
    backlogs: { type: Array, required: true }
  },
  setup() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.child-navbar{
  height: fit-content;
}
</style>

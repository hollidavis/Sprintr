<template>
  <div class="project col-12">
    <h1>{{ project.name }}</h1>
    <p>{{ project.description }}</p>
  </div>
</template>

<script>
export default {
  name: 'Project',
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>

<template>
  <div class="">
    {{ task }}
  </div>
</template>

<script>
export default {
  props: {
    task: { type: Object, required: true }
  },
  setup() {
    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>

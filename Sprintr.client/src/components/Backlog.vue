<template>
  <div class="row">
    <div class="col-12">
      {{ backlog }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    backlog: { type: Object, required: true }
  },
  setup() {
    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>

<template>
  <div class="row">
    <div class="col-12">
      {{ sprint.name }}
    </div>
  </div>
</template>

<script>

export default {
  props: {
    sprint: { type: Object, required: true }
  },
  setup() {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

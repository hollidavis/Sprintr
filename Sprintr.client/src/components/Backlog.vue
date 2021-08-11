<template>
  <div class="row">
    <div class="col-12">
      {{ backlog }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Backlog',
  props: {
    backlog: { type: Object, required: true }
  },
  setup() {
    return {}
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>

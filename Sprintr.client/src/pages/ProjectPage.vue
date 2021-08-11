<template>
  <div class="col-12 p-0">
    <div class="row">
      <div class="col-12 child-navbar">
        <ChildNavbar />
      </div>
      <div class="col-12">
        <p>Project Page</p>
        <!-- <router-link :to="{name: BacklogPage}"></router-link> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectPage',
  setup() {
    return {}
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.child-navbar{
  height: fit-content;
}
</style>

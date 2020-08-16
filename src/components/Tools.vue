<template>
  <div>
    <TopTools></TopTools>
    <Aside></Aside>
    <router-view></router-view>
  </div>
</template>

<script>
    import TopTools from "./TopTools";
    import Aside from "./Aside";
    export default {
        name: "Tools",
      components: {Aside, TopTools}
    }
</script>

<style scoped>

</style>

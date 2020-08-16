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
    import Editfile from "./Editfile";
    export default {
        name: "Tools",
      components: {Editfile, Aside, TopTools},
      created() {
      }
    }
</script>
<style>
</style>

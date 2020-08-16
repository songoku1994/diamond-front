<template>
  <div>
    <TopTools></TopTools>
    <Aside></Aside>
    没错，我就是最重要的主页
  </div>
</template>

<script>
  import TopTools from "./TopTools";
  import Aside from "./Aside";
    export default {
        name: "Home",
      components: {Aside, TopTools}
    }
</script>

<style scoped>

</style>

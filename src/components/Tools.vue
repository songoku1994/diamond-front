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
    import NewFile from "./NewFile";
    export default {
        name: "Tools",
      components: {NewFile, Aside, TopTools},
    }
</script>
<style>
</style>

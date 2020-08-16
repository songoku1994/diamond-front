<template>
  <div>

    <router-view></router-view>
  </div>
</template>

<script>
  import TopTools from "./components/TopTools";
  import Aside from "./components/Aside";
  import Home from "./components/Home";
  export default {
  name: 'App',
  components: {Home, Aside, TopTools},
}
</script>

<style>
</style>

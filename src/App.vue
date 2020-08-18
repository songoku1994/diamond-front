<template>
<!--  <div>-->
<!--    <TopTools/>-->
<!--    <Aside/>-->
<!--    <UserFile></UserFile>-->
<!--    <TeamManage/>-->
<!--    <Bin/>-->
<!--  </div>-->
  <router-view></router-view>
</template>
<script>
  import test from './components/test'
  import TopTools from "./components/TopTools";
  import Aside from "./components/Aside";
  import TeamManage from "./components/TeamManage";
  import UserFile from "./components/UserFile";
  import Bin from "./components/Bin";
  export default {
  name: 'App',
    components:{Bin, UserFile, TeamManage, Aside, TopTools, test}
}

</script>

<style>
</style>

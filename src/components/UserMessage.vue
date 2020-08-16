<template>
  <div>
    <div style="width: 70%;margin-top: 30px;float: left">
      <div class="info" style="float: left">
        <h1 style="float: left">我的消息</h1>
      </div>
      <div class="info" style="border-bottom:2px solid #CCC;padding-top: 100px;margin-right:100px"></div>
    </div>
  </div>
</template>

<script>
  import TopTools from "./TopTools";
  import Aside from "./Aside";
  export default {
    name: "UserMessage",
    created() {
      /*这里写后端代码（初始化）








       */
    },
    components: {Aside, TopTools}
  }
</script>

<style scoped>
  .info{
    margin-left: 8%;
  }
</style>

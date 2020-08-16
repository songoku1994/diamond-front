<template>
  <div>
    <div style="display:flex;line-height: 80px;background-color: #B3C0D1">
      <div v-for="i in 4">&nbsp</div>
      <div><el-button icon="el-icon-s-home" type="primary" @click="jump('/tools/home')" style="font-size: 20px">金刚石文档</el-button></div>
      <div style="flex: 1"></div>
        <div style="display: flex">
          <div><el-input placeholder="搜索文档" v-model="SearchInput" clearable suffix-icon="el-icon-search"></el-input></div>
          <div v-for="i in 4">&nbsp</div>
          <div><el-button icon="el-icon-search" type="primary">搜索</el-button></div>
          <div v-for="i in 4">&nbsp</div>
          <div><el-button type="danger" icon="el-icon-error" @click="jump('/login')">注销</el-button></div>
          <div v-for="i in 4">&nbsp</div>
        </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "TopTools",
      data(){
          return{
            SearchInput:'',
            Mine:[
              {name:'我的个人信息',url:'/tools/userinfo'},
              {name:'我的消息',url:'/tools/usermessage',newnum:5},
              {name:'我的团队',url:'/tools/userteam'},
              {name:'我的文档',url:'/tools/userfile'},
              {name:'我的回收站',url:'/tools/bin'},
              ]
          }
        },
      methods:{
          jump(url){
            if(this.$route.path!=url)
            this.$router.push(url)
          },
      }
    }
</script>

<style scoped>
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>

<template>
  <div>
    <br>
    <div style="display:flex;line-height: 80px;background-color: #B3C0D1">
      <div v-for="i in 4">&nbsp</div>
      <div><el-button icon="el-icon-s-home" type="primary" @click="jump('/home')">金刚石文档</el-button></div>
      <div style="flex: 1"></div>
        <div style="display: flex">
          <div><el-input placeholder="搜索文档" v-model="SearchInput" clearable suffix-icon="el-icon-search"></el-input></div>
          <div v-for="i in 4">&nbsp</div>
          <div><el-button icon="el-icon-search" type="primary">搜索</el-button></div>
          <div v-for="i in 4">&nbsp</div>
          <el-dropdown @command="jump">
            <span style="cursor:pointer;color:#409EFF">我的<i class="el-icon-arrow-down el-icon--right"></i></span>
            <el-dropdown-menu slot="dropdown">
              <div v-for="i in Mine" style="display: flex">
                  <el-dropdown-item :command="i.url" style="flex: 1">{{i.name}}</el-dropdown-item>
                <el-badge  :value="i.newnum"></el-badge>
              </div>
            </el-dropdown-menu>
          </el-dropdown>
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
              {name:'我的个人信息',url:'/userinfo'},
              {name:'我的消息',url:'/usermessage',newnum:5},
              {name:'我的团队',url:'/userteam'},
              {name:'我的文档',url:'userfile'},
              {name:'我的回收站',url:'/bin'},
              ]
          }
        },
      methods:{
          jump(url){
            if(this.$route.path!=url)
            this.$router.push(url)
          },
        searchName(url){
            for(j=0;j<routes.length;j++){
              if(routes[j].path===url){
                console.log(routes[j].name)
              }
            }
        }
      }
    }
</script>

<style scoped>
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>

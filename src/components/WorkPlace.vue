<template>
  <div id="work_head">
    <div style="width: 70%;float: left">
        <div v-bind:class="[activeIndex == item.id ? 'select_option' : 'option']" v-for="(item,index) in name" :key="index" @click="handleclick(item.url)">
            <span>{{ item.title }}</span>
        </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "WorkPlace",
    props: {
        active: String,
    },
    data() {
      return{
        name: [
          {icon: "el-icon-edit", title: "最近浏览", url:'/tools/home',id:"1"},
          {icon: "el-icon-share", title: "我创建的", url:'/tools/ownfile',id:"2"},
          {icon: "el-icon-delete", title: "我的收藏", url:'/tools/usercollection',id:"3"},
          {icon: "el-icon-user", title: "工作动态", url:'/tools/worktrend',id:"4"},
        ],
        activeIndex: this.active,
      }
    },
    methods: {
      handleclick(url) {
        if(this.$route.path != url)
          this.$router.push(url)
      },
    },
  }
</script>

<style scope>
  #work_head {
    margin-left: 8%;
    margin-top: 30px;
  }

  #test {
    text-align: center;
  }

  #wid {
    width: 50px;
  }

  #third {
    margin-top: 10px;
  }

  #aside {
    font-size: 20px;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;;
  }

  .block {
    height: 30px;
  }

  .option {
    float: left;
    margin-left: 20px;
    font-size: 25px;
    cursor: pointer;
    color:lightslategrey;
  }

  .option:hover {
    color:black;
  }

  .select_option {
    float: left;
    margin-left: 20px;
    font-size: 25px;
    cursor: pointer;
    color: black;
  }

</style>

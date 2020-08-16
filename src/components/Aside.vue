<template>
  <div>
    <el-col :span="3">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose">
        <div class="block"></div>
        <div id="test">
          <el-menu-item v-for="(item,i) in name" :key="i" :index="i" @click="handle(item.url)">
            <i :class="item.icon"></i>
            <span slot="title">{{item.title}}</span>
          </el-menu-item>
          <el-submenu index="4" >
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>我的空间</span>
            </template>
            <el-menu-item-group>
              <el-menu-item v-for="(item,i) in zone" :key="i" :index="item.id" @click="handle(item.url)">
                <i :class="item.icon"></i>
                <span slot="title">{{item.title}}</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </div>
      </el-menu>
    </el-col>
  </div>
</template>

<script>
  export default {
    name: "Aside",
    props: {
      active: String,
      isson: String,
    },
    data() {
      return{
        name: [
          {icon: "el-icon-edit", title: "工作台", url:'/tools/home'},
          {icon: "el-icon-share", title: "啦啦啦啦", url:'/tools/home1'},
          {icon: "el-icon-delete", title: "导航三", url:'/tools/home2'},
          {icon: "el-icon-user", title: "导航四", url:'/tools/home3'},
        ],
        zone: [
          {icon: "el-icon-edit", title: "个人信息", url:'/tools/userinfo', id:"4-1"},
          {icon: "el-icon-share", title: "我的团队", url:'/tools/userteam', id:"4-2"},
          {icon: "el-icon-share", title: "我的消息", url:'/tools/usermessage', id:"4-3"},
          {icon: "el-icon-s-claim", title: "我的文档", url:'/tools/userfile', id:"4-4"},
          {icon: "el-icon-delete", title: "我的回收站", url:'/tools/bin', id:"4-5"},
        ],
        activeIndex: this.active,
        openson: this.isson === "true",
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handle(url) {
        if(this.$route.path != url)
          this.$router.push(url)
      },
    },
    created() {

    },
  }
</script>

<style scope>
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

</style>

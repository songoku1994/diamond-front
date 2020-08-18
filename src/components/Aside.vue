<template>
  <div>
    <div class="fixedBlock" v-if="isFixed">
      <el-col :span="3">
        <span v-for="i in 5">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
      </el-col>
    </div>
    <div id="fixedAside" :class="{fixedAside : isFixed}">
      <el-col :span="3">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose">
        <div class="block"></div>
        <div id="test">
          <el-menu-item v-for="(item,i) in name" :key="i" :index="item.id" @click="handle(item.url)">
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
                <div>
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <span slot="title">{{item.title}}</span>
                  <el-button type="text" icon="el-icon-circle-plus" v-if="item.id==='4-4'" @click="NewFile"></el-button>
                  <span v-if="item.id!='4-4'">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                </div>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </div>
      </el-menu>
    </el-col>
<!--    <div v-if="NewFileVisible">-->
      <NewFile :visible="NewFileVisible" @cancel="NewFileVisible=false"></NewFile>
<!--    </div>-->
    </div>

  </div>
</template>

<script>
  import NewFile from "./NewFile";
  export default {
    name: "Aside",
    components: {NewFile},
    data() {
      return{
        isFixed: false,
        offsetTop: 0,
        name: [
          {icon: "el-icon-edit", title: "工作台", url:'/tools/home',id:"1"},
          {icon: "el-icon-share", title: "团队管理", url:'/tools/home',id:"2"},
        ],
        zone: [
          {icon: "el-icon-edit", title: "个人信息", url:'/tools/userinfo', id:"4-1"},
          {icon: "el-icon-share", title: "我的团队", url:'/tools/userteam', id:"4-2"},
          {icon: "el-icon-s-comment", title: "我的消息", url:'/tools/usermessage', id:"4-3"},
          {title: "我的文档", url:'/tools/userfile', id:"4-4"},
          {icon: "el-icon-delete", title: "我的回收站", url:'/tools/bin', id:"4-5"},
        ],
        activeIndex: "1",
        openson: this.isson === "true",
        NewFileVisible:false
      }
    },
    mounted() {
      this.offsetTop = document.querySelector("#fixedAside").offsetTop;
      window.addEventListener('scroll', this.handleScroll);
    },
    methods: {
      handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        if (scrollTop >= this.offsetTop) {
          this.isFixed = true;
        } else {
          this.isFixed = false;
        }
      },
      NewFile(){
        console.log(123321)
        this.NewFileVisible=true
      },
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
      newfile() {
        this.$notify({
          title: '提示',
          message: '这是一条不会自动关闭的消息',
        });
      }
    },
    created() {

    },
    destroyed () {
      window.removeEventListener('scroll', this.handleScroll); // 离开页面 关闭监听 不然会报错
    }
  }
</script>

<style scope>
  #fixedAside {
    z-index: 99;
  }

    .fixedAside {
        position: fixed;
        z-index: 90;
        top: 0;
        height: 60px;
        width: 100%;
    }

  .newbutton {
    width: 30px;
    height: 30px;
    background-color: rgb(211, 211, 211);
    color:darkblue;
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
    height: 200px;
  }

</style>

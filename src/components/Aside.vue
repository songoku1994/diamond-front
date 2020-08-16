<template>
  <div>
    <el-col :span="3">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose">
        <el-menu-item v-for="(item,i) in name" :key="i" :index="i.toString()">
          <i :class="item.icon" style="margin-left:30%"></i>
          <span slot="title">{{item.title}}</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </div>
</template>

<script>
  export default {
    name: "Aside",
    data() {
      return{
        name: [
          {icon: "el-icon-edit", title: "导航一"},
          {icon: "el-icon-share", title: "导航二"},
          {icon: "el-icon-delete", title: "导航三"},
          {icon: "el-icon-user", title: "导航四"},
        ],
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style scope>
  #wid {
    width: 50px;
  }

  #third {
    margin-top: 10px;
  }

</style>

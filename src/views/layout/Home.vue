<template>
  <el-container>
    <el-aside width="200px">
      <MyMenu/>
    </el-aside>
    <el-main>
      <transition name="fade-transform" mode="out-in">
        <router-view />
      </transition>
    </el-main>
  </el-container>
</template>

<script>
import MyMenu from './Menu.vue'
export default {
  name: "home",
  components: {
    MyMenu
  }
};
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
  background-color: cadetblue;
  .el-main {
    padding: 0;
  }
}
</style>
<template>
  <el-container>
    <el-aside width="200px">
      <my-menu />
    </el-aside>
    <el-main>
      <my-header />
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
import Menu from "./Menu.vue";
import Header from "./Header.vue";
export default {
  name: "home",
  components: {
    'my-menu': Menu,
    'my-header': Header
  }
};
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
  .el-main {
    padding: 0;
  }
  .el-aside {
    max-width: 200px;
    overflow: hidden;
    background-color: rgb(84, 92, 100);
  }
}
</style>
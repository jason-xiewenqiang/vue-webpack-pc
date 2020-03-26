<template>
  <el-container>
    <el-aside width="200px">Aside</el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "home"
};
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
  .el-main {
    padding: 0;
  }
}
</style>
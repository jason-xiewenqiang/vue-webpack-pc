<template>
  <div>
    <h1>Hello World! a b c</h1>
    <h1>Hello World!</h1>
    <h1>Hello World!</h1>
    <h1>Hello World!</h1>
    <el-row>
      <el-button>默认按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </el-row>
    <img src="../src/assets/images/test.jpg" alt />
  </div>
</template>

<script>
export default {
  name: "App",
  mounted() {}
};
</script>

<style lang='less' scoped>
/** sssss */
html,
body {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-size: 16px;
  display: flex;
  /** sssss */
  h1 {
    color: blue;
  }
  h3 {
    color: bisque;
  }
}
</style>

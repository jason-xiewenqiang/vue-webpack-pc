<template>
  <div class="my-header">
    <div class="header-bar">
      <div class="expand-menu-icon">
        <i class="el-icon-s-fold"></i>
        <i class="el-icon-s-unfold"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "my-header"
};
</script>

<style lang="less" scoped>
.my-header {
  height: 90px;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.12), 0 0 3px 0 rgba(0,0,0,.04);
  .header-bar {
    height: 50px;
    display: flex;
    .expand-menu-icon {
      font-size: 32px;
      width: 50px;
      height: 50px;
      line-height: 50px;
    }
  }
}
</style>

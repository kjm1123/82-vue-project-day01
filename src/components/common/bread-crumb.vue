<template>
<!-- separator代表 他们之间用 > 来分割 -->
    <el-breadcrumb separator=">">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>
      <!-- <定义一个插槽> -->
      <slot name="title"></slot>
  </el-breadcrumb-item>
</el-breadcrumb>
</template>

<script>
export default {

}
</script>

<style>

</style>

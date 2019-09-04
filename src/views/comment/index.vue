<template>
  <!-- 最外层用 el-card 卡片做页面 -->
  <el-card>
    <!-- 利用面包屑的标签(具名插槽) -->
    <bread-crumb slot="header">
      <template slot="title">评论列表</template>
    </bread-crumb>
    <!-- ----表格  这里边需要数据 -->
    <el-table :data = 'tableData'>
      <el-table-column width ="700px" label="标题" prop="name"> </el-table-column>
      <el-table-column  label="评论状态" prop="date"> </el-table-column>
      <el-table-column label="总评论数" prop="address"> </el-table-column>
       <el-table-column  label="粉丝评论数" prop="date"> </el-table-column>
      <el-table-column label="操作" prop="address"> </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  }
}
</script>

<style>
</style>

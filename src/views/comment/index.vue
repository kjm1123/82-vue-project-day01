<template>
  <!-- 最外层用 el-card 卡片做页面 -->
  <el-card>
    <!-- 利用面包屑的标签(具名插槽) -->
    <bread-crumb slot="header">
      <template slot="title">评论列表</template>
    </bread-crumb>
    <!-- ----表格  这里边需要数据 -->
    <el-table :data="list">
      <!-- formatter 是 el-table-cllumn 属性 -->
      <el-table-column width="700px" label="标题" prop="title"></el-table-column>
      <el-table-column :formatter="formatter" label="评论状态" prop="comment_status"></el-table-column>
      <el-table-column label="总评论数" prop="total_comment_count"></el-table-column>
      <el-table-column label="粉丝评论数" prop="fans_comment_count"></el-table-column>
      <el-table-column label="操作" prop="address">
        <!-- 这个地方使用了 作用域插槽 -->
        <template slot-scope="obj">
          <el-button size="small" type="text">修改评论</el-button>
          <el-button @click="openOrClose(obj.row)" size="small" :style='{color:obj.row.comment_status ? "#E6A23C" : "#409EFF"}' type="text"
          >{{obj.row.comment_status ? '关闭评论' : '正常评论'}}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    openOrClose (row) {
      // 打开或关闭评论
      let mess = row.comment_status ? '关闭' : '打开'
      this.$confirm(`您是否要${mess}评论`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        // 写接口
        this.$axios({
          method: 'put',
          url: '/comments/status',
          params: { article_id: row.id }, // 传过article 参数
          data: { allow_comment: !row.comment_status } // 取反  因为当前是true,只能改成false   当前是false的话,只能改成true
        }).then(result => {
          this.getComments() // 成功之后  重新调用  拉取数据 ==> 前后台同步
        })
      })
    },

    formatter (row) {
      // console.log(1)
      return row.comment_status ? '正常' : '关闭'
    },
    getComments () {
      // query参数  就相当于 get参数  路径参数  URL参数  params
      // body 路径参数 data
      this.$axios({
        url: '/articles',
        params: { response_type: 'comment' }
      }).then(result => {
        // console.log(result.data)
        // 再把打印出来的数据给了当前的list
        this.list = result.data.results
      })
    }
  },
  // 要记得调用
  created () {
    this.getComments()
  }
}
</script>

<style>
</style>

<template>
  <!-- 最外层用 el-card 卡片做页面 -->
  <el-card v-loading="loading">
    <!-- 利用面包屑的标签(具名插槽) -->
    <bread-crumb slot="header">
      <template slot="title">评论列表</template>
    </bread-crumb>
    <!-- ----表格  这里边需要数据 -->
    <el-table :data="list">
      <!-- formatter 是 el-table-cllumn 属性 -->
      <el-table-column width="500px" label="标题" prop="title"></el-table-column>
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

    <el-row type="flex" justify="center" style="margin:10px 0">
        <!-- //分页组件  current-page 当前页码  page-size每页显示多少条  total  表示总的页数 -->
         <el-pagination   @current-change="changePage"  :current-page = "page.page" :page-size = "page.pageSize" :total = "page.total"
  background
  layout="prev, pager, next" >
</el-pagination>
    </el-row>

  </el-card>

</template>

<script>
export default {
  data () {
    return {
      loading: false, // 控制进度条的状态
      list: [],
      page: {
        page: 1, // 当前页码
        pageSize: 10, // 当前条数
        total: 0 // 当前总数
      }

    }
  },
  methods: {
    changePage (newPage) {
      // alert(newPage)
      // 给当前页面最心值
      this.page.page = newPage
      this.getComments()
    },

    openOrClose (row) {
      // 打开或关闭评论
      let mess = row.comment_status ? '关闭' : '打开'
      this.$confirm(`您是否要${mess}评论`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 写接口
        this.$axios({
          method: 'put',
          url: '/comments/status',
          params: { article_id: row.id.toString() }, // 传过article 参数
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
      this.loading = true // 请求之前把进度条打开
      // query参数  就相当于 get参数  路径参数  URL参数  params
      // body 路径参数 data
      this.$axios({
        url: '/articles',
        params: { response_type: 'comment', page: this.page.page, per_page: this.page.pageSize }
      }).then(result => {
        this.loading = false // 请求之后把进度条关闭
        // console.log(result.data)
        // 再把打印出来的数据给了当前的list
        this.list = result.data.results
        this.page.total = result.data.total_count
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

<template>
  <el-card class="material">
    <!-- 加入面包屑 -->
    <bread-crumb slot="header">
      <template slot="title">素材管理</template>
    </bread-crumb>
    <!-- //上传素材 -->
      <el-upload :show-file-list = "false" :http-request = "uploadImg"  action ="" class="upload-btn">
        <el-button  size="small" type="primary">上传图片</el-button>
      </el-upload>
    <el-tabs v-model = "activeName" @tab-click = "changeTab">
      <el-tab-pane label="全部素材" name="all">
        <!-- //全部素材的内容 -->
        <div class="card-list">
          <el-card class="img-card" v-for = "item in list" :key = "item.id">
            <img :src = "item.url" alt />
            <el-row class="operate" align="middle" type="flex" justify="space-around">
              <!-- space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。 -->

              <i @click = "collectOrcancel(item)" :style = "{color: item.is_collected ?  'red' : '' }" class="el-icon-star-on"></i>
              <i @click = "delImg(item)" class="el-icon-delete"></i>
            </el-row>
          </el-card>
        </div>
         <el-row type="flex" justify="center">
          <el-pagination  @current-change= "changePage" :current-page = "page.page" :page-size = 'page.pageSize'  :total = "page.total"
  background
  layout="prev, pager, next"
 >
</el-pagination>
      </el-row>
      </el-tab-pane>
      <el-tab-pane label="收藏图片 " name="collect">
        <!-- 全部收藏的内容 -->

        <div class="card-list">
          <el-card class="img-card" v-for = "item in list" :key = "item.id">
            <img :src="item.url" alt />
            <!-- <el-row class="operate" align="middle" type="flex" justify="space-around">
            space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。

             <i :style="{color: item.is_collected ? 'red' : ''}" class="el-icon-star-on"></i>
              <i class="el-icon-delete"></i>
            </el-row>-->
          </el-card>
        </div>
         <el-row type="flex" justify="center">
          <el-pagination  @current-change= "changePage" :current-page = "page.page" :page-size = 'page.pageSize'  :total = "page.total"
  background
  layout="prev, pager, next"
 >
</el-pagination>
      </el-row>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all', // 默认为全部素材
      list: [], // 全部素材和收藏图片都用在list这个数据上
      //   collect_list: []
      page: {
        page: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  methods: {
    // 选择完图片之后执行
    uploadImg (params) {
      // 这是formdata类型
      let obj = new FormData()
      obj.append('image', params.file)
      // console.log(params)
      this.$axios({
        url: '/user/images',
        method: 'post',
        // data: { image: params.file }
        data: obj
      }).then(() => {
        this.getMaterial() // 重新加载
      })
    },
    //   收藏或取消
    collectOrcancel (item) {
      // 确定它的状态
      let mess = item.is_collected ? '取消' : ''
      this.$confirm(`您确定要${mess}收藏这张图片?`, '提示1').then(() => {
        //   确定收藏或者取消收藏
        this.$axios({
          url: `/user/images/${item.id}`,
          method: `put`,
          data: { collect: !item.is_collected } // 取相反
        }).then(() => {
          this.getMaterial() // 重新加载
        })
      })
    },
    delImg (item) {
      this.$confirm('您确定要删除图片么', '提示').then(() => {
        // 确定要删除
        // 找文档,看接口
        this.$axios({
          url: `/user/images/${item.id}`,
          method: `delete`
        }).then(() => {
          this.getMaterial() // 重新加载数据
        })
      })
    },
    // 最新页码
    changePage (newPage) {
      this.page.page = newPage
      this.getMaterial()
    },
    // 切换页签
    changeTab () {
      //   alert(this.activeName)
      // this.activeName 是最新的数据
      // 加载不同类型的数据
      // all =>  所有的数据
      // collect =?  收藏的数据
      // 调用
      this.page.page = 1
      this.getMaterial()
    },
    getMaterial () {
      // 请求接口
      this.$axios({
        url: '/user/images',
        params: {
          page: this.page.page, // 默认第一次是第一页
          per_page: this.page.pageSize, // 默认pageSize是10条
          collect: this.activeName === 'collect' // collect  为false就是查全部数据
        }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count // 将图片总数赋值给总页码
      })
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang="less" scoped>
.material {
  .upload-btn {
    position: absolute;
    right: 10px;
    margin-top: -10px;
  }
  .card-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .img-card {
      width: 180px;
      height: 200px;
      margin: 30px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
      .operate {
        position: absolute; //脱离标准流
        width: 100%; //让它撑满
        bottom: 0;
        left: 0;
        height: 30px;
        background-color: #f4f5f6;
        font-size: 18px;
      }
    }
  }
}
</style>

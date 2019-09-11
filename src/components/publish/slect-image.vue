<template>
  <el-tabs v-model = "activeName">
    <el-tab-pane label="全部素材" name="all">
      <div class="img-list">
        <el-card class="img-item" v-for = "item in list" :key = "item.id">
          <img  @click = "selectImg(item)" :src = "item.url" alt="">
        </el-card>
      </div>
       <el-row type="flex" justify="center">
        <!-- < 添加分页 -->
         <el-pagination @current-change = "changePage"
          :current-page = "page.page"
          :page-size = "page.pageSize"
          :total = "page.total"
          background
          layout = "prev, pager, next"
        ></el-pagination>
      </el-row>
    </el-tab-pane>
    <el-tab-pane label="上传图片" name="upload">
      <el-upload
  class="avatar-uploader"
  action=""
  :show-file-list="false"
  :http-request = " uploadImg"
>
  <i class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
    </el-tab-pane>
  </el-tabs>

</template>

<script>
// 实现素材的查询 实现图片的上传
export default {
  data () {
    return {
      activeName: 'all',
      list: [], // 全部数据的素材
      page: {
        page: 1,
        pageSize: 8,
        total: 0
      }
    }
  },
  //   现在要请求数据
  methods: {
    uploadImg (params) {
      let formData = new FormData()
      formData.append('image', params.file)
      this.$axios({
        url: './user/images',
        method: 'post',
        data: formData
      }).then(result => {
        // 获取上传成功之后的地址
        this.$emit('onSelectImg', result.data.url)
      })
    },
    selectImg (item) {
      // 选择一张图片,可以获取到图片的地址   $item.url
    //   alert(item.url)
    // this.$emit触发一个自定义事件,可以带若干个参数
      this.$emit('onSelectImg', item.url)
    },
    changePage (newPage) {
      this.page.page = newPage
      this.getMaterial()
    },
    getMaterial () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: false,
          page: this.page.page,
          per_page: this.page.pageSize
        }
      }).then(result => {
        console.log(result)
        this.list = result.data.results // list的数据
        // 把返回来的数据总数给了总数
        this.page.total = result.data.total_count
      })
    }
  },
  created () {
    // eventbus做事件
    this.$on('onSelectImg', function (url) {
      alert(url)
    })
    this.getMaterial()
  }
}
</script>

<style lang ="less" scoped>
.img-list {
  display: flex;
  flex-wrap: wrap;
  /* 对齐方式 */
  justify-content: space-around;
  .img-item {
    width: 130px;
    height: 130px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

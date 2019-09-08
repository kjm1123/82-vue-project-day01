<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">内容管理</template>
    </bread-crumb>
    <!-- 搜索工具栏 -->
    <el-form style="margin-left: 40px">
      <el-form-item label="文章状态:">
          <!-- {{searchForm.status}} -->
        <el-radio-group @change = "changeCondition" v-model = "searchForm.status">
          <el-radio :label = "5">全部</el-radio>
          <el-radio :label = "0">草稿</el-radio>
          <el-radio :label = "1">待审核</el-radio>
          <el-radio :label = "2">审核通过</el-radio>
          <el-radio :label = "3">审核失败</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道列表:">
        <!-- {{searchForm.channel_id}} -->
        <el-select @change = "changeCondition" v-model = " searchForm.channel_id">
            <!-- 进行循坏 -->
            <el-option v-for = "item in channels" :key = "item.id" :label = "item.name" :value = "item.id">

            </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间选择:">
          <!-- {{searchForm.daterange}} -->
        <el-date-picker
        @change = "changeCondition"
        value-format = "yyyy-MM-dd"
          v-model = "searchForm.dateRange"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
        {{searchForm}}
      </el-form-item>
    </el-form>
    <!-- //内容页面结构 -->
    <div class="total-info">共找到{{page.total}}条符合条件的内容</div>
    <div class="article-list">
      <!-- 循坏项 -->
      <div class="article-item" v-for = "(item,index) in list " :key = "index">
        <div class="left">
          <!-- 左侧 -->
          <!-- 一定要个list一个数据,要不出不来 -->
            <!-- 写0 是里边就一个地址,一张图片,所有要写下标0  -->
            <img :src = "item.cover.images.length ? item.cover.images[0] : defaultImg" alt="">
          <!-- <img src="../../assets/images/img/404.png" alt /> -->
          <div class="info">
            <span class="title">{{item.title}}</span>
                <!-- 这个发表因为有好几种状态,所有要用过滤器 -->
            <el-tag :type = "item.status |  statusType" style="width : 60px">{{item.status | atatusText}}</el-tag>
            <span class="data">{{item.pubdate}}</span>
          </div>
        </div>
        <div class="right">
          <!-- 右侧 -->
          <!-- //给修改按钮注册一个事件 -->
          <span @click = "modifyTtem(item)">
            <i class="el-icon-edit"></i> 修改
          </span>
          <span @click = "delItem(item)">
            <i class="el-icon-delete"></i> 删除
          </span>
        </div>
      </div>
    </div>
      <el-row type="flex" justify = "center" style="margin : 10px 0">
          <el-pagination @current-change= "changePage" :current-page = "page.page" :page-size = "page.pageSize"  :total = "page.total"
  background
  layout="prev, pager, next"
 >
</el-pagination>
       </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [], // 定义一个空数组
      defaultImg: require('../../assets/images/img/dfaulu-cover.jpg'), // base64位字符串
      //   定义一个表单数据对象
      searchForm: {
        //   默认选中全部,因为5是全部
        status: 5, // 状态
        channel_id: null,
        dateRange: [] // 数组[开始时间,结束时间]
      },
      channels: [], // 存放列表数据
      page: {
        page: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  methods: {
    // 这是修改内容
    modifyTtem (item) {
      // 跳转到发布页面
      // 使用编程式导航
      this.$router.push(`/home/pubilish/${item.id.toString()}`)
    },
    // 做删除操作,
    delItem (item) {
      this.$confirm('您是否要删除此文章?', '提示').then(() => {
        // 确定删除

        this.$axios({
          method: 'delete',
          // 因为id是超过了安全限制,变成了bigName类型,所有要用大数据处理
          url: `/articles/${item.id.toString()}`
        }).then(() => {
          // 重新拉取数据
          this.getConditionArticle() // 获取删选的数据
        })
      })
    },
    // 页码改变
    changePage (newpage) {
      this.page.page = newpage // 赋值新页码
      this.getConditionArticle() // 获取删选的数据
    },
    // 改变搜索条件
    changeCondition () {
      this.page.page = 1 // 默认回到第一页
      console.log(this.searchForm)
      this.getConditionArticle() // 获取删选的数据
    },
    getConditionArticle () {
      let params = {
        status: this.searchForm.status === 5 ? null : this.searchForm.status,
        channel_id: this.searchForm.channel_id,
        begin_pubdate: this.searchForm.dateRange.length > 0 ? this.searchForm.dateRange[0] : null,
        end_pubdate: this.searchForm.dateRange.length > 1 ? this.searchForm.dateRange[1] : null,
        page: this.page.page,
        per_page: this.page.pageSize
      }

      this.getArticles(params)
    },
    // 查询文章的列表内容
    getArticles (params) {
      // console.log(123)
      this.$axios({
        url: '/articles',
        params: params
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count
      })
    },
    // 获取频道数据
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        console.log(result.data.channels)
        this.channels = result.data.channels
      })
    }
  },
  created () {
    this.getArticles()
    this.getChannels() // 获取频道数据
  },

  filters: {
    //   定义一个过滤器  过滤状态
    atatusText: function (value) {
      switch (value) {
        case 0 :
          return '草稿'
        case 1 :
          return '待审核'
        case 2 :
          return '已发表'
        case 3 :
          return '审核失败'
        default :
          break
      }
    },
    // 现在要做草稿和发布的颜色和状态
    // 定义类型过滤器
    statusType: function (value) {
      switch (value) {
        case 0 :
          return 'warning'
        case 1 :
          return 'info'
        case 2 :
          return 'success'
        case 3 :
          return 'danger'
        default :
          break
      }
    }
  }
}
</script>

<style lang = "less" scoped>
.total-info {
  border-bottom: 1px solid #ccc;
  padding: 15px 0;
  font-size: 14px;
}
.article-list {
  .article-item {
    display: flex;
    justify-content: space-between;
    padding: 15px 0;
    border-bottom: 1px solid #f2f3f5;
    .left {
      display: flex;
      img {
        width: 180px;
        height: 100px;
        border-radius: 4px;
      }
      .info {
        height: 100px;
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        justify-content: space-around;
        .title {
            color: #333;
            font-size: 14px;
        }
        .data {
            color: #999;
            font-size: 12px;
        }

      }
    }
    .right {
      font-size: 12px;
      span {
        margin-right: 8px;
        /* //这是一个样式,把鼠标放上去就会变成小手 */
        cursor: pointer;
        color: #333;
      }
    }
  }
}
</style>

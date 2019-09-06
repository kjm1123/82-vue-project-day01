<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">内容管理</template>
    </bread-crumb>
    <!-- 搜索工具栏 -->
    <el-form style="margin-left: 40px">
      <el-form-item label="文章状态:">
        <el-radio-group>
          <el-radio>全部</el-radio>
          <el-radio>草稿</el-radio>
          <el-radio>待审核</el-radio>
          <el-radio>审核通过</el-radio>
          <el-radio>审核失败</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道列表:">
        <el-select></el-select>
      </el-form-item>
      <el-form-item label="时间选择:">
        <el-date-picker
          v-model="value1"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
    </el-form>
    <!-- //内容页面结构 -->
    <div class="total-info">共找到7231条符合条件的内容</div>
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
            <el-tag style="width : 80px">{{item.status | atatusText}}</el-tag>
            <span class="data">{{item.pubdate}}</span>
          </div>
        </div>
        <div class="right">
          <!-- 右侧 -->
          <span>
            <i class="el-icon-edit"></i> 修改
          </span>
          <span>
            <i class="el-icon-delete"></i> 删除
          </span>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [], // 定义一个空数组
      defaultImg: require('../../assets/images/img/dfaulu-cover.jpg')
    }
  },
  methods: {
    getArticles () {
      this.$axios({
        url: '/articles'
      }).then(result => {
        this.list = result.data.results
      })
    }
  },
  created () {
    this.getArticles()
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

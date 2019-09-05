<template>
  <el-card class="material">
    <!-- 加入面包屑 -->
    <bread-crumb slot="header">
      <template slot="title">素材管理</template>
    </bread-crumb>
    <el-tabs v-model="activeName" @tab-click="changeTab">
      <el-tab-pane label="全部素材" name="all">
        <!-- //全部素材的内容 -->
        <div class="card-list">
          <el-card class="img-card" v-for="item in list" :key="item.id">
            <img :src="item.url" alt />
            <el-row class="operate" align="middle" type="flex" justify="space-around">
              <!-- space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。 -->

              <i :style="{color: item.is_collected ? 'red' : ''}" class="el-icon-star-on"></i>
              <i class="el-icon-delete"></i>
            </el-row>
          </el-card>
        </div>
      </el-tab-pane>
      <el-tab-pane label="收藏图片 " name="collect">
        <!-- 全部收藏的内容 -->

        <div class="card-list">
          <el-card class="img-card" v-for="item in list" :key="item.id">
            <img :src="item.url" alt />
            <!-- <el-row class="operate" align="middle" type="flex" justify="space-around">
              <!-- space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。 -->

              <!-- <i :style="{color: item.is_collected ? 'red' : ''}" class="el-icon-star-on"></i>
              <i class="el-icon-delete"></i>
            </el-row> -->
          </el-card>
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all', // 默认为全部素材
      list: [] // 全部素材和收藏图片都用在list这个数据上
    //   collect_list: []
    }
  },
  methods: {
    // 切换页签
    changeTab () {
    //   alert(this.activeName)
    // this.activeName 是最新的数据
    // 加载不同类型的数据
    // all =>  所有的数据
    // collect =?  收藏的数据
    // 调用
      this.getMaterial()
    },
    getMaterial () {
      // 请求接口
      this.$axios({
        url: '/user/images',
        params: {
          collect: this.activeName === 'collect' // collect  为false就是查全部数据
        }
      }).then(result => {
        this.list = result.data.results
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

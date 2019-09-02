<template>
  <!-- 用el-row 和<el-col> -->
  <el-row class="layout-header" type="flex" justify="space-between">
    <!-- span 是给col的宽度  elementUI将页面分成24份 -->
    <el-col class="left" :span="8">
      <i class="el-icon-s-unfold icon"></i>
      <span>不是只有你一个人在战斗</span>
    </el-col>

    <el-col :span="3" class="right">
        <!-- 获取图片,得用动态来获取 -->
      <img class="head-img" :src="userInfo.photo ? userInfo.photo : defaultImg " alt />
      <el-dropdown trigger="click">
        <!-- 下拉菜单是 匿名插槽 -->
        <span class="el-dropdown-link">
         {{userInfo.name}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <!-- 下拉内容是具名插槽 -->
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item>git地址</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
export default {
  // 这是本地数据,将获取到的用户数据给了本地数据
  data () {
    return {
      userInfo: {},
      defaultImg: require('../../assets/images/img/avatar.jpg') // 转换成base64字符串
    }
  },
  methods: {
    //   获取用户数据
    getUseInfo () {
      // 获取token
      let token = window.localStorage.getItem('user-token')
      this.$axios({
        url: '/user/profile',
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(result => {
        //   console.log(result)
          this.userInfo = result.data.data
        })
    }
  },
  created () {
    this.getUseInfo()
  }
}
</script>

<style lang="less" scoped>
.layout-header {
  padding: 8px 0;
  .left {
    .icon {
      font-size: 22px;
      margin-right: 3px;
    }
    display: flex;
    align-items: center;
  }
  .right {
    display: flex;
    align-items: center;
  }
  .head-img {
    border-radius: 50%;
    width: 40px;
  }
}
</style>

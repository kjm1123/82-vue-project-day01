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
      <el-dropdown trigger="click" @command=" handleMenuItem">
        <!-- 下拉菜单是 匿名插槽 -->
        <span class="el-dropdown-link" @command="handleMenuItem">
         {{userInfo.name}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <!-- 下拉内容是具名插槽 -->
          <el-dropdown-item command="account">个人信息</el-dropdown-item>
          <el-dropdown-item command="git">git地址</el-dropdown-item>
          <el-dropdown-item command="lgout">退出</el-dropdown-item>
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
    //   console.log(1)
      // 获取token
    //   let token = window.localStorage.getItem('user-token')
      this.$axios({
        url: '/user/profile'
        // headers: { Authorization: `Bearer ${token}` }
      })
        .then(result => {
        //   console.log(result)
          this.userInfo = result.data.data
        })
    },
    handleMenuItem (command) {
      // 用if语句
      if (command === 'account') {
        // 账户信息
        // console.log('account')
      } else if (command === 'git') {
        // git地址
        // console.log('git')
        // 点击git的时候,会跳转到下面那个地址
        window.location.href = 'https://github.com/shuiruohanyu/82heimatoutiao' // 改变当前的地址
      } else {
        //   清空所有缓存 (只能清除当前项目的缓存)
        window.localStorage.clear()
        // 退出
        // console.log('退出')
        // 跳转到登录页
        this.$router.push('./login')
      }
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

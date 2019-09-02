<template>
<!-- 用el-row 和<el-col> -->
    <el-row class="layout-header" type="flex" justify="space-between">
        <!-- span 是给col的宽度  elementUI将页面分成24份 -->
        <el-col class="left" :span="8">
            <i class="el-icon-s-unfold icon"></i>
            <span>不是只有你一个人在战斗</span>
        </el-col>

              <el-col :span="3" class="right">
                  <img class="head-img" src="../../assets/images/img/avatar.jpg" alt="">
                   <el-dropdown trigger="click">
                       <!-- 下拉菜单是 匿名插槽 -->
      <span class="el-dropdown-link">
        烦人<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
          <!-- 下拉内容是具名插槽 -->
        <el-dropdown-item >个人信息</el-dropdown-item>
        <el-dropdown-item >git地址</el-dropdown-item>
        <el-dropdown-item >退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
              </el-col>
       </el-row>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.layout-header{
    padding: 8px 0;
    .left {
        .icon {
            font-size: 22px;
            margin-right: 3px;
        }
        display: flex;
        align-items: center
    }
    .right {
        display: flex;
        align-items: center
    }
    .head-img {
        border-radius: 50%;
        width: 40px;

    }
}

</style>

<template>
    <el-card>
        <bread-crumb slot = "header">
            <template slot="title">
                账户信息
            </template>
        </bread-crumb>
        <el-upload action="" :http-request = "uploadHeaderImg" :show-file-list="false">
            <img class="header-image" :src = "userInfo.photo ? userInfo.photo : defauitImg " alt="">
        </el-upload>
        <el-form ref = "userForm" :model = "userInfo" :rules = "userRules" label-width="100px">
            <el-form-item  label="用户名" prop="name">
                <el-input v-model = "userInfo.name" style="width :300px"></el-input>
            </el-form-item>
            <el-form-item label="简介"  prop="intro">
                 <el-input v-model = "userInfo. intro" style="width :300px"></el-input>
            </el-form-item>
            <el-form-item label="邮箱"  prop="email">
                 <el-input  v-model = "userInfo.email" style="width :300px"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
                 <el-input v-model = "userInfo. mobile" style="width :300px" disabled=""></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click = "saveUserInfo" type="primary">保存</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
export default {
  data () {
    return {
      defauitImg: require('../../assets/images/img/dfaulu-cover.jpg'),
      userInfo: {
        name: '',
        intro: '',
        photo: '',
        email: '',
        mobile: ''
      },
      userRules: {
        name: [{
          required: true,
          message: '用户名不能为空'
        }, {
          min: 4,
          max: '8',
          message: '用户名的长度必须为4-8位'
        }],
        email: [{
          pattern: '[A-z]+[A-z0-9_-]*\\@[A-z0-9]+\\.[A-z]+',
          message: '邮箱表达式不正确'
        }]
      }
    }
  },
  methods: {
    uploadHeaderImg (params) {
      let data = new FormData()
      data.append('photo', params.file)
      this.$axios({
        method: 'patch',
        url: '/user/photo',
        data: data
      }).then(() => {
        this.getUserInfo()
      })
    },
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(result => {
        this.userInfo = result.data
      })
    },
    saveUserInfo () {
      this.$refs.userForm.validate((isOK) => {
        if (isOK) {
          this.$axios({
            url: '/user/profile',
            method: 'patch',
            data: this.userInfo
          }).then(() => {
            this.$message({ type: 'success', message: '恭喜成功' })
          })
        }
      })
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style lang = "less" scoped>
    .header-image {
        position: absolute;
        width: 200px;
        height: 200px;
        border-radius: 50%;
        margin-left : 500px;
    }
</style>

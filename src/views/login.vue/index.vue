<template>
<div class="login">
   <el-card class="login-card">
   <div class="logo">
       <img src="../../assets/images/img/logo_index.png" alt="">
   </div>
   <!-- 表单组件 -->
    <!-- 数据校验,首先要给el-from  一个model属性  表示数据对象 -->
   <el-form ref="loginForm" :model= "loginForm" :rules= "loginRules" style="margin-top:20px">
       <!-- 表单项 -->
            <el-form-item prop="mobile">
                <!-- 放置组件内容 -->
                <!-- prpo 绑定需要校验的字段名 但是不写loginForm.mobile,只写mobile-->
                <el-input v-model= "loginForm.mobile" placeholder="请输入手机号">  </el-input>

            </el-form-item>
            <el-form-item prop="code">
                <!-- //绑定验证码 -->
                <el-input v-model = "loginForm.code" style="width:250px" placeholder="请输入验证码"></el-input>
                <el-button style="float:right">发送验证码</el-button>
            </el-form-item>
             <el-form-item prop="checked">
                 <!-- 绑定协议 -->
                 <el-checkbox v-model = "loginForm.checked">我已同意和阅读</el-checkbox>
                 </el-form-item>
            <el-form-item>
               <el-button  @click= "login" type="primary" style="width:100%">登陆</el-button>
            </el-form-item>
   </el-form>
   </el-card>
</div>

</template>

<script>
export default {
  data () {
    let validator = function (rule, value, callBack) {
      if (value) {
        callBack() // 如果value为true直接通过
      } else {
        callBack(new Error('你必须同意'))
      }
    }
    return {
      loginForm: {
        mobile: '', // 手机号
        code: '', // 验证码
        check: false // 是否同意勾选
      },
      //   定义rules 检验规则  表单是根据规则去校验  没有规则  就没有校验
      // 它的格式为 : key(字段名) :value(数组对象) => 多个 => 一个字段,可能有一个或多个校验规则
      loginRules: {
        mobile: [{
          required: true, // 意味着必填
          message: '手机号不能为空' // 意味着手机号不能为空
        }, {
          pattern: /^1[3456789]\d{9}$/,
          message: '手机号不正确'// 正则表达式
        }],
        code: [{
          //  required只校验空字符串. null 和underfind  不校验true/false
          required: true, // 意味着必填
          message: '验证码不能为空' // 意味着验证码不能为空
        }, {
          pattern: /^\d{6}$/,
          message: '验证码必须为6位'
        }],
        checked: [{
          validator
        }]
      }
    }
  },
  methods: {
    login () {
      // 通过el-form 组件的validata方法,检验整个表单的数据
      // 传入一个回调函数  idOk为true 说明所有的校验规则都成功了
      // 如果为false,说明有错误
      this.$refs.loginForm.validate(ISOK => {
        if (ISOK) {
          // 请求
          // axios data是放置body参数的 params是放置地址参数的
          // 结果执行完成之后是一个promise对象
          this.$axios({
            url: '/authorizations',
            method: 'post',
            data: this.loginForm
          }).then(result => {
            // console.log(result)
            // console.log(result.data.data.token)
            // 放到前端缓存中
            // setItem( 名称,值)
            window.localStorage.setItem('user-token', result.data.data.token)
            // 弄好了之后进行跳转
            // 用编程式导航,登录成跳转到首页
            this.$router.push('/')
          }).catch(() => {
            this.$message({
              message: '手机号或者验证码错误',
              type: 'warning'
            })
          })
        }
      })
    }
  }
}

</script>

<style lang="less" scoped>
//如果我们要用less/scss等预处理css语言的话,需要给一个lang属性
//lang属性  是对css进行语言指定
//是从碰到 只针对当前的组建样式起作用
// 100vh  就是占据当前可视屏幕的100%
.login {
    background-image: url('../../assets/images/img/login_bg.jpg');
    height:100vh;
    background-size:cover;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-card {
    width: 440px;
    height: 340px;
    .logo{
        text-align: center;
        img {
            height: 45px;
        }
    }
}
}

</style>

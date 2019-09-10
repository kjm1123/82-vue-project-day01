<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">发布文章</template>
    </bread-crumb>
    <!-- {{formData}} -->
    <!-- 表单 model 数据对象  rules 绑定规则 -->
    {{formData}}
    <el-form
      ref="publishForm"
      :model="formData"
      :rules="publishRules"
      style="margin-left : 100px"
      label-width="100px"
    >
      <el-form-item prop="title" label="标题">
        <el-input v-model="formData.title" style="width :400px"></el-input>
      </el-form-item>
      <el-form-item prop="content" label="内容">
        <quill-editor v-model="formData.content" style="height :400px; width:800px"></quill-editor>
      </el-form-item>
      <el-form-item label="封面" style="margin-top : 120px" prop ="cover">
        <!-- //监听radio的改变事件 -->
        <el-radio-group @change="changeCoverType" v-model="formData.cover.type">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <!-- 封面图片组件 -->
        <cover-image @onclickImg="receiveImg" :images="formData.cover.images"></cover-image>
      </el-form-item>
      <el-form-item prop="channel_id" label="频道">
        <el-select value v-model="formData.channel_id">
          <!-- //label是显示值   value 是真实值 -->
          <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="publish(false)" type="primary">发表文章</el-button>
        <el-button @click="publish(true)">存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  // 定义一个函数
  data () {
    let func = function (rule, value, callBack) {
      // 执行成功的话,使用callBack
      // debugger
      // callBack()
      if (value.type === 1) {
        (value.images.length === 1 && value.images[0] ? callBack() : callBack(new Error('对不起,您未设置单独的封面')))
      } else if (value.type === 3) {
        if (value.images.length === 1 && value.images[0] && value.images[1] && value.images[2]) {
          callBack()
        } else {
          callBack(new Error('对不起,你为设置'))
        }
      } else {
        // 无图或者自动
        if (value.images.length > 0) {
          callBack(new Error('对不起,您设置有误'))
        } else {
          callBack()
        }
      }
    }
    return {
      channels: [],
      formData: {
        title: '',
        content: '',
        cover: {
          type: 0, // 默认绑定为无图
          images: []
        },
        channel_id: null
      },

      publishRules: {
        title: [
          {
            required: true,
            message: '标题不能为空'
          },
          {
            min: 5,
            max: 30,
            message: '标题长度必须为5-30之间'
          }
        ],
        content: [
          {
            required: true,
            message: '内容不能为空'
          }
        ],
        channel_id: [
          {
            required: true,
            message: '频道不能为空'
          }
        ],
        cover: [{
          validator: func // 自定义校验函数
        }]
      }
    }
  },
  methods: {
    receiveImg (url, index) {
      // alert('cover-image传过来的' + url)
      // 拿到地址 更新images 需要知道更新哪一条
      // this.formData.cover.images = this.formData.cover.images.map(function (item, i) {
      //   // 用判断
      //   if (i === index) {
      //     return url
      //   }
      //   return item
      // })
      // 上边注视的代码有点low 所以现在要封装一个新的代码
      this.formData.cover.images = this.formData.cover.images.map((item, i) => i === index ? url : item)
    },
    // 切换封面类型  根据当前类型决定 images结构
    changeCoverType () {
      // alert(this.formData.cover.type)
      if (this.formData.cover.type === 1) {
        this.formData.cover.images = [''] // 有一张封面但选择
      } else if (this.formData.cover.type === 3) {
        this.formData.cover.images = ['', '', ''] // 有3张封面但选择
      } else {
        this.formData.cover.images = [] // 自动或者无图 没有内容
      }
    },
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels
      })
    },
    // 发布文章
    publish (draft) {
      this.$refs.publishForm.validate(isOk => {
        if (isOk) {
          // 只有校验成功了,才能去判断是修改接口还是 新增借口
          let { articleId } = this.$route.params // 获取id
          // 进行封装,因为他们只有url和method 不一样,进行定义
          // let url, method
          // if (articleId) {
          //   url = `/articles/${articleId}`
          //   method = 'put'
          //   // 修改文章  调用修改文章的接口
          // } else {
          //   url = '/articles'
          //   method = 'post'
          // }
          // 用三元表达式
          let url = articleId ? `/articles/${articleId}` : '/articles'
          let method = articleId ? 'put' : 'post'
          this.$axios({
            url: url,
            method: method,
            params: { draft }, // draft 为true时,就是草稿  为false时,是发布
            // 因为body的参数和formDate的参数相同,所有
            data: this.formData
          }).then(() => {
            // 编程式导航
            // console.log(res)
            this.$router.push('/home/articles') // 跳转到文章列表页面
          })
        }
      })
    },

    // 通过id获取文章详情
    // 已经传过来id值,所有现在要取值
    getArticleById (articleId) {
      // 现在些接口
      this.$axios({
        url: `/articles/${articleId}`
      }).then(result => {
        this.formData = result.data
      })
    }
  },
  created () {
    this.getChannels() // 获取频道
    // this.publish()
    let { articleId } = this.$route.params // 获取id
    // 如果可以获取到id
    if (articleId) {
      // 如果存在,说明是修改文章,如果不存在,说明是发布文章
      // 通过Id来获取文章数据
      // 调用上边的方法
      this.getArticleById(articleId)
    }
  }
}
</script>

<style>
</style>

<template>
<div class = "cover-image">
    <div @click = "showDialog(index)" class='image-item' v-for = "(item,index) in images" :key = "index">
      <img :src= "item ? item : defaultImg" alt="">
    </div>
    <el-dialog @close = "hideDialog" :visible = "dialogVisbile">
      <!-- 素材选择/上传图片 -->
          <select-image @onSelectImg = "receiveImg"> </select-image>
       </el-dialog>
</div>
</template>

<script>
// 根据images 来渲染页面
// images['']
// images['', '', '']
// Images[]
export default {
  // 子组件接收
  props: ['images'],
  // 因为上边是一个具体的不确定的图片,所以我们应该转成base64
  data () {
    return {
      defaultImg: require('../../assets/images/img/pic_bg.png'), // 定义一个变量,图片的base64 字符串
      dialogVisbile: false,
      selectIndex: -1
    }
  },
  methods: {
    // 接收子组件传过来的值
    receiveImg (url) {
      // alert('这是子组件传给父组件的' + url)
      // 接收到了URL  但是我们发现 不能在cover-image中修改,要在publish中修改
      // 再次将URL传给父组件
      this.$emit('onclickImg', url, this.selectIndex)
      this.dialogVisbile = false
    },
    // 显示弹层
    showDialog (index) {
      this.selectIndex = index // 将当前电机的
      //  显示弹层
      // alert(index)
      this.dialogVisbile = true
    },
    // 隐藏弹层
    hideDialog () {
      this.dialogVisbile = false
    }
  }
}
</script>

<style lang="less" scoped>
  .cover-image {
      display: flex;
      max-width: 650px;
    .image-item {
        padding: 10px;
        width: 200px;
        height: 200px;
        border : 1px solid #ccc;
        img {
            width: 100%;
            height: 100%;
        }
      }
  }
</style>

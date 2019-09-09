// 引入组件
import layoutAside from './home/layout-aside.vue'
import layoutHeader from './home/layout-header.vue'
import breadCrumb from './common/bread-crumb.vue'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
import coverImage from './publish/cover-image.vue'
import selectImage from './publish/slect-image.vue'
// 所有自定义的组建的插件(全局注册)
export default {
  install: function (Vue) {
    Vue.component('layout-aside', layoutAside) // 注册左侧导航事件
    Vue.component('layout-header', layoutHeader) // 注册头部组建
    Vue.component('bread-crumb', breadCrumb) // 注册面包屑
    Vue.component('quill-editor', quillEditor) // 注册quilleditor编辑器
    Vue.component('cover-image', coverImage) // 注册封面图片组件
    Vue.component('select-image', selectImage) // 注册选择图片组件
  }
}

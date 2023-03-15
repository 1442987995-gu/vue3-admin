import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import  router from './router/route'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import API from './api'
//组件实例的原型的原型指向的是Vue.prototype

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.config.globalProperties.$API = API;
app.use(ElementPlus)
app.use(router)
app.mount('#app')

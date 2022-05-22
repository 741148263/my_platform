import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI, {Message, MessageBox} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import qs from 'qs'
import './assets/icon/iconfont.css'
import './static/css/index.css'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs
Vue.use(ElementUI)
Vue.prototype.$msg = Message
Vue.prototype.$confirm = MessageBox.confirm
Vue.config.productionTip = false

axios.defaults.baseURL = "/api"

// 请求拦截器
axios.interceptors.request.use(
  config => {
    const token = window.sessionStorage.getItem('token')
    if (token) {
      config.headers.token = token
    }
    return config
  }
)

// 响应拦截器
axios.interceptors.response.use(
  response => {
    if (response.data.code === -1 || response.data.code === 10010) {
      window.sessionStorage.removeItem('token')
      router.replace({
        path: '/'
      })
    }
    return response
  }
)

new Vue({
  router,
  data: {
    Bus: new Vue()
  },
  render: h => h(App)
}).$mount('#app')

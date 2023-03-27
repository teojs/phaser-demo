import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import service from './service'
import 'normalize.css'
import '@/styles/index.less'
import utils from './utils'
import components from './components'

const app = createApp(App)

app
  .use(store)
  .use(service)
  .use(router)
  .use(utils)
  .use(components)

app.mount('#app')

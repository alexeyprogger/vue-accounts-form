import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { QuestionFilled } from '@element-plus/icons-vue'

import App from './App.vue'

const app = createApp(App)

app.use(createPinia())
app.use(ElementPlus)

app.component('QuestionFilled', QuestionFilled)

app.mount('#app')
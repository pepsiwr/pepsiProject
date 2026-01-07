import 'bootstrap/dist/css/bootstrap.min.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // นำเข้า router ที่เราสร้าง

const app = createApp(App)

app.use(router) // บอกให้ Vue ใช้ Router
app.mount('#app')
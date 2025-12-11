import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'vuetify/styles'
import vuetify from './plugins/vuetifyPlugin'
import options from './plugins/vuetoastificationPlugin'
import Toast from 'vue-toastification'
import App from './App.vue'
import router from './router'
import '@/plugins/chartjs'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(Toast, options)

app.mount('#app')

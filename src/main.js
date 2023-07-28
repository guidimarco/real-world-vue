import { createApp, reactive } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const GStore = reactive({
    flashMessage: ''
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.provide('gStore', GStore)

app.mount('#app')

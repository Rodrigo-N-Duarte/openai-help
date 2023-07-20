import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import { createPinia } from 'pinia'
import piniaPluginPersistedState from "pinia-plugin-persistedstate"

loadFonts()

export const piniaInstance = createPinia()
piniaInstance.use(piniaPluginPersistedState)

createApp(App).use(piniaInstance)
  .use(router)
  .use(vuetify)
  .mount('#app')

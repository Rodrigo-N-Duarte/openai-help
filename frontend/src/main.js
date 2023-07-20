import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import { createPinia } from 'pinia'
import piniaPluginPersistedState from "pinia-plugin-persistedstate"
import * as Toasted from 'vue-toasted';

loadFonts()

const pinia = createPinia()
pinia.use(piniaPluginPersistedState)

createApp(App).use(pinia)
  .use(router)
    .use(Toasted)
  .use(vuetify)
  .mount('#app')

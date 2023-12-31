import {createApp} from 'vue'
import './style.scss'
import App from './App.vue'
import router from "../src/router/router"
import {FontAwesomeIcon} from './lib/fontawesome'
import vuetify from './lib/vuetify'
import {createPinia} from 'pinia'

const pinia = createPinia()

createApp(App).use(router)
    .use(pinia)
    .use(vuetify)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app');

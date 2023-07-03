import {createApp} from 'vue'
import './style.scss'
import App from './App.vue'
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {fas} from '@fortawesome/free-solid-svg-icons'
import router from "../src/router/router"

library.add(fas)

createApp(App).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app');

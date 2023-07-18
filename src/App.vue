<template>
  <div class="app">
    <Header/>
    <div class="body">
      <Sidebar v-if="logged" class="aside"/>
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Sidebar from './components/sidebar.vue'
import Header from "./components/header.vue"
import {ref, watch} from "vue";
import {LoggedStore} from "./stores/auth.store";
import {storeToRefs} from "pinia";
import {useRouter} from "vue-router";

const router = useRouter()


const test = LoggedStore()
const logged = ref<boolean>()

const {loggedValue} = storeToRefs(test)

watch(loggedValue, (value) => {
  console.log(value)
  logged.value = value as boolean
})
</script>


<style lang="scss" scoped>
.app {
  display: flex;
  flex-direction: column;
  background-color: #171717;
  color: #fff;
  width: 100%;
  height: 100vh;

  .body {
    display: flex;
    height: 90vh;

    .aside {
      min-width: 200px;
    }
  }
}
</style>

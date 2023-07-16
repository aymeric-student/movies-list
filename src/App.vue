<template>
  <div class="app">
    <Header/>
    <div class="body">
      <Sidebar class="aside"/>
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Sidebar from './components/sidebar.vue'
import Header from "./components/header.vue"</script>


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

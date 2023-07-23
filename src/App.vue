<template>
  <div class="app">
    <Header @search-text="handleSearchText($event)"/>

    <div id="modal-container"></div>

    <div v-if="showModal" class="modal-background">
      <div class="modal-content">
        <search-movie :movie-name="text"/>
      </div>
    </div>

    <div class="body">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Header from "./components/header.vue"
import {onMounted, ref, watch} from "vue";
import {LoggedStore} from "./stores/auth.store";
import {useRouter} from "vue-router";
import SearchMovie from "./components/search-movie.vue";

const router = useRouter()
const test = LoggedStore()
const {loggedValue} = test

const text = ref<string>()

const logged = ref<boolean>()
const showModal = ref(false);

const handleSearchText = (searchText: string) => {
  text.value = searchText
  if (text.value) {
    showModal.value = true
  } else {
    showModal.value = false
  }
};

watch(loggedValue, (check) => {
  logged.value = check as boolean
})

/*watch(text, (value) => {
  console.log("text = ", value)
})*/


onMounted(() => {
  if (localStorage.getItem('logged') === 'true') {
    logged.value = true
  } else {
    logged.value = false
  }
})
</script>


<style lang="scss" scoped>
/* Style pour la modal */


.app {
  display: flex;
  flex-direction: column;
  background-color: #171717;
  color: #fff;
  width: 100%;
  z-index: 1;
  height: 100vh;

  .modal-background {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 3;
    transform: translate(-50%, -50%);
    /*    width: 100%;
        height: 100%;*/
    display: flex;
    align-items: center;
    justify-content: center;
  }


  .modal-content {
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    max-width: 90%;
  }


  .body {
    display: flex;
    /*height: 90vh;*/

    .aside {
      min-width: 200px;
    }
  }
}
</style>

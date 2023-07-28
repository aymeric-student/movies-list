<template>
  <div class="app">
    <Header @movie-type="handleMovieType($event)" @search-text="handleSearchText($event)"/>

    <div id="modal-container"></div>

    <div v-if="showModal" class="modal-background">
      <div class="modal-content">
        <search-movie :movie-name="text"/>
      </div>
    </div>

    <div class="body">
      <router-view :movie-type="movieTypeSelected"
      ></router-view>
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
const movieTypeSelected = ref<string>()

const handleMovieType = (movieType: string) => {
  movieTypeSelected.value = movieType
}

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


onMounted(async () => {
  /*
    await supabase.auth.signOut()
  */
  /*
    if (user) {
      console.log("user : ", user)
    }*/
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
  max-height: 100vh;

  .modal-background {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 3;
    transform: translate(-50%, -50%);
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

    .aside {
      min-width: 200px;
    }
  }
}
</style>

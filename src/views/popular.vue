<script lang="ts" setup>
import {onMounted, ref} from "vue";
import Sidebar from "../components/Sidebar.vue";
import MovieService from "../services/movie-db.service";
import MovieListComponent from "../components/MovieListComponent.vue"
import {MovieInterface} from "../interface/Movie";

const movies = ref<MovieInterface[]>([]);

onMounted(async () => {
  try {
    movies.value = await MovieService.fetchMovies("popular");
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
  <Sidebar class="aside"/>
  <main>
    <h2>VOIR LES DERNIERS FILMS TOUT GENRE EN STREAMING VF OU VOSTFR</h2>
    <movie-list-component :movies="movies"/>
  </main>
</template>


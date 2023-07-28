<script lang="ts" setup>
import {onMounted, ref, watch} from "vue";
import Sidebar from "../components/Sidebar.vue";
import MovieService from "../services/movie-db.service";
import MovieListComponent from "../components/MovieListComponent.vue"
import {MovieInterface} from "../interface/Movie";
import supabase from "../lib/supabase";

const movies = ref<MovieInterface[]>([]);

const genderSelected = ref<string>()

const handleGenreSelected = (genre) => {
  genderSelected.value = genre.id
}

watch(genderSelected, async (newGender) => {
  console.log("newGender : ", newGender)
  console.log(newGender)
  if (newGender) {
    movies.value = await MovieService.fetchMoviesByGenre(newGender)
  }
})


onMounted(async () => {
  try {
    const user = await supabase.auth.getUser()
    movies.value = await MovieService.fetchMovies("now_playing");
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
  <Sidebar class="aside" @genreSelected="handleGenreSelected"/>
  <main>
    <h2>VOIR LES DERNIERS FILMS TOUT GENRE EN STREAMING VF OU VOSTFR</h2>
    <movie-list-component :movies="movies"/>
  </main>
</template>

<style lang="scss">
main {
  background: #171717;
  width: 100%;

  h2 {
    padding-left: 1rem;
    text-align: center;
    padding-top: 1rem;
  }
}
</style>


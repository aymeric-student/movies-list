<script lang="ts" setup>
import {defineProps, onMounted, ref, watch} from "vue";
import Sidebar from "../components/Sidebar.vue";
import MovieService from "../services/movie-db.service";
import MovieListComponent from "../components/MovieListComponent.vue"
import {MovieInterface} from "../interface/Movie";
import supabase from "../lib/supabase";


const movies = ref<MovieInterface[]>([]);

const genderSelected = ref<string>()

const props = defineProps<{ movieType: string }>();

const handleGenreSelected = (genre) => {
  genderSelected.value = genre.id
}

watch(genderSelected, async (newGender) => {
  if (newGender) {
    movies.value = await MovieService.fetchMoviesByGenre(newGender)
  }
})

watch(() => props.movieType, async (value) => {
  console.log("depuis le home : ", value)
  if (value) {
    try {
      movies.value = await MovieService.fetchMovies(value);
    } catch (error) {
      console.error(error);
    }
  } else {
    movies.value = [];
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


<script lang="ts" setup>
import {onMounted, ref} from "vue";
import MovieService from "../services/movie-db.service";
import MovieListComponent from "../components/MovieListComponent.vue"
import {MovieInterface} from "../interface/Movie";

const movies = ref<MovieInterface[]>([]);

onMounted(async () => {
  try {
    movies.value = await MovieService.fetchMovies("now_playing");
  } catch (error) {
    console.error(error);
  }
});
</script>

<!-- un premier commentaire -->

<!-- un deuxième commentaire -->

<!-- un troisième commentaire -->

<!-- un quatrième commentaire -->

<!-- un cinquième commentaire -->

<template>
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


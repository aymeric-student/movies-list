<script lang="ts" setup>
import {useRoute} from 'vue-router';
import {onMounted, ref} from 'vue';
import MovieService from '../services/movie-db.service';

const movie = ref<any>();

const fetchMovieDetails = async (id: string) => {
  try {
    movie.value = await MovieService.fetchMovie(id as string);
    console.log(movie.value); // Utilisez movie.value au lieu de movie
  } catch (error) {
    throw new Error(error)
  }
};

onMounted(() => {
  const route = useRoute();
  const id = route.params.id;

  fetchMovieDetails(id as string);
});
</script>

<template>
  <p>{{ movie?.title }}</p>

  <img
      :src="`https://www.themoviedb.org/t/p/w220_and_h330_face/${movie?.backdrop_path}`"
      alt="hello"
      class="movie-image"
  />

</template>

<style lang="scss" scoped>
img {
  width: 300px;
  height: 450px;
  object-fit: cover;
}
</style>

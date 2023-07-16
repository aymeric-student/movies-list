<template>
  <div @click="goToSingleMovie()">
    <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" alt="">
    <div class="movie__info">
      <h4>{{ movie.original_title }}</h4>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {defineProps, ref, watch} from "vue";
import {MovieInterface} from "../interface/Movie";
import {useRouter} from "vue-router";

const router = useRouter()
const props = defineProps<{
  movie: MovieInterface;
}>();
const movie = ref<MovieInterface>(props.movie);
const newMovie = ref<MovieInterface>()

watch(() => props.movie.id, (newId) => {
  fetchMovieDetails(newId);
});

const fetchMovieDetails = (id: number) => {
  movie.value = newMovie.value;
};

const goToSingleMovie = () => {
  console.log(props.movie.id)
  /*router.push(`/movie-details/${props.movie.id}`)
  router.push(`/movie-details/${props.movie.id}`);*/
}
</script>


<style lang="scss" scoped>
img {
  width: 100%;
  object-fit: cover;
  display: block;
}

.movie__info {
  min-height: 45px;
  padding: 10px;

  h4 {
    font-size: 14px;
  }
}
</style>
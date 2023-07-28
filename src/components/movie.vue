<template>
  <div @click="goToSingleMovie()">
    <img v-if="movie && movie.poster_path" :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" alt="">
    <div class="movie__info">
      <h4 v-if="movie && movie.original_title">{{ movie.original_title }}</h4>
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

watch(() => props.movie, (newMovie) => {
  fetchMovieDetails();
})

const fetchMovieDetails = () => {
  movie.value = props.movie;
};

const goToSingleMovie = () => {
  router.push(`/movie-details/${props.movie.id}`);
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
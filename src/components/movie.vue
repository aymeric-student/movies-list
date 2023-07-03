<template>
  <div>
    <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" alt="">
    <div class="movie__info">
      <h4>{{ movie.original_title }}</h4>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {defineProps} from "vue";
import {MovieInterface} from "../interface/Movie";

const props = defineProps<{
  movie: MovieInterface;
}>();
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
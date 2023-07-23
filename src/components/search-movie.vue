<template>
  <div class="search-container">
    <div>
      <ul>
        <li v-for="movie in movies" :key="movie.id">
          <movie :movie="movie" class="movie"/>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {defineProps, ref, watch} from "vue";
import {MovieInterface} from "../interface/Movie";
import MovieService from "../services/movie-db.service";
import Movie from "./Movie.vue";

const props = defineProps<{ movieName: string }>();

const movies = ref<MovieInterface[]>([]);

watch(() => props.movieName, async (value) => {
  if (value) {
    try {
      const response = await MovieService.searchMovies(value);
      console.log(response)
      movies.value = response;
      console.log(movies.value)
    } catch (error) {
      console.error(error);
    }
  } else {
    movies.value = [];
  }
});

</script>

<style lang="scss" scoped>
.search-container {
  height: 500px;
  width: 500px;
  background-color: #222222;
  color: white;
  overflow: scroll;
}

ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  li {
    list-style: none;
    margin-bottom: 12rem;
  }
}


.movie {
  height: 100px;
  width: 100px;
  margin: 10px;

}


</style>
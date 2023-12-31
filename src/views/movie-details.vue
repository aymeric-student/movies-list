<script lang="ts" setup>
import {useRoute} from 'vue-router';
import {onMounted, ref} from 'vue';
import MovieService from '../services/movie-db.service';
import DateConverter from "../utils/Date.util";
import {Cast} from "../interface/Cast";
import {MovieInterface} from "../interface/Movie";
import ListMovies from "../components/MovieListComponent.vue";

const movie = ref<any>();
const dateConverter = new DateConverter();
let actorsMovies = ref<Cast[]>([])
const moviesSimilar = ref<MovieInterface[]>([]);

const fetchMovieDetails = async (id: string) => {
  try {
    movie.value = await MovieService.fetchMovie(id);
    movie.value.runtime = dateConverter.convertHourToMin(movie?.value?.runtime);

    let actors = await MovieService.fetchActors(id)

    for (let actor of actors.cast.slice(0, 3)) {
      actorsMovies.value.push(actor)
    }

  } catch (error) {
    throw new Error(error);
  }
};


onMounted(async () => {
  const route = useRoute();
  const id = route.params.id;
  moviesSimilar.value = await MovieService.fetchSimilarMovies(id as string);
  await fetchMovieDetails(id as string);
});
</script>

<template>
  <div class="body">
    <h4>{{ movie?.title }}</h4>
    <div class="container">
      <img
          :src="`https://www.themoviedb.org/t/p/w220_and_h330_face/${movie?.poster_path}`"
          alt="hello"
      />
      <div class="infos">
        <p>Genre: Comédie, Drame, Romance</p>
        <p>Durée : {{ movie?.runtime }}</p>
        <p>Date de sortie: {{ movie?.release_date }}</p>
        <p>Réalisé par: {{ movie?.re }}</p>
        <p>Acteurs:
          <span v-for="(actor, index) in actorsMovies" :key="index">
              {{ actor.name }}
          </span>
        </p>
        <p>Évaluation: {{ movie?.vote_average }}</p>
        <p> {{ movie?.overview }}</p>
      </div>
    </div>
    <div class="container-similar">
      <h4>Similar movies</h4>
      <list-movies :movies="moviesSimilar"/>
    </div>
  </div>
</template>


<style lang="scss" scoped>

.body {
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;

  img {
    min-width: 270px;
    object-fit: cover;
  }

  .container {
    display: flex;
    align-items: center;
    width: 65%;

    img {
      margin-right: 35px;
    }

    .infos p {
      padding: 0.5rem;

      &:nth-child(odd):not(:last-child) {
        background-color: #222222;
      }
    }
  }
}

.container-similar {

  h4 {
    color: #999fbc;
    font-size: 26px;
    text-align: center;
  }

  .similar-movies {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;

    .similar-movie {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 3rem;
      width: 200px;

      img {
        height: auto;
        width: 100%;
        object-fit: contain;
      }

      p {
        font-size: 19px;
        margin-top: 0.5rem;
        color: #999fbc;
      }
    }
  }
}


h4 {
  color: #999fbc;
  font-size: 26px;
  margin: 1rem;
}

p {
  color: #999fbc;
}
</style>

<script lang="ts" setup>
import {onMounted, ref} from "vue";
import MovieService from "../services/movie-db.service";
import {Gender} from "../interface/Gender";


const genders = ref<Gender[]>([]);

onMounted(async () => {
  try {
    genders.value = await MovieService.fetchGenres();
  } catch (error) {
    console.error(error);
  }
});

</script>

<template>
  <aside>
    <div class="aside__menu-list">
      <h2>Menu</h2>
      <ul>
        <li><span>Accueil</span></li>
        <li><span>Films</span></li>
        <li><span>Series</span></li>
      </ul>
    </div>
    <div class="aside__menu-list">
      <h2>Catégories de films</h2>
      <ul>
        <li v-for="(genre, index) in genders" :key="index"><span>{{ genre.name }}</span></li>
      </ul>
    </div>
  </aside>
</template>


<style lang="scss" scoped>
aside {
  z-index: 1;
  background-color: #222222;
  height: 90vh;
  min-width: 200px;

  .aside__menu-list {
    padding-top: 15px;
    width: 100%;
    scroll-behavior: auto;

    h2 {
      text-align: center;
      font-size: 18px;
    }

    ul {
      margin-top: 20px;

      li {
        list-style: none;
        margin-bottom: 10px;

        span {
          padding-left: 50px;

          &:hover {
            color: rgb(248, 195, 7);
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>

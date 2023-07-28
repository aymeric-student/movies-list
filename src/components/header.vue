<template>
  <div class="test">
    <header>
      <img v-if="logged" :src="url" alt="user picture">
      <h1>E-movie</h1>

      <v-text-field v-show="logged" v-model="searchMovie" class="input-search" label="search movie"
                    variant="outlined" @input="emitSearchText"></v-text-field>
      <nav>
        <ul v-if="logged">
          <li v-for="(movieType, index) in movieTypes" :key="index" @click="emitMovieType(movieType)"> {{
              movieType
            }}
          </li>
          <li>
            <button @click="logout()">logout</button>
          </li>
        </ul>
        <ul v-if="!logged">
          <li>
            <router-link to="/signup">Inscription</router-link>
          </li>
          <li>
            <router-link to="/login">Connexion</router-link>
          </li>
        </ul>
      </nav>
    </header>
  </div>
</template>

<script lang="ts" setup>
import {defineEmits, onMounted, ref, watch} from "vue";
import {LoggedStore} from "../stores/auth.store";
import {storeToRefs} from "pinia";
import {useRouter} from "vue-router";
import supabase from "../lib/supabase";

const router = useRouter()

const movieTypes = ref(['now_playing', 'popular', 'top_rated'])

const emit = defineEmits(["search-text", "movie-type"]);

const emitMovieType = (movieType) => {
  emit("movie-type", movieType)
  router.push("/")
}

const store = LoggedStore()
const logged = ref<boolean>()
let {loggedValue} = storeToRefs(store)
const searchMovie = ref<string>()

const url = ref<string>()
const emitSearchText = () => {
  emit("search-text", searchMovie.value)
};

watch(loggedValue, (value) => {
  logged.value = value as boolean
})

const logout = async () => {
  localStorage.setItem('logged', 'false')
  logged.value = false
  await supabase.auth.signOut()
  await router.push("/login")
}

onMounted(async () => {
  const test = await supabase.auth.getUser()
  url.value = test.data.user.user_metadata.picture

  if (localStorage.getItem('logged') === 'true') {
    logged.value = true
  } else {
    logged.value = false
  }
})
</script>


<style lang="scss" scoped>
.test {
  display: flex;
  flex-direction: column;
}

.search {
  background: red;
}

header {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  background-color: #222222;
  min-height: 10vh;

  img {
    width: 4rem;
    height: 4rem;
    object-fit: cover;
    border-radius: 50%;
    margin: 0 auto;
  }

  .input-search {
    height: 4rem;
    max-width: 50%;
  }

  nav {
    ul {
      display: flex;
      align-items: center;
      list-style: none;

      li {
        margin: .5rem;

        a {
          color: #fff;
        }
      }
    }
  }
}
</style>

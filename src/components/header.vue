<template>
  <div class="test">
    <header>
      <h1>E-movie</h1>
      <v-text-field v-show="logged" v-model="searchMovie" class="input-search" label="search movie"
                    variant="outlined" @input="emitSearchText"></v-text-field>
      <nav>
        <ul v-if="logged">
          <li>
            <img alt="user picture" src="a">
          </li>
          <li>
            <router-link to="/">Accueil</router-link>
          </li>
          <li>
            <router-link to="/popular">Popular</router-link>
          </li>
          <li>
            <router-link to="/top-rated">Watchlist</router-link>
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

const router = useRouter()

const store = LoggedStore()
const logged = ref<boolean>()

const {loggedValue} = storeToRefs(store)
const searchMovie = ref<string>()

const emit = defineEmits(["search-text"]);

const emitSearchText = () => {
  emit("search-text", searchMovie.value)
};

watch(loggedValue, (value) => {
  logged.value = value as boolean
})

const logout = () => {
  localStorage.setItem('logged', 'false')
  logged.value = false
  router.push("/login")
}

onMounted(() => {
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

  .input-search {
    height: 4rem;
    max-width: 50%;
  }

  nav {
    ul {
      display: flex;
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

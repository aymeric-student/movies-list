<template>
  <div class="signup-view">
    <h1>Connexion</h1>
    <form action="signup" @submit.prevent="login">
      <v-text-field v-model="user.email" label="Email" variant="outlined"></v-text-field>
      <v-text-field v-model="user.password" label="Password" type="password" variant="outlined"></v-text-field>
      <button type="submit">Connexion</button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {User} from "../interface/user";
import {useRouter} from "vue-router";

import {LoggedStore} from "../stores/auth.store";
import supabase from "../lib/supabase";

const router = useRouter()
let {checkAuth} = LoggedStore()

const user = ref<User>({
  name: "",
  email: "",
  password: "",
});

const login = async () => {
  try {


    localStorage.setItem("logged", "true")

    const {auth, error} = await supabase.auth.signInWithPassword({
      email: user.value.email,
      password: user.value.password,
    })

    if (!error) {
      checkAuth()
      await router.push("/")
    }

  } catch (error) {
    throw new Error(error);
  }
};

</script>


<style lang="scss" scoped>
.signup-view {
  display: flex;
  flex-direction: column;
  width: 100%;

  h1 {
    text-align: center;
    font-size: 3rem;
    margin: 2rem 0;
    color: #fff;
  }

  form {
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: 0 auto;
    padding: 2rem;
    border-radius: 9px;

    button[type="submit"] {
      background-color: #222222;
      color: #fff;
      width: 100%;
      border: none;
      border-radius: 9px;
      padding: 0.5rem;
      cursor: pointer;

      &:hover {
        background-color: #333333;
      }
    }
  }
}
</style>
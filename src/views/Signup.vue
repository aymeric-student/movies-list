<template>
  <div class="signup-view">
    <h1>Inscriptions</h1>
    <form action="signup" @submit.prevent="signup">
      <v-text-field v-model="user.name" label="Username" variant="outlined"></v-text-field>
      <v-text-field v-model="user.email" label="Email" variant="outlined"></v-text-field>
      <v-text-field v-model="user.password" label="Password" variant="outlined"></v-text-field>
      <v-text-field label="Confirm password" variant="outlined"></v-text-field>
      <button type="submit">S'inscrire</button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import supabase from "../lib/supabase";
import SupabaseService from "../services/database.service";

interface User {
  name: string,
  email: string,
  password: string
}

const user = ref<User>({
  name: "",
  email: "",
  password: "",
});
const router = useRouter()

const signup = async () => {
  try {
    const users = {
      name: user.value.name,
      email: user.value.email,
      password: user.value.password
    }
    await SupabaseService.signup(users.name, users.email, users.password)
  } catch (error) {
    throw new Error(error);
  }
};

onMounted(async () => {
  const {data, error} = await supabase.from("users_table").select("*");
});

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

    .inputs {
      display: flex;
      flex-direction: column;
      margin-bottom: 1rem;

      label {
        color: #fff;
        margin-bottom: 0.5rem;
      }

      input {
        height: 40px;
        border: none;
        border-radius: 9px;
        padding: 0 0.5rem;
        outline: none;
      }
    }

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
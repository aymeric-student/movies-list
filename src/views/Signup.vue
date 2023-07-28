<template>
  <div class="signup-view">
    <h1>Inscriptions</h1>
    <form action="signup" @submit.prevent="signup">
      <v-text-field v-model="user.name" label="Username" variant="outlined"></v-text-field>
      <v-text-field v-model="user.email" label="Email" variant="outlined"></v-text-field>
      <v-text-field v-model="user.password" label="Password" type="password" variant="outlined"></v-text-field>
      <v-text-field label="Confirm password" type="password" variant="outlined"></v-text-field>
      <v-file-input label="user-picture" type="file" variant="outlined" @change="onFileChange"></v-file-input>
      <button type="submit">S'inscrire</button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {User} from "../interface/user";
import supabase from "../lib/supabase";
import {v4 as uuidv4} from "uuid";
import router from "../router/router";
import {LoggedStore} from "../stores/auth.store";

const user = ref<User>({
  name: "",
  email: "",
  password: "",
});

const file = ref<File | null>(null);

const {checkAuth} = LoggedStore()


const onFileChange = (event: Event) => {
  const inputElement = event.target as HTMLInputElement;
  if (inputElement?.files && inputElement.files.length > 0) {
    file.value = inputElement?.files[0] as unknown as File;
  }
};

const saveFileToBucket = async (file, picture_id) => {
  let data = null;
  try {
    if (!file) return;

    data = await supabase.storage
        .from('movie-app')
        .upload(`users-${picture_id}`, file, {
          contentType: file.type,
        });


  } catch (error) {
    throw new Error(error.message);
  }
  return data.data;
};

const signup = async () => {
  try {

    const picture_id = uuidv4() as string;
    await saveFileToBucket(file.value, picture_id);

    const bucketId = "movie-app"


    const picture = `users-${picture_id}`

    const result = await supabase.auth.signUp({
      email: user.value.email,
      password: user.value.password,
      options: {
        data: {
          picture: `https://ragkqnstwcincednpyaz.supabase.co/storage/v1/object/public/${bucketId}/${picture}`
        }
      }
    })

    if (result.data) {
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
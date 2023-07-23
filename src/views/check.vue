<template>
  <div>
    <p>Vous êtes déjà connecté !</p>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue";
import {storeToRefs} from "pinia";
import {LoggedStore} from "../stores/auth.store";

const test = LoggedStore()

const {loggedValue, checkAuth} = storeToRefs(test)

const logged = ref<boolean>()


onMounted(() => {
  console.log(loggedValue)

})

</script>
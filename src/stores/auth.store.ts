import {defineStore} from 'pinia';
import {computed, ref} from "vue";

export const LoggedStore = defineStore('auth', () => {

    interface todo {
        name: string,
        done: boolean
    }

    const todos = ref<todo[]>([]);
    const logged = ref<boolean>(false);

    function checkAuth() {
        logged.value = !logged.value;
    }

    const loggedValue = computed(() => {
        return logged.value;
    })

    return {
        todos,
        checkAuth,
        loggedValue
    }
});


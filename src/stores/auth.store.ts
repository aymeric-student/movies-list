import {defineStore} from 'pinia';
import {computed, ref} from "vue";

export const LoggedStore = defineStore('auth', () => {
    const logged = ref<boolean>(false);
    let pictureTest = ref<string>('');

    const checkAuth = () => {
        console.log("checkAuth")
        logged.value = !logged.value;
    }

    const getPictureActif = computed(() => {
        return pictureTest.value;
    })

    const loggedValue = computed(() => {
        return logged.value;
    })

    /*    const linkPicture = computed(() => {
            return (value) => {
                return value;
            }
        })*/

    /*    const linkPicture = (value: string) => {
            pictureTest.value = value;
        }*/
    /*    function linkPicture(value: string) {
            pictureTest.value = value;
        }*/
    const linkPicture = computed(() => {
        return pictureTest.value;
    })

    return {
        checkAuth,
        loggedValue,
        getPictureActif,
        linkPicture
    }
});


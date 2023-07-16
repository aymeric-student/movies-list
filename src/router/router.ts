import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';
import Home from "../views/home.vue"
import Popular from "../views/popular.vue"
import TopRated from "../views/top-rated.vue"
import MovieDetails from "../views/movie-details.vue"
import Signup from "../views/Signup.vue"
import Login from "../views/Signin.vue"

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/popular',
        component: Popular
    },
    {
        path: '/top-rated',
        component: TopRated

    },
    {
        path: "/movie-details/:id",
        component: MovieDetails
    },
    {
        path: "/signup",
        component: Signup,
    },
    {
        path: "/login",
        component: Login,
    },
    {
        path: '/:catchAll(.*)',
        redirect: '/'
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;

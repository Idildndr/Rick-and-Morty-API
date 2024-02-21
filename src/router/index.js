import {createRouter, createWebHistory} from "vue-router"
import HomeView from "../views/HomeView.vue"
import DetailsView from "../views/DetailsView.vue"
import EpisodeView from "../views/EpisodeView.vue"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path:"/",
            name:"home",
            component: HomeView
        },
        {
            path:"/char/:id",
            name:"CharacterDetails",
            component: DetailsView
        },

        {
            path:"/episodes/:id",
            name: "EpisodeDetails",
            component:EpisodeView
        },
    ]
})

export default router
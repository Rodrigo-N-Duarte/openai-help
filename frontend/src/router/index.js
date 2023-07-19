import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import HomeView from "@/views/HomeView.vue";
import ProfileView from "@/views/ProfileView.vue";
import RankView from "@/views/RankView.vue";
import StoreView from "@/views/StoreView.vue";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView
  },
  {
    path: '/store',
    name: 'store',
    component: StoreView
  },
  {
    path: '/rank',
    name: 'rank',
    component: RankView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

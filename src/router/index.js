import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LandingView from "@/views/LandingView";
import LoginView from "@/views/LoginView";
import ManageExercisesView from "@/views/ManageExercisesView";
import CreateRoutineView from "@/views/CreateRoutineView";
import CategoryView from "@/views/CategoryView";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: LandingView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: LoginView
  },
  {
    path: '/exercises',
    name: 'Manage Exercises',
    component: ManageExercisesView
  },
  {
    path: '/create-routine',
    name: 'Create Routine',
    component: CreateRoutineView
  },
  {
    path: '/category/:slug',
    name: 'CategoryView',
    component: CategoryView,
    props: true
  }

]

const router = new VueRouter({
  routes
})

export default router

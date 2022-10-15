import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LandingView from "@/views/LandingView";
import LoginView from "@/views/LoginView";
import ManageExercisesView from "@/views/ManageExercisesView";
import CreateRoutineView from "@/views/CreateRoutineView";
import CategoryView from "@/views/CategoryView";
import UserProfileView from "@/views/UserProfileView";
import MyRoutines from "@/views/MyRoutines";
import VerifyEmail from "@/views/VerifyEmail";
import ApiErrorView from "@/views/ApiErrorView";
import SearchView from "@/views/SearchView";
import LostView from "@/views/LostView";
import FavouriteView from "@/views/FavouriteView";
import OverviewRoutineView from "@/views/OverviewRoutineView";
import HelpView from "@/views/HelpView";

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
    path: '/routines',
    name: 'My Routines',
    component: MyRoutines
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
  },
  {
  path: '/user',
    name: 'User Profile',
    component: UserProfileView
  },
  {
    path: '/verify-email',
    name: 'Verify Email',
    component: VerifyEmail
  },
  {
    path: '/error',
    name: 'Error',
    component: ApiErrorView
  },
  {
    path: '/search/:input',
    name: 'SearchView',
    component: SearchView,
    props: true
  },
  {
    path: '/favourites',
    name: 'FavouriteView',
    component: FavouriteView
  },
  {
    path: '/routines/view/:id',
    name: 'OverviewRoutineView',
    component: OverviewRoutineView
  },
  {
    path: '/help',
    name: 'HelpView',
    component: HelpView
  },
  {
    path: '/*',
    name: 'LostView',
    component: LostView
  }
]

const router = new VueRouter({
  routes
})

export default router

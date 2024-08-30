import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import BoatDetailsView from '../views/BoatDetailsView.vue'
import SubmitPostView from '../views/SubmitPostView.vue'
import { auth } from '../../firebase';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/registracija',
    name: 'RegisterView',
    component: RegisterView
  },
  {
    path: '/prijava',
    name: 'LoginView',
    component: LoginView
  },
  {
    path: '/boat/:id',
    name: 'boatDetails',
    component: BoatDetailsView
  },
  {
    path: '/submit',
    name: 'SubmitPostView',
    component: SubmitPostView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !auth.currentUser) {
    next('/prijava');
  } else {
    next();
  }
});

export default router
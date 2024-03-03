import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import Register from '../views/Register.vue'
import Login from "../views/Login.vue"
import Users from "../views/Users.vue"
import Edit from "../views/Edit.vue"
import axios from "axios"

function AdminAuth(to, from, next) {
  if(sessionStorage.getItem("tk") != undefined) {
    let req = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("tk")}`
      }
    }

    axios.post("http://localhost:8686/validate", {}, req).then(res => {
      //console.log(res);
      next();

    }).catch(e => {
      //console.log(e);
      next("/login");
    });

  } else {
    next("/login");
  }
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/admin/users',
    name: 'Users',
    component: Users,
    beforeEnter: AdminAuth,
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/admin/edit/:id',
    name: 'Edit',
    component: Edit,
    beforeEnter: AdminAuth
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NewPizza from '../components/Pizza/NewPizza.vue'
import EditPizza from '../components/Pizza/EditPizza.vue'
import PizzaList from '@/views/PizzaList.vue'
import NewUser from '../components/User/NewUser.vue'
import EditUser from '../components/User/EditUser.vue'
import UserList from '@/views/UserList.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/pizzas',
    name: 'PizzaList',
    component: PizzaList
  },
  {
    path: '/editar-pizza/:id',
    name: 'EditPizza',
    component: EditPizza
  },
  {
    path: '/add-pizza/',
    name: 'NewPizza',
    component: NewPizza
  },
  {
    path: '/users',
    name: 'UserList',
    component: UserList
  },
  {
    path: '/editar-user/:id',
    name: 'EditUser',
    component: EditUser
  },
  {
    path: '/add-user/',
    name: 'NewUser',
    component: NewUser
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

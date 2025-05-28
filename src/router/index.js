import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NewPizza from '../components/Pizza/NewPizza.vue'
import EditPizza from '../components/Pizza/EditPizza.vue'
import PizzaList from '@/views/PizzaList.vue'
import NewUser from '../components/User/NewUser.vue'
import EditUser from '../components/User/EditUser.vue'
import UserList from '@/views/UserList.vue'
import PizzaSizeList from '@/views/PizzaSizeList.vue'
import NewPizzaSize from '../components/PizzaSize/NewPizzaSize.vue'
import EditPizzaSize from '../components/PizzaSize/EditPizzaSize.vue'
import ClientList from '@/views/ClientList.vue'
import NewClient from '../components/Client/NewClient.vue'
import EditClient from '../components/Client/EditClient.vue'

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
  {
    path: '/pizza-sizes',
    name: 'PizzaSizeList',
    component: PizzaSizeList  
  },
  {
    path: '/editar-pizza-size/:id',
    name: 'EditPizzaSize',
    component: EditPizzaSize
  },
  {
    path: '/add-pizza-size/',
    name: 'NewPizzaSize',
    component: NewPizzaSize
  },
  {
    path: '/clients',
    name: 'ClientList',
    component: ClientList
  },
  {
    path: '/editar-client/:id',
    name: 'EditClient',
    component: EditClient
  },
  {
    path: '/add-client/',
    name: 'NewClient',
    component: NewClient
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

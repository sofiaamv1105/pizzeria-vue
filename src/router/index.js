import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NewPizza from '../components/Pizza/NewPizza.vue'
import EditPizza from '../components/Pizza/EditPizza.vue'
import PizzaList from '@/views/PizzaList.vue'

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
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

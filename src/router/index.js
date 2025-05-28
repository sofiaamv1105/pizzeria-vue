import { createRouter, createWebHashHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'

//imports Pizza
import NewPizza from '../components/Pizza/NewPizza.vue'
import EditPizza from '../components/Pizza/EditPizza.vue'
import PizzaList from '@/views/PizzaList.vue'

//imports User
import NewUser from '../components/User/NewUser.vue'
import EditUser from '../components/User/EditUser.vue'
import UserList from '@/views/UserList.vue'

//imports PizzaSize
import PizzaSizeList from '@/views/PizzaSizeList.vue'
import NewPizzaSize from '../components/PizzaSize/NewPizzaSize.vue'
import EditPizzaSize from '../components/PizzaSize/EditPizzaSize.vue'

//imports Client
import ClientList from '@/views/ClientList.vue'
import NewClient from '../components/Client/NewClient.vue'
import EditClient from '../components/Client/EditClient.vue'

//imports Branches
import BranchList from '@/views/BranchList.vue'
import NewBranch from '../components/Branch/NewBranch.vue'
import EditBranch from '@/components/Branch/EditBranch.vue'

//import Employee
import EmployeeList from '@/views/EmployeeList.vue'
import NewEmployee from '../components/Employee/NewEmployee.vue'
import EditEmployee from '../components/Employee/EditEmployee.vue'

//imports Ingredient
import IngredientList from '@/views/IngredientList.vue'
import NewIngredient from '../components/Ingredient/NewIngredient.vue'
import EditIngredient from '../components/Ingredient/EditIngredient.vue'

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
  {
    path: '/branches',
    name: 'BranchList',
    component: BranchList
  },
  {
    path: '/editar-branch/:id',
    name: 'EditBranch',
    component: EditBranch
  },
  {
    path: '/add-branch/',
    name: 'NewBranch',
    component: NewBranch
  },
  {
    path: '/employees',
    name: 'EmployeeList',
    component: EmployeeList
  },
  {
    path: '/editar-employee/:id',
    name: 'EditEmployee',
    component: EditEmployee
  },
  {
    path: '/add-employee/',
    name: 'NewEmployee',
    component: NewEmployee
  },
  {
    path: '/ingredients',
    name: 'IngredientList',
    component: IngredientList
  },
  {
    path: '/editar-ingredient/:id',
    name: 'EditIngredient',
    component: EditIngredient
  },
  {
    path: '/add-ingredient/',
    name: 'NewIngredient',
    component: NewIngredient
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

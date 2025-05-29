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

//imports Order
import OrderList from '@/views/OrderList.vue'
import NewOrder from '../components/Order/NewOrder.vue'
import EditOrder from '../components/Order/EditOrder.vue'

//imports PizzaIngredient
import PizzaIngredientList from '@/views/PizzaIngredientList.vue'
import NewPizzaIngredient from '../components/PizzaIngredient/NewPizzaIngredient.vue'
import EditPizzaIngredient from '../components/PizzaIngredient/EditPizzaIngredient.vue'

//imports ExtraIngredient
import ExtraIngredientList from '@/views/ExtraIngredientList.vue'
import NewExtraIngredient from '../components/ExtraIngredient/NewExtraIngredient.vue'
import EditExtraIngredient from '../components/ExtraIngredient/EditExtraIngredient.vue'

//imports OrderPizza
import OrderPizzaList from '@/views/OrderPizzaList.vue'
import EditOrderPizza from '../components/OrderPizza/EditOrderPizza.vue'
import NewOrderPizza from '../components/OrderPizza/NewOrderPizza.vue'

//imports OrderExtraIngredient
import OrderExtraIngredientList from '@/views/OrderExtraIngredientList.vue'
import NewOrderExtraIngredient from '../components/OrderExtraIngredient/NewOrderExtraIngredient.vue'
import EditOrderExtraIngredient from '../components/OrderExtraIngredient/EditOrderExtraIngredient.vue'

//imports RawMaterial
import RawMaterialList from '@/views/RawMaterialList.vue'
import NewRawMaterial from '../components/RawMaterial/NewRawMaterial.vue'
import EditRawMaterial from '../components/RawMaterial/EditRawMaterial.vue'

//imports Supplier
import SupplierList from '@/views/SupplierList.vue'
import NewSupplier from '../components/Supplier/NewSupplier.vue'
import EditSupplier from '../components/Supplier/EditSupplier.vue'

//imports PizzaRawMaterial
import PizzaRawMaterialList from '@/views/PizzaRawMaterialList.vue'
import NewPizzaRawMaterial from '../components/PizzaRawMaterial/NewPizzaRawMaterial.vue'
import EditPizzaRawMaterial from '../components/PizzaRawMaterial/EditPizzaRawMaterial.vue'

//imports Purchase
import PurchaseList from '@/views/PurchaseList.vue'
import NewPurchase from '../components/Purchase/NewPurchase.vue'
import EditPurchase from '../components/Purchase/EditPurchase.vue'


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
  {
    path: '/orders',
    name: 'OrderList',
    component: OrderList
  },
  {
    path: '/editar-order/:id',
    name: 'EditOrder',
    component: EditOrder
  },
  {
    path: '/add-order/',
    name: 'NewOrder',
    component: NewOrder
  },
  {
    path: '/pizza_ingredients',
    name: 'PizzaIngredientList',
    component: PizzaIngredientList
  },
  {
    path: '/editar_pizza_ingredient/:id',
    name: 'EditPizzaIngredient',
    component: EditPizzaIngredient
  },
  {
    path: '/add_pizza_ingredient/',
    name: 'NewPizzaIngredient',
    component: NewPizzaIngredient
  },
  {
    path: '/extra-ingredients',
    name: 'ExtraIngredientList',
    component: ExtraIngredientList
  },
  {
    path: '/editar-extra-ingredient/:id',
    name: 'EditExtraIngredient',
    component: EditExtraIngredient
  },
  {
    path: '/add-extra-ingredient/',
    name: 'NewExtraIngredient',
    component: NewExtraIngredient
  },
  {
    path: '/order-pizzas',
    name: 'OrderPizzaList',
    component: OrderPizzaList
  },
  {
    path: '/editar-order-pizza/:id',
    name: 'EditOrderPizza',
    component: EditOrderPizza
  },
  {
    path: '/add-order-pizza/',
    name: 'NewOrderPizza',
    component: NewOrderPizza
  },
  {
    path: '/order-extra-ingredients',
    name: 'OrderExtraIngredientList',
    component: OrderExtraIngredientList
  },
  {
    path: '/editar-order-extra-ingredient/:id',
    name: 'EditOrderExtraIngredient',
    component: EditOrderExtraIngredient
  },
  {
    path: '/add-order-extra-ingredient/',
    name: 'NewOrderExtraIngredient',
    component: NewOrderExtraIngredient
  },
  {
    path: '/raw-materials',
    name: 'RawMaterialList',
    component: RawMaterialList
  },
  {
    path: '/editar-raw-material/:id',
    name: 'EditRawMaterial',
    component: EditRawMaterial
  },
  {
    path: '/add-raw-material/',
    name: 'NewRawMaterial',
    component: NewRawMaterial
  },
  {
    path: '/suppliers',
    name: 'SupplierList',
    component: SupplierList
  },
  {
    path: '/editar-supplier/:id',
    name: 'EditSupplier',
    component: EditSupplier
  },
  {
    path: '/add-supplier/',
    name: 'NewSupplier',
    component: NewSupplier
  },
  {
    path: '/pizza-raw-materials',
    name: 'PizzaRawMaterialList',
    component: PizzaRawMaterialList
  },
  {
    path: '/add-pizza-raw-material',
    name: 'NewPizzaRawMaterial',
    component: NewPizzaRawMaterial
  },
  {
    path: '/editar-pizza-raw-material/:id',
    name: 'EditPizzaRawMaterial',
    component: EditPizzaRawMaterial
  },
  {
    path: '/purchases',
    name: 'PurchaseList',
    component: PurchaseList
  },
  {
    path: '/editar-purchase/:id',
    name: 'EditPurchase',
    component: EditPurchase
  },
  {
    path: '/add-purchase/',
    name: 'NewPurchase',
    component: NewPurchase
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

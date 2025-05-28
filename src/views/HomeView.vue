<template>
  <div class="dashboard-background">
    <div class="pizza-menu">
      <div class="menu-header">🍕 Menú Principal 🍕</div>

      <router-link
        to="/dashboard"
        :class="{ active: isActive('/dashboard') }"
      >
        Dashboard
      </router-link>

      <!-- Enlaces para Admin -->
      <template v-if="role === 'admin'">
        <router-link v-for="item in adminLinks"
          :key="item.path"
          :to="item.path"
          :class="{ active: isActive(item.path) }">
          {{ item.label }}
        </router-link>
      </template>

      <!-- Enlaces para Vendedor -->
      <template v-else-if="role === 'vendedor'">
        <router-link v-for="item in vendedorLinks"
          :key="item.path"
          :to="item.path"
          :class="{ active: isActive(item.path) }">
          {{ item.label }}
        </router-link>
      </template>

      <!-- Enlaces para Cliente -->
      <template v-else-if="role === 'cliente'">
        <router-link v-for="item in clienteLinks"
          :key="item.path"
          :to="item.path"
          :class="{ active: isActive(item.path) }">
          {{ item.label }}
        </router-link>
      </template>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref } from 'vue'

// Simula la obtención del rol desde Vuex, Pinia o props
const role = ref('admin') // Cambiar según sea necesario

const route = useRoute()

const isActive = (path) => route.path.startsWith(path)

const adminLinks = [
  { path: '/users', label: 'Usuarios' },
  { path: '/pizzas', label: 'Pizzas' },
  { path: '/pizza_sizes', label: 'Tamaños de Pizza' },
  { path: '/clients', label: 'Clientes' },
  { path: '/branches', label: 'Sucursales' },
  { path: '/employees', label: 'Empleados' },
  { path: '/orders', label: 'Pedidos' },
  { path: '/ingredients', label: 'Ingredientes' },
  { path: '/pizza_ingredients', label: 'Ingredientes de Pizza' },
  { path: '/extra_ingredients', label: 'Ingredientes Extra de Pizza' },
  { path: '/order_extra_ingredients', label: 'Ingredientes Extra de Pizza para Pedidos' },
  { path: '/order_pizzas', label: 'Pedidos de Pizza' },
  { path: '/raw_materials', label: 'Materia Prima' },
  { path: '/suppliers', label: 'Proveedores' },
  { path: '/pizza_raw_materials', label: 'Materia Prima de Pizzas' },
  { path: '/purchases', label: 'Compras' },
]

const vendedorLinks = [
  { path: '/orders', label: 'Pedidos' },
  { path: '/clients', label: 'Clientes' },
  { path: '/branches', label: 'Sucursales' },
]

const clienteLinks = [
  { path: '/clients', label: 'Mi Perfil Cliente' },
  { path: '/orders', label: 'Mis Pedidos' },
]
</script>

<style scoped>
.dashboard-background {
  background-color: #f9eae2;
  padding: 50px 0;
  min-height: 100vh;
}
.pizza-menu {
  width: 750px;
  background: #fff0e6;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  overflow: hidden;
  margin: 0 auto;
}
.menu-header {
  background: #d32f2f;
  color: white;
  font-weight: bold;
  padding: 16px;
  text-align: center;
  font-size: 1.25rem;
  letter-spacing: 1px;
}
.pizza-menu a {
  display: block;
  padding: 14px 20px;
  text-decoration: none;
  color: #2e7d32;
  font-weight: 500;
  border-bottom: 1px solid #f3c2b2;
  transition: all 0.3s ease;
}
.pizza-menu a:hover {
  background-color: #f3c2b2;
  color: #b71c1c;
  padding-left: 30px;
}
.pizza-menu a.active {
  background-color: #c62828;
  color: white;
  font-weight: bold;
}
</style>
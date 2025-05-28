<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div class="container-fluid">
        <RouterLink class="navbar-brand" to="/dashboard">Menú Principal</RouterLink>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <button class="btn btn-outline-light btn-sm" @click="logout">Cerrar sesión</button>
          </li>
        </ul>
      </div>
    </nav>

    <div class="container mt-4">
      <h1 class="mb-4">Listado de Pizzas</h1>

      <RouterLink class="btn btn-primary mb-3" to="/pizzas/create">Agregar Nueva Pizza</RouterLink>

      <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>

      <table class="table table-bordered">
        <thead class="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pizza in pizzas" :key="pizza.id">
            <td>{{ pizza.id }}</td>
            <td>{{ pizza.name }}</td>
            <td>
              <RouterLink :to="`/pizzas/edit/${pizza.id}`" class="btn btn-warning btn-sm">Editar</RouterLink>
              <button class="btn btn-danger btn-sm ms-2" @click="deletePizza(pizza.id)">
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const pizzas = ref([]);
const successMessage = ref('');

// Verifica autenticación
onMounted(async () => {
  const user = await axios.get('/api/user').catch(() => null);
  if (!user) {
    router.push('/login');
  } else {
    fetchPizzas();
  }
});

const fetchPizzas = async () => {
  try {
    const response = await axios.get('/api/pizzas');
    pizzas.value = response.data;
  } catch (error) {
    console.error('Error al obtener las pizzas', error);
  }
};

const deletePizza = async (id) => {
  if (!confirm('¿Seguro que deseas eliminar esta pizza?')) return;

  try {
    await axios.delete(`/api/pizzas/${id}`);
    pizzas.value = pizzas.value.filter(pizza => pizza.id !== id);
    successMessage.value = 'Pizza eliminada con éxito.';
  } catch (error) {
    console.error('Error al eliminar la pizza', error);
  }
};

const logout = async () => {
  try {
    await axios.post('/logout');
    router.push('/login');
  } catch (error) {
    console.error('Error al cerrar sesión', error);
  }
};
</script>

<style scoped>
.table td, .table th {
  vertical-align: middle;
}
</style>
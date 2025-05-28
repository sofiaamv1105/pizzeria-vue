<template>
  <div class="container mt-4">
    <h1 class="text-primary fw-bold">Pizzas</h1>

    <div class="card shadow-sm">
      <div class="card-header fw-bold">Lista de Pizzas</div>
      <div class="card-body">
        <table class="table table-hover">
          <thead class="table-info">
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Tamaños</th>
              <th>Ingredientes</th>
              <th>Materias Primas</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(pizza, index) in pizzas" :key="pizza.id">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ pizza.name }}</td>
              <td>
                <ul class="list-unstyled mb-0">
                  <li v-for="size in pizza.sizes" :key="size.id">
                    {{ size.size }} - ${{ size.price }}
                  </li>
                </ul>
              </td>
              <td>
                <ul class="list-unstyled mb-0">
                  <li v-for="ingredient in pizza.ingredients" :key="ingredient.id">
                    {{ ingredient.ingredient_name }}
                  </li>
                </ul>
              </td>
              <td>
                <ul class="list-unstyled mb-0">
                  <li v-for="rm in pizza.raw_materials" :key="rm.id">
                    {{ rm.name }}
                  </li>
                </ul>
              </td>
              <td>
                <button @click="editPizza(pizza.id)" class="btn btn-sm btn-warning mx-1">
                  <font-awesome-icon icon="pencil" />
                </button>
                <button @click="eliminar(pizza.id)" class="btn btn-sm btn-outline-danger mx-1">
                  <font-awesome-icon icon="trash" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <button @click="newPizza" class="btn btn-success">
          <font-awesome-icon icon="plus" /> Nueva Pizza
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'PizzaList',
  data() {
    return {
      pizzas: []
    }
  },
  methods: {
    async cargarPizzas() {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/pizzas')
        this.pizzas = res.data.pizzas
      } catch (error) {
        console.error('Error cargando pizzas:', error)
      }
    },
    async eliminar(id) {
      Swal.fire({
        title: `¿Deseas eliminar la pizza con ID ${id}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.delete(`http://127.0.0.1:8000/api/pizzas/${id}`)
            Swal.fire('Eliminado', 'La pizza ha sido eliminada.', 'success')
            this.cargarPizzas()
          } catch (error) {
            console.error('Error al eliminar:', error)
            Swal.fire('Error', 'No se pudo eliminar la pizza.', 'error')
          }
        }
      })
    },
    editPizza(id) {
      this.$router.push({ name: 'EditPizza', params: { id } })
    },
    newPizza() {
      this.$router.push({ name: 'NewPizza' })
    }
  },
  mounted() {
    this.cargarPizzas()
  }
}
</script>
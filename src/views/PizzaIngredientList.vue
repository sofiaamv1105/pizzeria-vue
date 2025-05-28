<template>
  <div class="container mt-4">
    <h1 class="text-primary fw-bold">Ingredientes por Pizza</h1>

    <div class="card shadow-sm">
      <div class="card-header fw-bold">Lista de Ingredientes por Pizza</div>
      <div class="card-body">
        <table class="table table-hover">
          <thead class="table-primary">
            <tr>
              <th>#</th>
              <th>Pizza</th>
              <th>Ingrediente</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in pizzaIngredients" :key="item.id">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ item.pizza.name }}</td>
              <td>{{ item.ingredient.name }}</td>
              <td>
                <button @click="editPizzaIngredient(item.id)" class="btn btn-sm btn-warning mx-1">
                  <font-awesome-icon icon="pencil" />
                </button>
                <button @click="eliminar(item.id)" class="btn btn-sm btn-outline-danger mx-1">
                  <font-awesome-icon icon="trash" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <button @click="newPizzaIngredient" class="btn btn-primary">
          <font-awesome-icon icon="plus" /> Nuevo Registro
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'PizzaIngredientList',
  data() {
    return {
      pizzaIngredients: []
    }
  },
  methods: {
    async cargarPizzaIngredients() {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/pizza_ingredients')
        this.pizzaIngredients = res.data.pizza_ingredients
      } catch (error) {
        console.error('Error cargando datos:', error)
        Swal.fire('Error', 'No se pudieron cargar los registros.', 'error')
      }
    },
    async eliminar(id) {
      Swal.fire({
        title: `¿Eliminar el registro con ID ${id}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.delete(`http://127.0.0.1:8000/api/pizza_ingredients/${id}`)
            Swal.fire('Eliminado', 'El registro ha sido eliminado.', 'success')
            this.cargarPizzaIngredients()
          } catch (error) {
            console.error('Error al eliminar:', error)
            Swal.fire('Error', 'No se pudo eliminar el registro.', 'error')
          }
        }
      })
    },
    editPizzaIngredient(id) {
      this.$router.push({ name: 'EditPizzaIngredient', params: { id } })
    },
    newPizzaIngredient() {
      this.$router.push({ name: 'NewPizzaIngredient' })
    }
  },
  mounted() {
    this.cargarPizzaIngredients()
  }
}
</script>
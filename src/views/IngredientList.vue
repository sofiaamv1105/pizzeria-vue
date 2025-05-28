<template>
  <div class="container mt-4">
    <h1 class="text-success fw-bold">Ingredientes</h1>

    <div class="card shadow-sm">
      <div class="card-header fw-bold">Lista de Ingredientes</div>
      <div class="card-body">
        <table class="table table-hover">
          <thead class="table-success">
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(ingredient, index) in ingredients" :key="ingredient.id">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ ingredient.name }}</td>
              <td>
                <button @click="editIngredient(ingredient.id)" class="btn btn-sm btn-warning mx-1">
                  <font-awesome-icon icon="pencil" />
                </button>
                <button @click="eliminar(ingredient.id)" class="btn btn-sm btn-outline-danger mx-1">
                  <font-awesome-icon icon="trash" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <button @click="newIngredient" class="btn btn-success">
          <font-awesome-icon icon="plus" /> Nuevo Ingrediente
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'IngredientList',
  data() {
    return {
      ingredients: []
    }
  },
  methods: {
    async cargarIngredientes() {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/ingredients')
        this.ingredients = res.data.ingredients
      } catch (error) {
        console.error('Error cargando ingredientes:', error)
      }
    },
    async eliminar(id) {
      Swal.fire({
        title: `¿Deseas eliminar el ingrediente con ID ${id}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.delete(`http://127.0.0.1:8000/api/ingredients/${id}`)
            Swal.fire('Eliminado', 'El ingrediente ha sido eliminado.', 'success')
            this.cargarIngredientes()
          } catch (error) {
            console.error('Error al eliminar:', error)
            Swal.fire('Error', 'No se pudo eliminar el ingrediente.', 'error')
          }
        }
      })
    },
    editIngredient(id) {
      this.$router.push({ name: 'EditIngredient', params: { id } })
    },
    newIngredient() {
      this.$router.push({ name: 'NewIngredient' })
    }
  },
  mounted() {
    this.cargarIngredientes()
  }
}
</script>
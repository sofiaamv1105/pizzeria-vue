<template>
  <div class="container mt-4">
    <h1 class="text-success fw-bold">Ingredientes Extra</h1>

    <div class="card shadow-sm">
      <div class="card-header fw-bold">Lista de Ingredientes Extra</div>
      <div class="card-body">
        <table class="table table-hover">
          <thead class="table-success">
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(extra, index) in extraIngredients" :key="extra.id">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ extra.name }}</td>
              <td>{{ Number(extra.price).toFixed(2) }}</td>
              <td>
                <button @click="editExtra(extra.id)" class="btn btn-sm btn-warning mx-1">
                  <font-awesome-icon icon="pencil" />
                </button>
                <button @click="eliminar(extra.id)" class="btn btn-sm btn-outline-danger mx-1">
                  <font-awesome-icon icon="trash" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <button @click="newExtra" class="btn btn-success">
          <font-awesome-icon icon="plus" /> Nuevo Ingrediente Extra
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'ExtraIngredientList',
  data() {
    return {
      extraIngredients: []
    }
  },
  methods: {
    async cargarIngredientesExtra() {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/extra_ingredients')
        this.extraIngredients = res.data.extra_ingredients
      } catch (error) {
        console.error('Error cargando ingredientes extra:', error)
      }
    },
    async eliminar(id) {
      Swal.fire({
        title: `¿Deseas eliminar el ingrediente extra con ID ${id}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.delete(`http://127.0.0.1:8000/api/extra_ingredients/${id}`)
            Swal.fire('Eliminado', 'El ingrediente extra ha sido eliminado.', 'success')
            this.cargarIngredientesExtra()
          } catch (error) {
            console.error('Error al eliminar:', error)
            Swal.fire('Error', 'No se pudo eliminar el ingrediente extra.', 'error')
          }
        }
      })
    },
    editExtra(id) {
      this.$router.push({ name: 'EditExtraIngredient', params: { id } })
    },
    newExtra() {
      this.$router.push({ name: 'NewExtraIngredient' })
    }
  },
  mounted() {
    this.cargarIngredientesExtra()
  }
}
</script>
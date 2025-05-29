<template>
  <div class="container mt-4">
    <h1 class="text-primary fw-bold">Relaciones Pizza - Materia Prima</h1>

    <div class="card shadow-sm">
      <div class="card-header fw-bold">Lista de Relaciones</div>
      <div class="card-body">
        <table class="table table-hover">
          <thead class="table-info">
            <tr>
              <th>#</th>
              <th>Pizza</th>
              <th>Materia Prima</th>
              <th>Cantidad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(relacion, index) in relaciones" :key="relacion.id">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ relacion.pizza.name }}</td>
              <td>{{ relacion.raw_material.name }}</td>
              <td>{{ relacion.quantity }}</td>
              <td>
                <button @click="editRelacion(relacion.id)" class="btn btn-sm btn-warning mx-1">
                  <font-awesome-icon icon="pencil" />
                </button>
                <button @click="eliminar(relacion.id)" class="btn btn-sm btn-outline-danger mx-1">
                  <font-awesome-icon icon="trash" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <button @click="newRelacion" class="btn btn-success">
          <font-awesome-icon icon="plus" /> Nueva Relación
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'PizzaRawMaterialList',
  data() {
    return {
      relaciones: []
    }
  },
  methods: {
    async cargarRelaciones() {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/pizza-raw-materials')
        this.relaciones = res.data.pizza_raw_materials
      } catch (error) {
        console.error('Error cargando relaciones:', error)
      }
    },
    async eliminar(id) {
      Swal.fire({
        title: `¿Deseas eliminar la relación con ID ${id}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.delete(`http://127.0.0.1:8000/api/pizza-raw-materials/${id}`)
            Swal.fire('Eliminado', 'La relación ha sido eliminada.', 'success')
            this.cargarRelaciones()
          } catch (error) {
            console.error('Error al eliminar:', error)
            Swal.fire('Error', 'No se pudo eliminar la relación.', 'error')
          }
        }
      })
    },
    editRelacion(id) {
      this.$router.push({ name: 'EditPizzaRawMaterial', params: { id } })
    },
    newRelacion() {
      this.$router.push({ name: 'NewPizzaRawMaterial' })
    }
  },
  mounted() {
    this.cargarRelaciones()
  }
}
</script>
<template>
  <div class="container mt-4">
    <h1 class="text-primary fw-bold">Materias Primas</h1>

    <div class="card shadow-sm">
      <div class="card-header fw-bold">Lista de Materias Primas</div>
      <div class="card-body">
        <table class="table table-hover">
          <thead class="table-info">
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Unidad</th>
              <th>Stock Actual</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(material, index) in rawMaterials" :key="material.id">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ material.name }}</td>
              <td>{{ material.unit }}</td>
              <td>{{ material.current_stock }}</td>
              <td>
                <button @click="editMaterial(material.id)" class="btn btn-sm btn-warning mx-1">
                  <font-awesome-icon icon="pencil" />
                </button>
                <button @click="eliminar(material.id)" class="btn btn-sm btn-outline-danger mx-1">
                  <font-awesome-icon icon="trash" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <button @click="newMaterial" class="btn btn-success">
          <font-awesome-icon icon="plus" /> Nueva Materia Prima
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'RawMaterialList',
  data() {
    return {
      rawMaterials: []
    }
  },
  methods: {
    async cargarMaterias() {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/raw-materials')
        this.rawMaterials = res.data.rawMaterials
      } catch (error) {
        console.error('Error cargando materias primas:', error)
      }
    },
    async eliminar(id) {
      Swal.fire({
        title: `¿Deseas eliminar la materia prima con ID ${id}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.delete(`http://127.0.0.1:8000/api/raw-materials/${id}`)
            Swal.fire('Eliminado', 'La materia prima ha sido eliminada.', 'success')
            this.cargarMaterias()
          } catch (error) {
            console.error('Error al eliminar:', error)
            Swal.fire('Error', 'No se pudo eliminar la materia prima.', 'error')
          }
        }
      })
    },
    editMaterial(id) {
      this.$router.push({ name: 'EditRawMaterial', params: { id } })
    },
    newMaterial() {
      this.$router.push({ name: 'NewRawMaterial' })
    }
  },
  mounted() {
    this.cargarMaterias()
  }
}
</script>
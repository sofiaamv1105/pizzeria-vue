<template>
  <div class="container mt-4">
    <h1 class="text-primary fw-bold">Sucursales</h1>

    <div class="card shadow-sm">
      <div class="card-header fw-bold">Lista de Sucursales</div>
      <div class="card-body">
        <table class="table table-hover">
          <thead class="table-info">
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Dirección</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(branch, index) in branches" :key="branch.id">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ branch.name }}</td>
              <td>{{ branch.address }}</td>
              <td>
                <button @click="editBranch(branch.id)" class="btn btn-sm btn-warning mx-1">
                  <font-awesome-icon icon="pencil" />
                </button>
                <button @click="eliminar(branch.id)" class="btn btn-sm btn-outline-danger mx-1">
                  <font-awesome-icon icon="trash" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <button @click="newBranch" class="btn btn-success">
          <font-awesome-icon icon="plus" /> Nueva Sucursal
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'BranchList',
  data() {
    return {
      branches: []
    }
  },
  methods: {
    async cargarBranches() {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/branches')
        this.branches = res.data.branches
      } catch (error) {
        console.error('Error cargando sucursales:', error)
      }
    },
    async eliminar(id) {
      Swal.fire({
        title: `¿Deseas eliminar la sucursal con ID ${id}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.delete(`http://127.0.0.1:8000/api/branches/${id}`)
            Swal.fire('Eliminado', 'La sucursal ha sido eliminada.', 'success')
            this.cargarBranches()
          } catch (error) {
            console.error('Error al eliminar:', error)
            Swal.fire('Error', 'No se pudo eliminar la sucursal.', 'error')
          }
        }
      })
    },
    editBranch(id) {
      this.$router.push({ name: 'EditBranch', params: { id } })
    },
    newBranch() {
      this.$router.push({ name: 'NewBranch' })
    }
  },
  mounted() {
    this.cargarBranches()
  }
}
</script>
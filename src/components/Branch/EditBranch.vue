<template>
  <div class="container mt-4">
    <h1 class="text-warning fw-bold">Editar Sucursal</h1>

    <div class="card shadow-sm">
      <div class="card-body">
        <form @submit.prevent="actualizarSucursal">
          <div class="mb-3">
            <label for="name" class="form-label">Nombre</label>
            <input v-model="form.name" type="text" id="name" class="form-control" required>
          </div>
          <div class="mb-3">
            <label for="address" class="form-label">Dirección</label>
            <input v-model="form.address" type="text" id="address" class="form-control" required>
          </div>
          <button type="submit" class="btn btn-warning">
            <font-awesome-icon icon="save" /> Actualizar
          </button>
          <router-link to="/branches" class="btn btn-secondary mx-2">
            Cancelar
          </router-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'EditBranch',
  data() {
    return {
      form: {
        name: '',
        address: ''
      }
    }
  },
  methods: {
    async cargarSucursal() {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/branches/${this.$route.params.id}`)
        this.form = res.data.branch
      } catch (error) {
        console.error('Error cargando sucursal:', error)
        Swal.fire('Error', 'No se pudo cargar la sucursal.', 'error')
        this.$router.push('/branches')
      }
    },
    async actualizarSucursal() {
      try {
        await axios.put(`http://127.0.0.1:8000/api/branches/${this.$route.params.id}`, this.form)
        Swal.fire('Actualizado', 'Sucursal actualizada correctamente.', 'success')
        this.$router.push('/branches')
      } catch (error) {
        console.error('Error al actualizar la sucursal:', error)
        Swal.fire('Error', 'No se pudo actualizar la sucursal.', 'error')
      }
    }
  },
  mounted() {
    this.cargarSucursal()
  }
}
</script>
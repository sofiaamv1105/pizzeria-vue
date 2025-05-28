<template>
  <div class="container mt-4">
    <h1 class="text-success fw-bold">Nueva Sucursal</h1>

    <div class="card shadow-sm">
      <div class="card-body">
        <form @submit.prevent="crearSucursal">
          <div class="mb-3">
            <label for="name" class="form-label">Nombre</label>
            <input v-model="form.name" type="text" id="name" class="form-control" required>
          </div>
          <div class="mb-3">
            <label for="address" class="form-label">Dirección</label>
            <input v-model="form.address" type="text" id="address" class="form-control" required>
          </div>
          <button type="submit" class="btn btn-success">
            <font-awesome-icon icon="check" /> Guardar
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
  name: 'NewBranch',
  data() {
    return {
      form: {
        name: '',
        address: ''
      }
    }
  },
  methods: {
    async crearSucursal() {
      try {
        await axios.post('http://127.0.0.1:8000/api/branches', this.form)
        Swal.fire('Éxito', 'Sucursal creada correctamente.', 'success')
        this.$router.push('/branches')
      } catch (error) {
        console.error('Error al crear la sucursal:', error)
        Swal.fire('Error', 'No se pudo crear la sucursal.', 'error')
      }
    }
  }
}
</script>
<template>
  <div class="container mt-4">
    <h1 class="text-warning fw-bold">Editar Proveedor</h1>

    <div class="card shadow-sm">
      <div class="card-body" v-if="form">
        <form @submit.prevent="actualizar">
          <div class="mb-3">
            <label for="name" class="form-label">Nombre</label>
            <input v-model="form.name" type="text" class="form-control" id="name" required />
          </div>

          <div class="mb-3">
            <label for="contact_info" class="form-label">Información de contacto</label>
            <input v-model="form.contact_info" type="text" class="form-control" id="contact_info" />
          </div>

          <button type="submit" class="btn btn-warning">
            <font-awesome-icon icon="save" /> Actualizar
          </button>
          <button @click="$router.back()" type="button" class="btn btn-secondary ms-2">
            <font-awesome-icon icon="arrow-left" /> Volver
          </button>
        </form>
      </div>
      <div v-else class="text-center">
        <div class="spinner-border text-primary" role="status"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'EditSupplier',
  data() {
    return {
      form: null
    }
  },
  created() {
    this.cargarProveedor()
  },
  methods: {
    async cargarProveedor() {
      try {
        const { id } = this.$route.params
        const response = await axios.get(`http://127.0.0.1:8000/api/suppliers/${id}`)
        this.form = response.data.supplier
      } catch (error) {
        console.error('Error al cargar proveedor:', error)
        Swal.fire('Error', 'No se pudo cargar el proveedor.', 'error')
        this.$router.push({ name: 'SupplierList' })
      }
    },
    async actualizar() {
      try {
        const { id } = this.$route.params
        await axios.put(`http://127.0.0.1:8000/api/suppliers/${id}`, this.form)
        Swal.fire('Éxito', 'Proveedor actualizado correctamente.', 'success')
        this.$router.push({ name: 'SupplierList' })
      } catch (error) {
        console.error('Error al actualizar:', error)
        Swal.fire('Error', 'No se pudo actualizar el proveedor.', 'error')
      }
    }
  }
}
</script>
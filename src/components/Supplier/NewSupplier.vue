<template>
  <div class="container mt-4">
    <h1 class="text-success fw-bold">Nuevo Proveedor</h1>

    <div class="card shadow-sm">
      <div class="card-body">
        <form @submit.prevent="guardar">
          <div class="mb-3">
            <label for="name" class="form-label">Nombre</label>
            <input v-model="form.name" type="text" class="form-control" id="name" required />
          </div>

          <div class="mb-3">
            <label for="contact_info" class="form-label">Información de contacto</label>
            <input v-model="form.contact_info" type="text" class="form-control" id="contact_info" />
          </div>

          <button type="submit" class="btn btn-success">
            <font-awesome-icon icon="save" /> Guardar
          </button>
          <button @click="$router.back()" type="button" class="btn btn-secondary ms-2">
            <font-awesome-icon icon="arrow-left" /> Volver
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'NewSupplier',
  data() {
    return {
      form: {
        name: '',
        contact_info: ''
      }
    }
  },
  methods: {
    async guardar() {
      try {
        await axios.post('http://127.0.0.1:8000/api/suppliers', this.form)
        Swal.fire('Éxito', 'Proveedor creado correctamente.', 'success')
        this.$router.push({ name: 'SupplierList' })
      } catch (error) {
        console.error('Error al guardar:', error)
        Swal.fire('Error', 'No se pudo crear el proveedor.', 'error')
      }
    }
  }
}
</script>
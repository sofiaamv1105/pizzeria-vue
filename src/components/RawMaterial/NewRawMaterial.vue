<template>
  <div class="container mt-4">
    <h1 class="text-success fw-bold">Nueva Materia Prima</h1>

    <div class="card shadow-sm">
      <div class="card-body">
        <form @submit.prevent="guardar">
          <div class="mb-3">
            <label for="name" class="form-label">Nombre</label>
            <input v-model="form.name" type="text" class="form-control" id="name" required />
          </div>
          <div class="mb-3">
            <label for="unit" class="form-label">Unidad</label>
            <input v-model="form.unit" type="text" class="form-control" id="unit" required />
          </div>
          <div class="mb-3">
            <label for="current_stock" class="form-label">Stock Actual</label>
            <input
              v-model.number="form.current_stock"
              type="number"
              class="form-control"
              id="current_stock"
              required
              min="0"
            />
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
  name: 'NewRawMaterial',
  data() {
    return {
      form: {
        name: '',
        unit: '',
        current_stock: 0
      }
    }
  },
  methods: {
    async guardar() {
      try {
        await axios.post('http://127.0.0.1:8000/api/raw-materials', this.form)
        Swal.fire('Éxito', 'Materia prima creada correctamente.', 'success')
        this.$router.push({ name: 'RawMaterialList' })
      } catch (error) {
        console.error('Error al guardar:', error)
        Swal.fire('Error', 'No se pudo crear la materia prima.', 'error')
      }
    }
  }
}
</script>
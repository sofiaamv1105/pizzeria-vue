<template>
  <div class="container mt-4">
    <h1 class="text-warning fw-bold">Editar Materia Prima</h1>

    <div class="card shadow-sm" v-if="form">
      <div class="card-body">
        <form @submit.prevent="actualizar">
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
            <input v-model.number="form.current_stock" type="number" class="form-control" id="current_stock" required min="0" />
          </div>

          <button type="submit" class="btn btn-warning">
            <font-awesome-icon icon="save" /> Actualizar
          </button>
          <button @click="$router.back()" type="button" class="btn btn-secondary ms-2">
            <font-awesome-icon icon="arrow-left" /> Volver
          </button>
        </form>
      </div>
    </div>

    <div v-else class="alert alert-info">Cargando datos...</div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'EditRawMaterial',
  data() {
    return {
      form: null
    }
  },
  methods: {
    async cargarDatos() {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/raw-materials/${this.$route.params.id}`)
        this.form = res.data.rawMaterial
      } catch (error) {
        console.error('Error al cargar:', error)
        Swal.fire('Error', 'No se pudo cargar la materia prima.', 'error')
      }
    },
    async actualizar() {
      try {
        await axios.put(`http://127.0.0.1:8000/api/raw-materials/${this.$route.params.id}`, this.form)
        Swal.fire('Actualizado', 'Materia prima actualizada correctamente.', 'success')
        this.$router.push({ name: 'RawMaterialList' })
      } catch (error) {
        console.error('Error al actualizar:', error)
        Swal.fire('Error', 'No se pudo actualizar la materia prima.', 'error')
      }
    }
  },
  mounted() {
    this.cargarDatos()
  }
}
</script>
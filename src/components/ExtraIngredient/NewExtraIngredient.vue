<template>
  <div class="container mt-4">
    <h2 class="text-success fw-bold">Nuevo Ingrediente Extra</h2>

    <div class="card shadow-sm mt-3">
      <div class="card-body">
        <form @submit.prevent="guardarIngredienteExtra">
          <div class="mb-3">
            <label for="name" class="form-label">Nombre</label>
            <input v-model="extra.name" type="text" class="form-control" id="name" required />
          </div>
          <div class="mb-3">
            <label for="price" class="form-label">Precio</label>
            <input v-model.number="extra.price" type="number" class="form-control" id="price" min="0" step="0.01" required />
          </div>
          <button type="submit" class="btn btn-success">
            <font-awesome-icon icon="save" /> Guardar
          </button>
          <router-link to="/extra-ingredients" class="btn btn-secondary ms-2">Cancelar</router-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'NewExtraIngredient',
  data() {
    return {
      extra: {
        name: '',
        price: null
      }
    }
  },
  methods: {
    async guardarIngredienteExtra() {
      try {
        await axios.post('http://127.0.0.1:8000/api/extra_ingredients', this.extra)
        Swal.fire('Éxito', 'Ingrediente extra creado correctamente', 'success')
        this.$router.push('/extra-ingredients')
      } catch (error) {
        console.error('Error al crear:', error)
        Swal.fire('Error', 'No se pudo crear el ingrediente extra', 'error')
      }
    }
  }
}
</script>
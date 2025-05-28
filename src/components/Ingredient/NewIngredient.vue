<template>
  <div class="container mt-4">
    <h2 class="text-success fw-bold">Nuevo Ingrediente</h2>
    <div class="card shadow-sm">
      <div class="card-body">
        <form @submit.prevent="guardar">
          <div class="mb-3">
            <label for="name" class="form-label">Nombre del Ingrediente</label>
            <input v-model="form.name" type="text" class="form-control" id="name" required>
          </div>
          <button type="submit" class="btn btn-success">
            <font-awesome-icon icon="save" /> Guardar
          </button>
          <router-link :to="{ name: 'IngredientList' }" class="btn btn-secondary ms-2">
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
  name: 'NewIngredient',
  data() {
    return {
      form: {
        name: ''
      }
    }
  },
  methods: {
    async guardar() {
      try {
        await axios.post('http://127.0.0.1:8000/api/ingredients', this.form)
        Swal.fire('Éxito', 'Ingrediente creado correctamente.', 'success')
        this.$router.push({ name: 'IngredientList' })
      } catch (error) {
        console.error('Error al guardar:', error)
        Swal.fire('Error', 'No se pudo crear el ingrediente.', 'error')
      }
    }
  }
}
</script>
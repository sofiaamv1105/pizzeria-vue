<template>
  <div class="container mt-4">
    <h2 class="text-warning fw-bold">Editar Ingrediente</h2>
    <div class="card shadow-sm">
      <div class="card-body">
        <form @submit.prevent="actualizar">
          <div class="mb-3">
            <label for="name" class="form-label">Nombre del Ingrediente</label>
            <input v-model="form.name" type="text" class="form-control" id="name" required>
          </div>
          <button type="submit" class="btn btn-warning">
            <font-awesome-icon icon="save" /> Actualizar
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
  name: 'EditIngredient',
  data() {
    return {
      form: {
        name: ''
      }
    }
  },
  methods: {
    async cargar() {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/ingredients/${this.$route.params.id}`)
        this.form.name = res.data.ingredient.name
      } catch (error) {
        console.error('Error al cargar ingrediente:', error)
        Swal.fire('Error', 'No se pudo cargar el ingrediente.', 'error')
      }
    },
    async actualizar() {
      try {
        await axios.put(`http://127.0.0.1:8000/api/ingredients/${this.$route.params.id}`, this.form)
        Swal.fire('Éxito', 'Ingrediente actualizado correctamente.', 'success')
        this.$router.push({ name: 'IngredientList' })
      } catch (error) {
        console.error('Error al actualizar:', error)
        Swal.fire('Error', 'No se pudo actualizar el ingrediente.', 'error')
      }
    }
  },
  mounted() {
    this.cargar()
  }
}
</script>
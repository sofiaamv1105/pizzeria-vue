<template>
  <div class="container mt-4">
    <h2 class="text-success fw-bold">Editar Ingrediente Extra</h2>

    <div class="card shadow-sm mt-3">
      <div class="card-body" v-if="extra">
        <form @submit.prevent="actualizarIngredienteExtra">
          <div class="mb-3">
            <label for="name" class="form-label">Nombre</label>
            <input v-model="extra.name" type="text" class="form-control" id="name" required />
          </div>
          <div class="mb-3">
            <label for="price" class="form-label">Precio</label>
            <input v-model.number="extra.price" type="number" class="form-control" id="price" min="0" step="0.01" required />
          </div>
          <button type="submit" class="btn btn-warning">
            <font-awesome-icon icon="save" /> Actualizar
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
  name: 'EditExtraIngredient',
  data() {
    return {
      extra: null
    }
  },
  methods: {
    async cargarIngredienteExtra() {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/extra_ingredients/${this.$route.params.id}`)
        this.extra = res.data.extra_ingredient
      } catch (error) {
        console.error('Error al cargar:', error)
        Swal.fire('Error', 'No se pudo cargar el ingrediente extra', 'error')
        this.$router.push('/extra-ingredients')
      }
    },
    async actualizarIngredienteExtra() {
      try {
        await axios.put(`http://127.0.0.1:8000/api/extra_ingredients/${this.$route.params.id}`, this.extra)
        Swal.fire('Éxito', 'Ingrediente extra actualizado correctamente', 'success')
        this.$router.push('/extra-ingredients')
      } catch (error) {
        console.error('Error al actualizar:', error)
        Swal.fire('Error', 'No se pudo actualizar el ingrediente extra', 'error')
      }
    }
  },
  mounted() {
    this.cargarIngredienteExtra()
  }
}
</script>
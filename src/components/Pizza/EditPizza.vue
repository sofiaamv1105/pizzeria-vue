<template>
  <div class="container mt-4">
    <h1 class="text-warning fw-bold">Editar Pizza</h1>

    <div class="card shadow-sm">
      <div class="card-header fw-bold">Formulario de Pizza</div>
      <div class="card-body">
        <form @submit.prevent="actualizarPizza">
          <div class="mb-3">
            <label for="name" class="form-label">Nombre de la Pizza</label>
            <input
              v-model="pizza.name"
              type="text"
              class="form-control"
              id="name"
              required
            />
          </div>

          <button type="submit" class="btn btn-warning">
            <font-awesome-icon icon="save" /> Actualizar
          </button>
          <button @click.prevent="$router.push({ name: 'PizzaList' })" class="btn btn-secondary ms-2">
            <font-awesome-icon icon="arrow-left" /> Cancelar
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
  name: 'EditPizza',
  data() {
    return {
      pizza: {
        name: ''
      }
    }
  },
  mounted() {
    this.cargarPizza()
  },
  methods: {
    async cargarPizza() {
      const id = this.$route.params.id
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/pizzas/${id}`)
        this.pizza = res.data.pizza
      } catch (error) {
        console.error('Error al cargar pizza:', error)
        Swal.fire('Error', 'No se pudo cargar la pizza', 'error')
      }
    },
    async actualizarPizza() {
      const id = this.$route.params.id
      try {
        await axios.put(`http://127.0.0.1:8000/api/pizzas/${id}`, this.pizza)
        Swal.fire('Actualizada', 'Pizza actualizada con éxito', 'success')
        this.$router.push({ name: 'PizzaList' })
      } catch (error) {
        console.error('Error al actualizar pizza:', error)
        Swal.fire('Error', 'No se pudo actualizar la pizza', 'error')
      }
    }
  }
}
</script>
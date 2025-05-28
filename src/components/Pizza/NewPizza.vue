<template>
  <div class="container mt-4">
    <h1 class="text-success fw-bold">Nueva Pizza</h1>

    <div class="card shadow-sm">
      <div class="card-header fw-bold">Formulario de Pizza</div>
      <div class="card-body">
        <form @submit.prevent="crearPizza">
          <div class="mb-3">
            <label for="name" class="form-label">Nombre de la Pizza</label>
            <input
              v-model="pizza.name"
              type="text"
              class="form-control"
              id="name"
              placeholder="Ej: Margarita"
              required
            />
          </div>

          <button type="submit" class="btn btn-success">
            <font-awesome-icon icon="check" /> Guardar
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
  name: 'NewPizza',
  data() {
    return {
      pizza: {
        name: ''
      }
    }
  },
  methods: {
    async crearPizza() {
      try {
        await axios.post('http://127.0.0.1:8000/api/pizzas', this.pizza)
        Swal.fire('Creada', 'Pizza registrada con éxito', 'success')
        this.$router.push({ name: 'PizzaList' }) // Usa ruta correcta
      } catch (error) {
        console.error('Error al crear pizza:', error)
        Swal.fire('Error', 'No se pudo crear la pizza', 'error')
      }
    }
  }
}
</script>
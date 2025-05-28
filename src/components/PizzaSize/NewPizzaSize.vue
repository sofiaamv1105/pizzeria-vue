<template>
  <div class="container mt-4">
    <h1 class="text-success fw-bold">Nuevo Tamaño de Pizza</h1>

    <div class="card shadow-sm">
      <div class="card-body">
        <form @submit.prevent="crearPizzaSize">
          <div class="mb-3">
            <label for="pizza_id" class="form-label">Pizza</label>
            <select v-model="pizzaSize.pizza_id" class="form-select" id="pizza_id" required>
              <option value="" disabled>Selecciona una pizza</option>
              <option v-for="pizza in pizzas" :key="pizza.id" :value="pizza.id">
                {{ pizza.name }}
              </option>
            </select>
          </div>

          <div class="mb-3">
            <label for="size" class="form-label">Tamaño</label>
            <select v-model="pizzaSize.size" class="form-select" id="size" required>
              <option value="" disabled>Selecciona un tamaño</option>
              <option value="pequeña">Pequeña</option>
              <option value="mediana">Mediana</option>
              <option value="grande">Grande</option>
            </select>
          </div>

          <div class="mb-3">
            <label for="price" class="form-label">Precio</label>
            <input v-model.number="pizzaSize.price" type="number" step="0.01" min="0" class="form-control" id="price" required />
          </div>

          <button type="submit" class="btn btn-success">
            <font-awesome-icon icon="save" /> Guardar
          </button>
          <button @click.prevent="$router.back()" class="btn btn-secondary ms-2">
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
  name: 'NewPizzaSize',
  data() {
    return {
      pizzaSize: {
        pizza_id: '',
        size: '',
        price: null,
      },
      pizzas: []
    }
  },
  methods: {
    async cargarPizzas() {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/pizzas')
        this.pizzas = res.data.pizzas
      } catch (error) {
        console.error('Error cargando pizzas:', error)
      }
    },
    async crearPizzaSize() {
      try {
        await axios.post('http://127.0.0.1:8000/api/pizza-sizes', this.pizzaSize)
        Swal.fire('Creado', 'Tamaño creado con éxito', 'success')
        this.$router.push({ name: 'PizzaSizeList' })
      } catch (error) {
        console.error('Error creando tamaño:', error)
        Swal.fire('Error', 'No se pudo crear el tamaño', 'error')
      }
    }
  },
  mounted() {
    this.cargarPizzas()
  }
}
</script>
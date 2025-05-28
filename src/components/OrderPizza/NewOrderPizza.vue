<template>
  <div class="container mt-4">
    <h1 class="text-success fw-bold">Nueva Relación Pizza - Pedido</h1>

    <div class="card shadow-sm">
      <div class="card-header fw-bold">Crear Registro</div>
      <div class="card-body">
        <form @submit.prevent="guardarOrderPizza">
          <div class="mb-3">
            <label for="order_id" class="form-label">Pedido</label>
            <select v-model="order_id" id="order_id" class="form-select" required>
              <option value="" disabled>Selecciona un pedido</option>
              <option v-for="order in orders" :key="order.id" :value="order.id">
                {{ order.id }} - {{ order.status }}
              </option>
            </select>
          </div>

          <div class="mb-3">
            <label for="pizza_size_id" class="form-label">Tamaño de Pizza</label>
            <select v-model="pizza_size_id" id="pizza_size_id" class="form-select" required>
              <option value="" disabled>Selecciona un tamaño</option>
              <option v-for="size in pizzaSizes" :key="size.id" :value="size.id">
                {{ size.pizza.name }} - {{ size.size }} (Precio: {{ size.price }})
              </option>
            </select>
          </div>

          <div class="mb-3">
            <label for="quantity" class="form-label">Cantidad</label>
            <input
              type="number"
              id="quantity"
              v-model.number="quantity"
              class="form-control"
              min="1"
              required
            />
          </div>

          <button type="submit" class="btn btn-success">
            <font-awesome-icon icon="check" /> Guardar
          </button>
          <button @click="cancelar" type="button" class="btn btn-secondary ms-2">
            Cancelar
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
  name: 'NewOrderPizza',
  data() {
    return {
      order_id: '',
      pizza_size_id: '',
      quantity: 1,
      orders: [],
      pizzaSizes: [],
    }
  },
  methods: {
    async cargarDatos() {
      try {
        const ordersRes = await axios.get('http://127.0.0.1:8000/api/orders')
        this.orders = ordersRes.data.orders

        const sizesRes = await axios.get('http://127.0.0.1:8000/api/pizza-sizes')
        this.pizzaSizes = sizesRes.data.pizza_sizes
      } catch (error) {
        console.error('Error cargando datos:', error)
      }
    },
    async guardarOrderPizza() {
      try {
        await axios.post('http://127.0.0.1:8000/api/order_pizzas', {
          order_id: this.order_id,
          pizza_size_id: this.pizza_size_id,
          quantity: this.quantity,
        })
        Swal.fire('Creado', 'Relación creada correctamente', 'success')
        this.$router.push({ name: 'OrderPizzaList' })
      } catch (error) {
        console.error('Error al guardar:', error)
        Swal.fire('Error', 'No se pudo crear el registro', 'error')
      }
    },
    cancelar() {
      this.$router.push({ name: 'OrderPizzaList' })
    }
  },
  mounted() {
    this.cargarDatos()
  }
}
</script>
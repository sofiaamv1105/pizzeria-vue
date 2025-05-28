<template>
  <div class="container mt-4">
    <h1 class="text-success fw-bold">Editar Relación Pizza - Pedido</h1>

    <div class="card shadow-sm">
      <div class="card-header fw-bold">Editar Registro</div>
      <div class="card-body" v-if="loaded">
        <form @submit.prevent="actualizarOrderPizza">
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
            <font-awesome-icon icon="check" /> Actualizar
          </button>
          <button @click="cancelar" type="button" class="btn btn-secondary ms-2">
            Cancelar
          </button>
        </form>
      </div>

      <div v-else class="text-center p-3">
        <div class="spinner-border text-success" role="status">
          <span class="visually-hidden">Cargando...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'EditOrderPizza',
  data() {
    return {
      order_id: '',
      pizza_size_id: '',
      quantity: 1,
      orders: [],
      pizzaSizes: [],
      loaded: false,
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
    async cargarOrderPizza() {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/order_pizzas/${this.$route.params.id}`)
        const orderPizza = res.data.order_pizza
        this.order_id = orderPizza.order_id
        this.pizza_size_id = orderPizza.pizza_size_id
        this.quantity = orderPizza.quantity
        this.loaded = true
      } catch (error) {
        console.error('Error cargando el registro:', error)
        Swal.fire('Error', 'No se pudo cargar el registro', 'error')
        this.$router.push({ name: 'OrderPizzaList' })
      }
    },
    async actualizarOrderPizza() {
      try {
        await axios.put(`http://127.0.0.1:8000/api/order_pizzas/${this.$route.params.id}`, {
          order_id: this.order_id,
          pizza_size_id: this.pizza_size_id,
          quantity: this.quantity,
        })
        Swal.fire('Actualizado', 'Registro actualizado correctamente', 'success')
        this.$router.push({ name: 'OrderPizzaList' })
      } catch (error) {
        console.error('Error al actualizar:', error)
        Swal.fire('Error', 'No se pudo actualizar el registro', 'error')
      }
    },
    cancelar() {
      this.$router.push({ name: 'OrderPizzaList' })
    }
  },
  async mounted() {
    await this.cargarDatos()
    await this.cargarOrderPizza()
  }
}
</script>
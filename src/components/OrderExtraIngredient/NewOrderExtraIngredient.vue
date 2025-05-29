<template>
  <div class="container mt-4">
    <h2 class="fw-bold text-success">Nuevo Ingrediente Extra por Pedido</h2>

    <div class="card shadow-sm">
      <div class="card-body">
        <form @submit.prevent="store">
          <div class="mb-3">
            <label for="order_id" class="form-label">Pedido</label>
            <select v-model="form.order_id" id="order_id" class="form-select" required>
              <option value="" disabled>Seleccione un pedido</option>
              <option v-for="order in orders" :key="order.id" :value="order.id">
                Pedido #{{ order.id }}
              </option>
            </select>
          </div>

          <div class="mb-3">
            <label for="extra_ingredient_id" class="form-label">Ingrediente Extra</label>
            <select v-model="form.extra_ingredient_id" id="extra_ingredient_id" class="form-select" required>
              <option value="" disabled>Seleccione un ingrediente</option>
              <option v-for="extra in extras" :key="extra.id" :value="extra.id">
                {{ extra.name }}
              </option>
            </select>
          </div>

          <div class="mb-3">
            <label for="quantity" class="form-label">Cantidad</label>
            <input type="number" v-model="form.quantity" class="form-control" id="quantity" min="1" required />
          </div>

          <button type="submit" class="btn btn-success">
            <font-awesome-icon icon="check" /> Guardar
          </button>
          <router-link to="/order-extra-ingredients" class="btn btn-outline-secondary ms-2">
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
  name: 'NewOrderExtraIngredient',
  data() {
    return {
      form: {
        order_id: '',
        extra_ingredient_id: '',
        quantity: 1
      },
      orders: [],
      extras: []
    }
  },
  methods: {
    async store() {
      try {
        await axios.post('http://127.0.0.1:8000/api/order_extra_ingredients', this.form)
        Swal.fire('¡Éxito!', 'Registro creado correctamente.', 'success')
        this.$router.push('/order-extra-ingredients')
      } catch (error) {
        console.error(error)
        Swal.fire('Error', 'No se pudo guardar el registro.', 'error')
      }
    },
    async fetchData() {
      const [ordersRes, extrasRes] = await Promise.all([
        axios.get('http://127.0.0.1:8000/api/orders'),
        axios.get('http://127.0.0.1:8000/api/extra_ingredients')
      ])
      this.orders = ordersRes.data.orders
      this.extras = extrasRes.data.extra_ingredients
    }
  },
  mounted() {
    this.fetchData()
  }
}
</script>
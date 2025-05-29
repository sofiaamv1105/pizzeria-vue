<template>
  <div class="container mt-4">
    <h2 class="fw-bold text-primary">Editar Ingrediente Extra por Pedido</h2>

    <div class="card shadow-sm">
      <div class="card-body">
        <form @submit.prevent="update">
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

          <button type="submit" class="btn btn-primary">
            <font-awesome-icon icon="save" /> Actualizar
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
  name: 'EditOrderExtraIngredient',
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
    async fetchData() {
      const [recordRes, ordersRes, extrasRes] = await Promise.all([
        axios.get(`http://127.0.0.1:8000/api/order_extra_ingredients/${this.$route.params.id}`),
        axios.get('http://127.0.0.1:8000/api/orders'),
        axios.get('http://127.0.0.1:8000/api/extra_ingredients')
      ])

      this.form = {
        order_id: recordRes.data.order_extra_ingredient.order_id,
        extra_ingredient_id: recordRes.data.order_extra_ingredient.extra_ingredient_id,
        quantity: recordRes.data.order_extra_ingredient.quantity
      }
      this.orders = ordersRes.data.orders
      this.extras = extrasRes.data.extra_ingredients
    },
    async update() {
      try {
        await axios.put(`http://127.0.0.1:8000/api/order_extra_ingredients/${this.$route.params.id}`, this.form)
        Swal.fire('¡Actualizado!', 'Registro actualizado correctamente.', 'success')
        this.$router.push('/order-extra-ingredients')
      } catch (error) {
        console.error(error)
        Swal.fire('Error', 'No se pudo actualizar el registro.', 'error')
      }
    }
  },
  mounted() {
    this.fetchData()
  }
}
</script>
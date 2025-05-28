<template>
  <div class="container mt-4">
    <h1 class="text-warning fw-bold">Editar Pedido</h1>

    <div class="card shadow-sm">
      <div class="card-body">
        <form @submit.prevent="actualizarPedido">
          <div class="mb-3">
            <label for="client_id" class="form-label">Cliente</label>
            <select v-model="order.client_id" id="client_id" class="form-select" required>
              <option v-for="client in clients" :key="client.id" :value="client.id">
                {{ client.user.name }} ({{ client.user.email }})
              </option>
            </select>
          </div>

          <div class="mb-3">
            <label for="branch_id" class="form-label">Sucursal</label>
            <select v-model="order.branch_id" id="branch_id" class="form-select" required>
              <option v-for="branch in branches" :key="branch.id" :value="branch.id">
                {{ branch.name }}
              </option>
            </select>
          </div>

          <div class="mb-3">
            <label for="delivery_person_id" class="form-label">Repartidor (opcional)</label>
            <select v-model="order.delivery_person_id" id="delivery_person_id" class="form-select">
              <option value="">-- Ninguno --</option>
              <option v-for="employee in employees" :key="employee.id" :value="employee.id">
                {{ employee.user.name }} ({{ employee.position }})
              </option>
            </select>
          </div>

          <div class="mb-3">
            <label for="total_price" class="form-label">Precio Total</label>
            <input type="number" class="form-control" v-model="order.total_price" min="0" step="0.01" required />
          </div>

          <div class="mb-3">
            <label for="status" class="form-label">Estado</label>
            <select v-model="order.status" id="status" class="form-select" required>
              <option value="pendiente">Pendiente</option>
              <option value="en_preparacion">En preparación</option>
              <option value="listo">Listo</option>
              <option value="entregado">Entregado</option>
            </select>
          </div>

          <div class="mb-3">
            <label for="delivery_type" class="form-label">Tipo de Entrega</label>
            <select v-model="order.delivery_type" id="delivery_type" class="form-select" required>
              <option value="en_local">En local</option>
              <option value="a_domicilio">A domicilio</option>
            </select>
          </div>

          <button type="submit" class="btn btn-primary">Actualizar</button>
          <router-link to="/orders" class="btn btn-secondary ms-2">Cancelar</router-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'EditOrder',
  data() {
    return {
      order: {
        client_id: '',
        branch_id: '',
        delivery_person_id: '',
        total_price: '',
        status: 'pendiente',
        delivery_type: 'en_local',
      },
      clients: [],
      branches: [],
      employees: [],
    }
  },
  methods: {
    async cargarDatos() {
      const id = this.$route.params.id
      try {
        const [orderRes, clientsRes, branchesRes, employeesRes] = await Promise.all([
          axios.get(`http://127.0.0.1:8000/api/orders/${id}`),
          axios.get('http://127.0.0.1:8000/api/clients'),
          axios.get('http://127.0.0.1:8000/api/branches'),
          axios.get('http://127.0.0.1:8000/api/employees'),
        ])

        this.order = orderRes.data.order
        this.clients = clientsRes.data.clients
        this.branches = branchesRes.data.branches
        this.employees = employeesRes.data.employees
      } catch (error) {
        console.error('Error cargando datos:', error)
        Swal.fire('Error', 'No se pudieron cargar los datos.', 'error')
      }
    },
    async actualizarPedido() {
      try {
        await axios.put(`http://127.0.0.1:8000/api/orders/${this.$route.params.id}`, this.order)
        Swal.fire('Actualizado', 'El pedido fue actualizado correctamente.', 'success')
        this.$router.push({ name: 'OrderList' })
      } catch (error) {
        console.error('Error al actualizar pedido:', error)
        Swal.fire('Error', 'No se pudo actualizar el pedido.', 'error')
      }
    }
  },
  mounted() {
    this.cargarDatos()
  }
}
</script>
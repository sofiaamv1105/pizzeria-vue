// NewOrder.vue
<template>
  <div class="container mt-4">
    <h1 class="text-success fw-bold">Nuevo Pedido</h1>

    <div class="card shadow">
      <div class="card-body">
        <form @submit.prevent="crearPedido">
          <div class="mb-3">
            <label class="form-label">Cliente</label>
            <select v-model="form.client_id" class="form-select" required>
              <option v-for="client in clients" :key="client.id" :value="client.id">
                {{ client.user.name }}
              </option>
            </select>
          </div>

          <div class="mb-3">
            <label class="form-label">Sucursal</label>
            <select v-model="form.branch_id" class="form-select" required>
              <option v-for="branch in branches" :key="branch.id" :value="branch.id">
                {{ branch.name }}
              </option>
            </select>
          </div>

          <div class="mb-3">
            <label class="form-label">Tipo de Entrega</label>
            <select v-model="form.delivery_type" class="form-select" required>
              <option value="en_local">En local</option>
              <option value="a_domicilio">A domicilio</option>
            </select>
          </div>

          <div class="mb-3">
            <label class="form-label">Repartidor (opcional)</label>
            <select v-model="form.delivery_person_id" class="form-select">
              <option value="">-- No asignado --</option>
              <option v-for="employee in employees" :key="employee.id" :value="employee.id">
                {{ employee.user.name }}
              </option>
            </select>
          </div>

          <div class="mb-3">
            <label class="form-label">Total</label>
            <input v-model.number="form.total_price" type="number" min="0" step="0.01" class="form-control" required />
          </div>

          <div class="mb-3">
            <label class="form-label">Estado</label>
            <select v-model="form.status" class="form-select" required>
              <option value="pendiente">Pendiente</option>
              <option value="en_preparacion">En preparación</option>
              <option value="listo">Listo</option>
              <option value="entregado">Entregado</option>
            </select>
          </div>

          <button type="submit" class="btn btn-primary">Guardar</button>
          <router-link :to="{ name: 'OrderList' }" class="btn btn-secondary ms-2">Cancelar</router-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'NewOrder',
  data() {
    return {
      form: {
        client_id: '',
        branch_id: '',
        delivery_type: '',
        delivery_person_id: '',
        total_price: '',
        status: 'pendiente'
      },
      clients: [],
      branches: [],
      employees: []
    }
  },
  methods: {
    async crearPedido() {
      try {
        await axios.post('http://127.0.0.1:8000/api/orders', this.form)
        Swal.fire('Éxito', 'Pedido creado correctamente.', 'success')
        this.$router.push({ name: 'OrderList' })
      } catch (error) {
        console.error('Error al crear pedido:', error)
        Swal.fire('Error', 'No se pudo crear el pedido.', 'error')
      }
    },
    async cargarDatos() {
      const [clientRes, branchRes, employeeRes] = await Promise.all([
        axios.get('http://127.0.0.1:8000/api/clients'),
        axios.get('http://127.0.0.1:8000/api/branches'),
        axios.get('http://127.0.0.1:8000/api/employees')
      ])
      this.clients = clientRes.data.clients
      this.branches = branchRes.data.branches
      this.employees = employeeRes.data.employees
    }
  },
  mounted() {
    this.cargarDatos()
  }
}
</script>
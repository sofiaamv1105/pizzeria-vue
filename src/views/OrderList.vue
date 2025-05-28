<template>
  <div class="container mt-4">
    <h1 class="text-primary fw-bold">Pedidos</h1>

    <div class="card shadow-sm">
      <div class="card-header fw-bold">Lista de Pedidos</div>
      <div class="card-body">
        <table class="table table-hover">
          <thead class="table-info">
            <tr>
              <th>#</th>
              <th>Cliente</th>
              <th>Sucursal</th>
              <th>Tipo Entrega</th>
              <th>Repartidor</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(order, index) in orders" :key="order.id">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ order.client?.user?.name || '-' }}</td>
              <td>{{ order.branch?.name || '-' }}</td>
              <td>{{ order.delivery_type.replace('_', ' ') }}</td>
              <td>{{ order.delivery_person?.user?.name || 'No asignado' }}</td>
              <td>{{ Number(order.total_price).toFixed(2) }}</td>
              <td class="text-capitalize">{{ order.status.replace('_', ' ') }}</td>
              <td>
                <button @click="editOrder(order.id)" class="btn btn-sm btn-warning mx-1">
                  <font-awesome-icon icon="pencil" />
                </button>
                <button @click="eliminar(order.id)" class="btn btn-sm btn-outline-danger mx-1">
                  <font-awesome-icon icon="trash" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <button @click="newOrder" class="btn btn-success">
          <font-awesome-icon icon="plus" /> Nuevo Pedido
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'OrderList',
  data() {
    return {
      orders: []
    }
  },
  methods: {
    async cargarOrders() {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/orders')
        this.orders = res.data.orders
      } catch (error) {
        console.error('Error cargando pedidos:', error)
      }
    },
    async eliminar(id) {
      Swal.fire({
        title: `¿Deseas eliminar el pedido con ID ${id}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.delete(`http://127.0.0.1:8000/api/orders/${id}`)
            Swal.fire('Eliminado', 'El pedido ha sido eliminado.', 'success')
            this.cargarOrders()
          } catch (error) {
            console.error('Error al eliminar pedido:', error)
            Swal.fire('Error', 'No se pudo eliminar el pedido.', 'error')
          }
        }
      })
    },
    editOrder(id) {
      this.$router.push({ name: 'EditOrder', params: { id } })
    },
    newOrder() {
      this.$router.push({ name: 'NewOrder' })
    }
  },
  mounted() {
    this.cargarOrders()
  }
}
</script>
<template>
  <div class="container mt-4">
    <h1 class="text-success fw-bold">Pizzas por Pedido</h1>

    <div class="card shadow-sm">
      <div class="card-header fw-bold">Lista de Pizzas por Pedido</div>
      <div class="card-body">
        <table class="table table-hover">
          <thead class="table-success">
            <tr>
              <th>#</th>
              <th>Pedido</th>
              <th>Tamaño de Pizza</th>
              <th>Cantidad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in orderPizzas" :key="item.id">
              <td>{{ index + 1 }}</td>
              <td>{{ item.order?.id }}</td>
              <td>{{ item.pizza_size?.size }}</td>
              <td>{{ item.quantity }}</td>
              <td>
                <button @click="editOrderPizza(item.id)" class="btn btn-sm btn-warning mx-1">
                  <font-awesome-icon icon="pencil" />
                </button>
                <button @click="eliminar(item.id)" class="btn btn-sm btn-outline-danger mx-1">
                  <font-awesome-icon icon="trash" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <button @click="newOrderPizza" class="btn btn-success">
          <font-awesome-icon icon="plus" /> Nueva Relación
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'OrderPizzaList',
  data() {
    return {
      orderPizzas: []
    }
  },
  methods: {
    async cargarOrderPizzas() {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/order_pizzas')
        this.orderPizzas = res.data.order_pizzas
      } catch (error) {
        console.error('Error al cargar registros:', error)
      }
    },
    async eliminar(id) {
      Swal.fire({
        title: `¿Eliminar el registro con ID ${id}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
      }).then(async result => {
        if (result.isConfirmed) {
          try {
            await axios.delete(`http://127.0.0.1:8000/api/order_pizzas/${id}`)
            Swal.fire('Eliminado', 'Registro eliminado correctamente.', 'success')
            this.cargarOrderPizzas()
          } catch (error) {
            console.error('Error al eliminar:', error)
            Swal.fire('Error', 'No se pudo eliminar el registro.', 'error')
          }
        }
      })
    },
    editOrderPizza(id) {
      this.$router.push({ name: 'EditOrderPizza', params: { id } })
    },
    newOrderPizza() {
      this.$router.push({ name: 'NewOrderPizza' })
    }
  },
  mounted() {
    this.cargarOrderPizzas()
  }
}
</script>
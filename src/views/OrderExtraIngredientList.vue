<template>
  <div class="container mt-4">
    <h1 class="text-success fw-bold">Ingredientes Extra por Pedido</h1>

    <div class="card shadow-sm">
      <div class="card-header fw-bold">Lista</div>
      <div class="card-body">
        <table class="table table-hover">
          <thead class="table-success">
            <tr>
              <th>#</th>
              <th>Pedido</th>
              <th>Ingrediente Extra</th>
              <th>Cantidad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in items" :key="item.id">
              <th scope="row">{{ index + 1 }}</th>
              <td>#{{ item.order.id }}</td>
              <td>{{ item.extra_ingredient.name }}</td>
              <td>{{ item.quantity }}</td>
              <td>
                <button @click="edit(item.id)" class="btn btn-sm btn-warning mx-1">
                  <font-awesome-icon icon="pencil" />
                </button>
                <button @click="remove(item.id)" class="btn btn-sm btn-outline-danger mx-1">
                  <font-awesome-icon icon="trash" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <button @click="createNew" class="btn btn-success">
          <font-awesome-icon icon="plus" /> Nuevo Registro
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'OrderExtraIngredientList',
  data() {
    return {
      items: []
    }
  },
  methods: {
    async fetchData() {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/order_extra_ingredients')
        this.items = res.data.order_extra_ingredients
      } catch (error) {
        console.error('Error al cargar datos:', error)
      }
    },
    edit(id) {
      this.$router.push({ name: 'EditOrderExtraIngredient', params: { id } })
    },
    createNew() {
      this.$router.push({ name: 'NewOrderExtraIngredient' })
    },
    async remove(id) {
      const result = await Swal.fire({
        title: `¿Deseas eliminar el registro con ID ${id}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
      })

      if (result.isConfirmed) {
        try {
          await axios.delete(`http://127.0.0.1:8000/api/order_extra_ingredients/${id}`)
          Swal.fire('Eliminado', 'Registro eliminado correctamente.', 'success')
          this.fetchData()
        } catch (error) {
          console.error('Error al eliminar:', error)
          Swal.fire('Error', 'No se pudo eliminar el registro.', 'error')
        }
      }
    }
  },
  mounted() {
    this.fetchData()
  }
}
</script>
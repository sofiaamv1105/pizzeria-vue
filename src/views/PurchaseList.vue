<template>
  <div class="container mt-4">
    <h1 class="text-primary fw-bold">Compras</h1>

    <div class="card shadow-sm">
      <div class="card-header fw-bold">Lista de Compras</div>
      <div class="card-body">
        <table class="table table-hover">
          <thead class="table-info">
            <tr>
              <th>#</th>
              <th>Proveedor</th>
              <th>Materia Prima</th>
              <th>Cantidad</th>
              <th>Precio de Compra</th>
              <th>Fecha de Compra</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(purchase, index) in purchases" :key="purchase.id">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ purchase.supplier.name }}</td>
              <td>{{ purchase.raw_material.name }}</td>
              <td>{{ purchase.quantity }}</td>
              <td>{{ purchase.purchase_price }}</td>
              <td>{{ purchase.purchase_date }}</td>
              <td>
                <button @click="editPurchase(purchase.id)" class="btn btn-sm btn-warning mx-1">
                  <font-awesome-icon icon="pencil" />
                </button>
                <button @click="eliminar(purchase.id)" class="btn btn-sm btn-outline-danger mx-1">
                  <font-awesome-icon icon="trash" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <button @click="newPurchase" class="btn btn-success">
          <font-awesome-icon icon="plus" /> Nueva Compra
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'PurchaseList',
  data() {
    return {
      purchases: []
    }
  },
  methods: {
    async cargarPurchases() {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/purchases')
        this.purchases = res.data.purchases
      } catch (error) {
        console.error('Error cargando compras:', error)
      }
    },
    async eliminar(id) {
      Swal.fire({
        title: `¿Deseas eliminar la compra con ID ${id}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.delete(`http://127.0.0.1:8000/api/purchases/${id}`)
            Swal.fire('Eliminado', 'La compra ha sido eliminada.', 'success')
            this.cargarPurchases()
          } catch (error) {
            console.error('Error al eliminar:', error)
            Swal.fire('Error', 'No se pudo eliminar la compra.', 'error')
          }
        }
      })
    },
    editPurchase(id) {
      this.$router.push({ name: 'EditPurchase', params: { id } })
    },
    newPurchase() {
      this.$router.push({ name: 'NewPurchase' })
    }
  },
  mounted() {
    this.cargarPurchases()
  }
}
</script>
<template>
  <div class="container mt-4">
    <h1 class="text-primary fw-bold">Proveedores</h1>

    <div class="card shadow-sm">
      <div class="card-header fw-bold">Lista de Proveedores</div>
      <div class="card-body">
        <table class="table table-hover">
          <thead class="table-info">
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Contacto</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(supplier, index) in suppliers" :key="supplier.id">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ supplier.name }}</td>
              <td>{{ supplier.contact_info }}</td>
              <td>
                <button @click="editSupplier(supplier.id)" class="btn btn-sm btn-warning mx-1">
                  <font-awesome-icon icon="pencil" />
                </button>
                <button @click="eliminar(supplier.id)" class="btn btn-sm btn-outline-danger mx-1">
                  <font-awesome-icon icon="trash" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <button @click="newSupplier" class="btn btn-success">
          <font-awesome-icon icon="plus" /> Nuevo Proveedor
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'SupplierList',
  data() {
    return {
      suppliers: []
    }
  },
  methods: {
    async cargarSuppliers() {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/suppliers')
        this.suppliers = res.data.suppliers
      } catch (error) {
        console.error('Error al cargar proveedores:', error)
      }
    },
    async eliminar(id) {
      Swal.fire({
        title: `¿Deseas eliminar el proveedor con ID ${id}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.delete(`http://127.0.0.1:8000/api/suppliers/${id}`)
            Swal.fire('Eliminado', 'Proveedor eliminado correctamente.', 'success')
            this.cargarSuppliers()
          } catch (error) {
            console.error('Error al eliminar:', error)
            Swal.fire('Error', 'No se pudo eliminar el proveedor.', 'error')
          }
        }
      })
    },
    editSupplier(id) {
      this.$router.push({ name: 'EditSupplier', params: { id } })
    },
    newSupplier() {
      this.$router.push({ name: 'NewSupplier' })
    }
  },
  mounted() {
    this.cargarSuppliers()
  }
}
</script>
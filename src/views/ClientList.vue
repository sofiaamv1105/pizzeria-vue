<template>
  <div class="container mt-4">
    <h1 class="text-primary fw-bold">Clientes</h1>

    <div class="card shadow-sm">
      <div class="card-header fw-bold">Lista de Clientes</div>
      <div class="card-body">
        <table class="table table-hover">
          <thead class="table-info">
            <tr>
              <th>#</th>
              <th>Usuario</th>
              <th>Dirección</th>
              <th>Teléfono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(client, index) in clients" :key="client.id">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ client.user.name }} ({{ client.user.email }})</td>
              <td>{{ client.address || '-' }}</td>
              <td>{{ client.phone || '-' }}</td>
              <td>
                <button @click="editClient(client.id)" class="btn btn-sm btn-warning mx-1">
                  <font-awesome-icon icon="pencil" />
                </button>
                <button @click="eliminar(client.id)" class="btn btn-sm btn-outline-danger mx-1">
                  <font-awesome-icon icon="trash" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <button @click="newClient" class="btn btn-success">
          <font-awesome-icon icon="plus" /> Nuevo Cliente
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'ClientList',
  data() {
    return {
      clients: []
    }
  },
  methods: {
    async cargarClients() {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/clients')
        this.clients = res.data.clients
      } catch (error) {
        console.error('Error cargando clientes:', error)
      }
    },
    async eliminar(id) {
      Swal.fire({
        title: `¿Deseas eliminar el cliente con ID ${id}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.delete(`http://127.0.0.1:8000/api/clients/${id}`)
            Swal.fire('Eliminado', 'El cliente ha sido eliminado.', 'success')
            this.cargarClients()
          } catch (error) {
            console.error('Error al eliminar:', error)
            Swal.fire('Error', 'No se pudo eliminar el cliente.', 'error')
          }
        }
      })
    },
    editClient(id) {
      this.$router.push({ name: 'EditClient', params: { id } })
    },
    newClient() {
      this.$router.push({ name: 'NewClient' })
    }
  },
  mounted() {
    this.cargarClients()
  }
}
</script>
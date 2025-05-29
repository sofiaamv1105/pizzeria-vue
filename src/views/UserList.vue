<template>
  <div class="container mt-4">
    <h1 class="text-primary fw-bold">Usuarios</h1>

    <div class="card shadow-sm">
      <div class="card-header fw-bold">Lista de Usuarios</div>
      <div class="card-body">
        <table class="table table-hover">
          <thead class="table-info">
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Detalles</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in users" :key="user.id">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.role }}</td>
              <td>
                <div v-if="user.role === 'cliente'">
                  Dirección: {{ user.client?.address || 'N/A' }}<br />
                  Teléfono: {{ user.client?.phone || 'N/A' }}
                </div>
                <div v-else-if="user.role === 'empleado'">
                  Cargo: {{ user.employee?.position || 'N/A' }}<br />
                  ID: {{ user.employee?.identification_number || 'N/A' }}<br />
                  Salario: {{ user.employee?.salary || 0 }}<br />
                  Fecha: {{ user.employee?.hire_date || 'N/A' }}
                </div>
              </td>
              <td>
                <button @click="editUser(user.id)" class="btn btn-sm btn-warning mx-1">
                  <font-awesome-icon icon="pencil" />
                </button>
                <button @click="eliminarUser(user.id)" class="btn btn-sm btn-outline-danger mx-1">
                  <font-awesome-icon icon="trash" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <button @click="newUser" class="btn btn-success">
          <font-awesome-icon icon="plus" /> Nuevo Usuario
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'UserList',
  data() {
    return {
      users: []
    }
  },
  methods: {
    async cargarUsuarios() {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/users')
        this.users = res.data.users
      } catch (error) {
        console.error('Error al cargar usuarios:', error)
        Swal.fire('Error', 'No se pudieron cargar los usuarios', 'error')
      }
    },
    async eliminarUser(id) {
      Swal.fire({
        title: `¿Deseas eliminar el usuario con ID ${id}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.delete(`http://127.0.0.1:8000/api/users/${id}`)
            Swal.fire('Eliminado', 'Usuario eliminado correctamente.', 'success')
            this.cargarUsuarios()
          } catch (error) {
            console.error('Error al eliminar:', error)
            Swal.fire('Error', 'No se pudo eliminar el usuario.', 'error')
          }
        }
      })
    },
    editUser(id) {
      this.$router.push({ name: 'EditUser', params: { id } })
    },
    newUser() {
      this.$router.push({ name: 'NewUser' })
    }
  },
  mounted() {
    this.cargarUsuarios()
  }
}
</script>
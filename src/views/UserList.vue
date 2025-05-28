<template>
  <div class="container mt-4">
    <h1 class="mb-4">Usuarios</h1>

    <router-link to="/add-user" class="btn btn-primary mb-3">
      <font-awesome-icon icon="plus" /> Nuevo Usuario
    </router-link>

    <table class="table table-striped">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Email</th>
          <th>Rol</th>
          <th>Detalles</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
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
              Identificación: {{ user.employee?.identification_number || 'N/A' }}<br />
              Salario: {{ user.employee?.salary || 0 }}<br />
              Fecha de ingreso: {{ user.employee?.hire_date || 'N/A' }}
            </div>
          </td>
          <td>
            <router-link :to="{ name: 'EditUser', params: { id: user.id } }" class="btn btn-warning btn-sm me-2">
              <font-awesome-icon icon="edit" /> Editar
            </router-link>
            <button @click="eliminarUser(user.id)" class="btn btn-danger btn-sm">
              <font-awesome-icon icon="trash" /> Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
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
  mounted() {
    this.cargarUsuarios()
  },
  methods: {
    async cargarUsuarios() {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/users')
        this.users = res.data.users
      } catch (error) {
        console.error('Error cargando usuarios:', error)
        Swal.fire('Error', 'No se pudieron cargar los usuarios', 'error')
      }
    },
    async eliminarUser(id) {
      const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: 'No podrás revertir esta acción',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      })
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://127.0.0.1:8000/api/users/${id}`)
          Swal.fire('Eliminado', 'Usuario eliminado correctamente', 'success')
          this.cargarUsuarios()
        } catch (error) {
          console.error('Error eliminando usuario:', error)
          Swal.fire('Error', 'No se pudo eliminar el usuario', 'error')
        }
      }
    }
  }
}
</script>
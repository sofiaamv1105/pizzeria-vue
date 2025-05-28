<template>
  <div class="container mt-4">
    <h2 class="text-warning fw-bold">Editar Empleado</h2>

    <div class="card shadow-sm">
      <div class="card-body">
        <form @submit.prevent="actualizar">
          <div class="mb-3">
            <label class="form-label">Usuario</label>
            <select v-model="form.user_id" class="form-select" required>
              <option value="">Seleccione un usuario</option>
              <option v-for="user in users" :key="user.id" :value="user.id">
                {{ user.name }} ({{ user.email }})
              </option>
            </select>
          </div>

          <div class="mb-3">
            <label class="form-label">Cargo</label>
            <select v-model="form.position" class="form-select" required>
              <option value="cajero">Cajero</option>
              <option value="administrador">Administrador</option>
              <option value="cocinero">Cocinero</option>
              <option value="mensajero">Mensajero</option>
            </select>
          </div>

          <div class="mb-3">
            <label class="form-label">Cédula</label>
            <input v-model="form.identification_number" type="text" class="form-control" required />
          </div>

          <div class="mb-3">
            <label class="form-label">Salario</label>
            <input v-model="form.salary" type="number" class="form-control" required />
          </div>

          <div class="mb-3">
            <label class="form-label">Fecha de contratación</label>
            <input v-model="form.hire_date" type="date" class="form-control" required />
          </div>

          <button type="submit" class="btn btn-warning">Actualizar</button>
          <router-link to="/employees" class="btn btn-secondary mx-2">Cancelar</router-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      form: {
        user_id: '',
        position: '',
        identification_number: '',
        salary: '',
        hire_date: ''
      },
      users: []
    }
  },
  methods: {
    async cargarEmpleado() {
      const res = await axios.get(`http://127.0.0.1:8000/api/employees/${this.$route.params.id}`)
      this.form = res.data.employee
    },
    async cargarUsuarios() {
      const res = await axios.get('http://127.0.0.1:8000/api/users')
      this.users = res.data.users
    },
    async actualizar() {
      try {
        await axios.put(`http://127.0.0.1:8000/api/employees/${this.$route.params.id}`, this.form)
        Swal.fire('Actualizado', 'Empleado actualizado correctamente.', 'success')
        this.$router.push('/employees')
      } catch (error) {
        console.error(error)
        Swal.fire('Error', 'No se pudo actualizar el empleado.', 'error')
      }
    }
  },
  mounted() {
    this.cargarEmpleado()
    this.cargarUsuarios()
  }
}
</script>
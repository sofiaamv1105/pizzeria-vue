<template>
  <div class="container mt-4">
    <h2 class="text-success fw-bold">Nuevo Empleado</h2>

    <div class="card shadow-sm">
      <div class="card-body">
        <form @submit.prevent="guardar">
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
              <option value="">Seleccione un cargo</option>
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

          <button type="submit" class="btn btn-success">Guardar</button>
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
    async cargarUsuarios() {
      const res = await axios.get('http://127.0.0.1:8000/api/users')
      this.users = res.data.users
    },
    async guardar() {
      try {
        await axios.post('http://127.0.0.1:8000/api/employees', this.form)
        Swal.fire('Éxito', 'Empleado creado correctamente.', 'success')
        this.$router.push('/employees')
      } catch (error) {
        console.error(error)
        Swal.fire('Error', 'No se pudo guardar el empleado.', 'error')
      }
    }
  },
  mounted() {
    this.cargarUsuarios()
  }
}
</script>
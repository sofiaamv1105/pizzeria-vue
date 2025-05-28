<template>
  <div class="container mt-4">
    <h1 class="text-success fw-bold">Nuevo Usuario</h1>

    <div class="card shadow-sm">
      <div class="card-header fw-bold">Formulario de Usuario</div>
      <div class="card-body">
        <form @submit.prevent="crearUser">
          <div class="mb-3">
            <label for="name" class="form-label">Nombre</label>
            <input v-model="user.name" type="text" class="form-control" id="name" required />
          </div>

          <div class="mb-3">
            <label for="email" class="form-label">Correo Electrónico</label>
            <input v-model="user.email" type="email" class="form-control" id="email" required />
          </div>

          <div class="mb-3">
            <label for="password" class="form-label">Contraseña</label>
            <input v-model="user.password" type="password" class="form-control" id="password" required />
          </div>

          <div class="mb-3">
            <label for="password_confirmation" class="form-label">Confirmar Contraseña</label>
            <input v-model="user.password_confirmation" type="password" class="form-control" id="password_confirmation" required />
          </div>

          <div class="mb-3">
            <label for="role" class="form-label">Rol</label>
            <select v-model="user.role" class="form-select" id="role" @change="rolChange" required>
              <option disabled value="">Selecciona un rol</option>
              <option value="cliente">Cliente</option>
              <option value="empleado">Empleado</option>
            </select>
          </div>

          <!-- Campos para Cliente -->
          <div v-if="user.role === 'cliente'">
            <div class="mb-3">
              <label for="address" class="form-label">Dirección</label>
              <input v-model="user.address" type="text" class="form-control" id="address" />
            </div>
            <div class="mb-3">
              <label for="phone" class="form-label">Teléfono</label>
              <input v-model="user.phone" type="text" class="form-control" id="phone" />
            </div>
          </div>

          <!-- Campos para Empleado -->
          <div v-if="user.role === 'empleado'">
            <div class="mb-3">
              <label for="position" class="form-label">Cargo</label>
              <input v-model="user.position" type="text" class="form-control" id="position" />
            </div>
            <div class="mb-3">
              <label for="identification_number" class="form-label">Número de Identificación</label>
              <input v-model="user.identification_number" type="text" class="form-control" id="identification_number" />
            </div>
            <div class="mb-3">
              <label for="salary" class="form-label">Salario</label>
              <input v-model.number="user.salary" type="number" class="form-control" id="salary" />
            </div>
            <div class="mb-3">
              <label for="hire_date" class="form-label">Fecha de Ingreso</label>
              <input v-model="user.hire_date" type="date" class="form-control" id="hire_date" />
            </div>
          </div>

          <button type="submit" class="btn btn-success">
            <font-awesome-icon icon="check" /> Guardar
          </button>
          <button @click.prevent="$router.back()" class="btn btn-secondary ms-2">
            <font-awesome-icon icon="arrow-left" /> Cancelar
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'NewUser',
  data() {
    return {
      user: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: '',
        // campos opcionales
        address: '',
        phone: '',
        position: '',
        identification_number: '',
        salary: null,
        hire_date: null
      }
    }
  },
  methods: {
    rolChange() {
      // Limpiar campos específicos al cambiar rol
      if (this.user.role === 'cliente') {
        this.user.position = ''
        this.user.identification_number = ''
        this.user.salary = null
        this.user.hire_date = null
      } else if (this.user.role === 'empleado') {
        this.user.address = ''
        this.user.phone = ''
      }
    },
    async crearUser() {
      try {
        await axios.post('http://127.0.0.1:8000/api/users', this.user)
        Swal.fire('Creado', 'Usuario registrado con éxito', 'success')
        this.$router.push({ name: 'UserList' })
      } catch (error) {
        console.error('Error creando usuario:', error)
        Swal.fire('Error', 'No se pudo crear el usuario', 'error')
      }
    }
  }
}
</script>
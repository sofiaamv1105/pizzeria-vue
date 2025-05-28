<template>
  <div class="container mt-4">
    <h1 class="text-primary fw-bold">Nuevo Cliente</h1>

    <div class="card shadow-sm">
      <div class="card-body">
        <form @submit.prevent="guardarClient">
          <div class="mb-3">
            <label for="user_id" class="form-label">Usuario</label>
            <select v-model="client.user_id" id="user_id" class="form-select" required>
              <option value="" disabled>Selecciona un usuario</option>
              <option v-for="user in users" :key="user.id" :value="user.id">
                {{ user.name }} ({{ user.email }})
              </option>
            </select>
          </div>

          <div class="mb-3">
            <label for="address" class="form-label">Dirección</label>
            <input type="text" v-model="client.address" id="address" class="form-control" />
          </div>

          <div class="mb-3">
            <label for="phone" class="form-label">Teléfono</label>
            <input type="text" v-model="client.phone" id="phone" class="form-control" />
          </div>

          <button type="submit" class="btn btn-primary">Guardar</button>
          <button @click.prevent="$router.push({ name: 'ClientList' })" class="btn btn-secondary ms-2">
            Cancelar
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
  name: 'NewClient',
  data() {
    return {
      client: {
        user_id: '',
        address: '',
        phone: ''
      },
      users: []
    }
  },
  methods: {
    async cargarUsers() {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/users') // asegúrate de tener endpoint para obtener usuarios
        this.users = res.data.users
      } catch (error) {
        console.error('Error cargando usuarios:', error)
      }
    },
    async guardarClient() {
      try {
        await axios.post('http://127.0.0.1:8000/api/clients', this.client)
        Swal.fire('Guardado', 'Cliente creado correctamente', 'success')
        this.$router.push({ name: 'ClientList' })
      } catch (error) {
        console.error('Error guardando cliente:', error)
        Swal.fire('Error', 'No se pudo guardar el cliente', 'error')
      }
    }
  },
  mounted() {
    this.cargarUsers()
  }
}
</script>
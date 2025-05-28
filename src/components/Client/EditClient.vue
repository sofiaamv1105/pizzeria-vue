<template>
  <div class="container mt-4">
    <h1 class="text-primary fw-bold">Editar Cliente</h1>

    <div class="card shadow-sm">
      <div class="card-body" v-if="client">
        <form @submit.prevent="actualizarClient">
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

          <button type="submit" class="btn btn-primary">Actualizar</button>
          <button @click.prevent="$router.push({ name: 'ClientList' })" class="btn btn-secondary ms-2">
            Cancelar
          </button>
        </form>
      </div>
      <div v-else>
        <p>Cargando cliente...</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'EditClient',
  data() {
    return {
      client: null,
      users: []
    }
  },
  methods: {
    async cargarUsers() {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/users')
        this.users = res.data.users
      } catch (error) {
        console.error('Error cargando usuarios:', error)
      }
    },
    async cargarClient() {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/clients/${this.$route.params.id}`)
        this.client = res.data.client
      } catch (error) {
        console.error('Error cargando cliente:', error)
      }
    },
    async actualizarClient() {
      try {
        await axios.put(`http://127.0.0.1:8000/api/clients/${this.client.id}`, this.client)
        Swal.fire('Actualizado', 'Cliente actualizado correctamente', 'success')
        this.$router.push({ name: 'ClientList' })
      } catch (error) {
        console.error('Error actualizando cliente:', error)
        Swal.fire('Error', 'No se pudo actualizar el cliente', 'error')
      }
    }
  },
  mounted() {
    this.cargarUsers()
    this.cargarClient()
  }
}
</script>
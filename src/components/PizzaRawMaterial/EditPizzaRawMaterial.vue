<template>
  <div class="container mt-4">
    <h1 class="text-primary fw-bold">Editar Relación Pizza - Materia Prima</h1>

    <div class="card shadow-sm">
      <div class="card-header fw-bold">Editar Relación</div>
      <div class="card-body" v-if="form">
        <form @submit.prevent="actualizar">
          <div class="mb-3">
            <label for="pizza" class="form-label">Pizza</label>
            <select id="pizza" v-model="form.pizza_id" class="form-select" required>
              <option value="" disabled>Seleccione una pizza</option>
              <option v-for="pizza in pizzas" :key="pizza.id" :value="pizza.id">
                {{ pizza.name }}
              </option>
            </select>
          </div>

          <div class="mb-3">
            <label for="rawMaterial" class="form-label">Materia Prima</label>
            <select id="rawMaterial" v-model="form.raw_material_id" class="form-select" required>
              <option value="" disabled>Seleccione una materia prima</option>
              <option v-for="rm in rawMaterials" :key="rm.id" :value="rm.id">
                {{ rm.name }}
              </option>
            </select>
          </div>

          <div class="mb-3">
            <label for="quantity" class="form-label">Cantidad</label>
            <input
              id="quantity"
              type="number"
              v-model.number="form.quantity"
              class="form-control"
              min="0.01"
              step="0.01"
              required
            />
          </div>

          <button type="submit" class="btn btn-primary">
            <font-awesome-icon icon="save" /> Actualizar
          </button>
          <button @click="cancelar" type="button" class="btn btn-secondary ms-2">
            Cancelar
          </button>
        </form>
      </div>
      <div v-else>
        <p>Cargando...</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'EditPizzaRawMaterial',
  data() {
    return {
      pizzas: [],
      rawMaterials: [],
      form: null
    }
  },
  methods: {
    async cargarDatos() {
      try {
        const [pizzasRes, rawMaterialsRes] = await Promise.all([
          axios.get('http://127.0.0.1:8000/api/pizzas'),
          axios.get('http://127.0.0.1:8000/api/raw-materials')
        ])
        this.pizzas = pizzasRes.data.pizzas
        this.rawMaterials = rawMaterialsRes.data.rawMaterials
      } catch (error) {
        console.error('Error cargando datos:', error)
      }
    },
    async cargarRelacion() {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/pizza-raw-materials/${this.$route.params.id}`)
        this.form = res.data.pizza_raw_material
      } catch (error) {
        console.error('Error cargando relación:', error)
        Swal.fire('Error', 'No se pudo cargar la relación.', 'error')
        this.$router.push({ name: 'PizzaRawMaterialList' })
      }
    },
    async actualizar() {
      try {
        await axios.put(`http://127.0.0.1:8000/api/pizza-raw-materials/${this.form.id}`, this.form)
        Swal.fire('Actualizado', 'Relación actualizada correctamente.', 'success')
        this.$router.push({ name: 'PizzaRawMaterialList' })
      } catch (error) {
        console.error('Error al actualizar:', error)
        Swal.fire('Error', 'No se pudo actualizar la relación.', 'error')
      }
    },
    cancelar() {
      this.$router.push({ name: 'PizzaRawMaterialList' })
    }
  },
  async mounted() {
    await this.cargarDatos()
    await this.cargarRelacion()
  }
}
</script>
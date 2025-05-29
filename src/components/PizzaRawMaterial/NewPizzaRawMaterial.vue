<template>
  <div class="container mt-4">
    <h1 class="text-primary fw-bold">Nueva Relación Pizza - Materia Prima</h1>

    <div class="card shadow-sm">
      <div class="card-header fw-bold">Crear Nueva Relación</div>
      <div class="card-body">
        <form @submit.prevent="guardar">
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
            <input id="quantity" type="number" v-model.number="form.quantity" class="form-control" min="0.01"
              step="0.01" required />
          </div>

          <button type="submit" class="btn btn-success">
            <font-awesome-icon icon="save" /> Guardar
          </button>
          <button @click="cancelar" type="button" class="btn btn-secondary ms-2">
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
  name: 'NewPizzaRawMaterial',
  data() {
    return {
      pizzas: [],
      rawMaterials: [],
      form: {
        pizza_id: '',
        raw_material_id: '',
        quantity: null
      }
    }
  },
  methods: {
    async cargarDatos() {
      try {
        const [pizzasRes, rawMaterialsRes] = await Promise.all([
          axios.get('http://127.0.0.1:8000/api/pizzas'),
          axios.get('http://127.0.0.1:8000/api/raw-materials')
        ]);
        console.log('Pizzas:', pizzasRes.data);
        console.log('RawMaterials:', rawMaterialsRes.data);

        this.pizzas = pizzasRes.data.pizzas;
        this.rawMaterials = rawMaterialsRes.data.rawMaterials;
      } catch (error) {
        console.error('Error cargando datos:', error);
      }
    },
    async guardar() {
      try {
        await axios.post('http://127.0.0.1:8000/api/pizza-raw-materials', this.form)
        Swal.fire('Guardado', 'Relación creada correctamente.', 'success')
        this.$router.push({ name: 'PizzaRawMaterialList' })
      } catch (error) {
        console.error('Error al guardar:', error)
        Swal.fire('Error', 'No se pudo crear la relación.', 'error')
      }
    },
    cancelar() {
      this.$router.push({ name: 'PizzaRawMaterialList' })
    }
  },
  mounted() {
    this.cargarDatos()
  }
}
</script>
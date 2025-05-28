<template>
  <div class="container mt-4">
    <h1 class="text-warning fw-bold">Editar Ingrediente de Pizza</h1>

    <div class="card shadow-sm">
      <div class="card-body">
        <form @submit.prevent="actualizar">
          <div class="mb-3">
            <label class="form-label">Pizza</label>
            <select v-model="form.pizza_id" class="form-select" required>
              <option disabled value="">Seleccione una pizza</option>
              <option v-for="pizza in pizzas" :key="pizza.id" :value="pizza.id">
                {{ pizza.name }}
              </option>
            </select>
          </div>

          <div class="mb-3">
            <label class="form-label">Ingrediente</label>
            <select v-model="form.ingredient_id" class="form-select" required>
              <option disabled value="">Seleccione un ingrediente</option>
              <option v-for="ingredient in ingredients" :key="ingredient.id" :value="ingredient.id">
                {{ ingredient.name }}
              </option>
            </select>
          </div>

          <button type="submit" class="btn btn-warning">Actualizar</button>
          <router-link to="/pizza_ingredients" class="btn btn-secondary mx-2">Cancelar</router-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'EditPizzaIngredient',
  data() {
    return {
      form: {
        pizza_id: '',
        ingredient_id: ''
      },
      pizzas: [],
      ingredients: []
    }
  },
  methods: {
    async cargarDatos() {
      try {
        const [resPizzas, resIngredients, resRegistro] = await Promise.all([
          axios.get('http://127.0.0.1:8000/api/pizzas'),
          axios.get('http://127.0.0.1:8000/api/ingredients'),
          axios.get(`http://127.0.0.1:8000/api/pizza_ingredients/${this.$route.params.id}`)
        ])
        this.pizzas = resPizzas.data.pizzas
        this.ingredients = resIngredients.data.ingredients
        this.form = {
          pizza_id: resRegistro.data.pizza_ingredient.pizza_id,
          ingredient_id: resRegistro.data.pizza_ingredient.ingredient_id
        }
      } catch (error) {
        console.error('Error al cargar datos:', error)
        Swal.fire('Error', 'No se pudo cargar el registro.', 'error')
      }
    },
    async actualizar() {
      try {
        await axios.put(`http://127.0.0.1:8000/api/pizza_ingredients/${this.$route.params.id}`, this.form)
        Swal.fire('Actualizado', 'Registro actualizado correctamente.', 'success')
        this.$router.push('/pizza_ingredients')
      } catch (error) {
        console.error('Error al actualizar:', error)
        Swal.fire('Error', 'No se pudo actualizar el registro.', 'error')
      }
    }
  },
  mounted() {
    this.cargarDatos()
  }
}
</script>
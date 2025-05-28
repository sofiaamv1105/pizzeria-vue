<template>
    <div class="container mt-4">
        <h1 class="text-primary fw-bold">Tamaños de Pizza</h1>

        <div class="card shadow-sm">
            <div class="card-header fw-bold">Lista de Tamaños</div>
            <div class="card-body">
                <table class="table table-hover">
                    <thead class="table-info">
                        <tr>
                            <th>#</th>
                            <th>Pizza</th>
                            <th>Tamaño</th>
                            <th>Precio</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(size, index) in pizzaSizes" :key="size.id">
                            <th scope="row">{{ index + 1 }}</th>
                            <td>{{ size.pizza.name }}</td>
                            <td>{{ size.size }}</td>
                            <td>${{ size.price.toFixed(2) }}</td>
                            <td>
                                <button @click="editPizzaSize(size.id)" class="btn btn-sm btn-warning mx-1">
                                    <font-awesome-icon icon="pencil" />
                                </button>
                                <button @click="eliminar(size.id)" class="btn btn-sm btn-outline-danger mx-1">
                                    <font-awesome-icon icon="trash" />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <button @click="newPizzaSize" class="btn btn-success">
                    <font-awesome-icon icon="plus" /> Nuevo Tamaño
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
    name: 'PizzaSizeList',
    data() {
        return {
            pizzaSizes: []
        }
    },
    methods: {
        async cargarPizzaSizes() {
            try {
                const res = await axios.get('http://127.0.0.1:8000/api/pizza-sizes')
                this.pizzaSizes = res.data.pizza_sizes.map(size => ({
                    ...size,
                    price: Number(size.price)
                }))
            } catch (error) {
                console.error('Error cargando tamaños:', error)
            }
        },
        async eliminar(id) {
            Swal.fire({
                title: `¿Deseas eliminar el tamaño con ID ${id}?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Eliminar',
                cancelButtonText: 'Cancelar'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        await axios.delete(`http://127.0.0.1:8000/api/pizza-sizes/${id}`)
                        Swal.fire('Eliminado', 'El tamaño ha sido eliminado.', 'success')
                        this.cargarPizzaSizes()
                    } catch (error) {
                        console.error('Error al eliminar:', error)
                        Swal.fire('Error', 'No se pudo eliminar el tamaño.', 'error')
                    }
                }
            })
        },
        editPizzaSize(id) {
            this.$router.push({ name: 'EditPizzaSize', params: { id } })
        },
        newPizzaSize() {
            this.$router.push({ name: 'NewPizzaSize' })
        }
    },
    mounted() {
        this.cargarPizzaSizes()
    }
}
</script>
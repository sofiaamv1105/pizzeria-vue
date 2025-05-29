<template>
    <div class="container mt-4">
        <h1 class="text-primary fw-bold">Registrar Compra</h1>
        <div class="card shadow-sm">
            <div class="card-header fw-bold">Nueva Compra</div>
            <div class="card-body">
                <form @submit.prevent="guardar">
                    <div class="mb-3">
                        <label for="supplier_id" class="form-label">Proveedor</label>
                        <select v-model="form.supplier_id" class="form-select" required>
                            <option value="" disabled>Seleccione un proveedor</option>
                            <option v-for="supplier in suppliers" :key="supplier.id" :value="supplier.id">
                                {{ supplier.name }}
                            </option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Materia Prima</label>
                        <select v-model="form.raw_material_id" class="form-select" required>
                            <option disabled value="">Seleccione una materia prima</option>
                            <option v-for="rm in rawMaterials" :key="rm.id" :value="rm.id">{{ rm.name }}</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Cantidad</label>
                        <input type="number" v-model="form.quantity" class="form-control" min="0.01" step="0.01"
                            required />
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Precio de Compra</label>
                        <input type="number" v-model="form.purchase_price" class="form-control" min="0.01" step="0.01"
                            required />
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Fecha de Compra</label>
                        <input type="date" v-model="form.purchase_date" class="form-control" required />
                    </div>
                    <button class="btn btn-success">
                        <font-awesome-icon icon="save" /> Guardar
                    </button>
                    <button @click="cancelar" type="button" class="btn btn-secondary ms-2">Cancelar</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
    name: 'NewPurchase',
    data() {
        return {
            form: {
                supplier_id: '',
                raw_material_id: '',
                quantity: '',
                purchase_price: '',
                purchase_date: ''
            },
            suppliers: [],
            rawMaterials: []
        }
    },
    methods: {
        async cargarDatos() {
            const [suppliersRes, rawRes] = await Promise.all([
                axios.get('http://127.0.0.1:8000/api/suppliers'),
                axios.get('http://127.0.0.1:8000/api/raw-materials')
            ])
            this.suppliers = suppliersRes.data.suppliers
            this.rawMaterials = rawRes.data.rawMaterials
        },
        async guardar() {
            try {
                await axios.post('http://127.0.0.1:8000/api/purchases', this.form)
                Swal.fire('Éxito', 'Compra registrada correctamente.', 'success')
                this.$router.push({ name: 'PurchaseList' })
            } catch (err) {
                Swal.fire('Error', 'No se pudo guardar la compra.', 'error')
            }
        },
        cancelar() {
            this.$router.push({ name: 'PurchaseList' })
        }
    },
    mounted() {
        this.cargarDatos()
    }
}
</script>
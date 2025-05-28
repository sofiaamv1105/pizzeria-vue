<template>
  <div class="container mt-4">
    <h1 class="text-primary fw-bold">Empleados</h1>

    <div class="card shadow-sm">
      <div class="card-header fw-bold">Lista de Empleados</div>
      <div class="card-body">
        <table class="table table-hover">
          <thead class="table-info">
            <tr>
              <th>#</th>
              <th>Usuario</th>
              <th>Posición</th>
              <th>Identificación</th>
              <th>Salario</th>
              <th>Fecha de Contrato</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(employee, index) in employees" :key="employee.id">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ employee.user.name }} ({{ employee.user.email }})</td>
              <td>{{ employee.position }}</td>
              <td>{{ employee.identification_number }}</td>
              <td>{{ employee.salary }}</td>
              <td>{{ employee.hire_date }}</td>
              <td>
                <button @click="editEmployee(employee.id)" class="btn btn-sm btn-warning mx-1">
                  <font-awesome-icon icon="pencil" />
                </button>
                <button @click="eliminar(employee.id)" class="btn btn-sm btn-outline-danger mx-1">
                  <font-awesome-icon icon="trash" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <button @click="newEmployee" class="btn btn-success">
          <font-awesome-icon icon="plus" /> Nuevo Empleado
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'EmployeeList',
  data() {
    return {
      employees: []
    }
  },
  methods: {
    async cargarEmployees() {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/employees')
        this.employees = res.data.employees
      } catch (error) {
        console.error('Error cargando empleados:', error)
      }
    },
    async eliminar(id) {
      Swal.fire({
        title: `¿Deseas eliminar el empleado con ID ${id}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.delete(`http://127.0.0.1:8000/api/employees/${id}`)
            Swal.fire('Eliminado', 'El empleado ha sido eliminado.', 'success')
            this.cargarEmployees()
          } catch (error) {
            console.error('Error al eliminar:', error)
            Swal.fire('Error', 'No se pudo eliminar el empleado.', 'error')
          }
        }
      })
    },
    editEmployee(id) {
      this.$router.push({ name: 'EditEmployee', params: { id } })
    },
    newEmployee() {
      this.$router.push({ name: 'NewEmployee' })
    }
  },
  mounted() {
    this.cargarEmployees()
  }
}
</script>
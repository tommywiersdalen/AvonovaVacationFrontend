<script se lang="ts">
import { useEmployeesStore } from '@/stores/Employees';
import { defineComponent } from 'vue'
import { onMounted, computed } from 'vue'
import EmployeeCard from './EmployeeCard.vue'
import TopBar from './TopBar.vue';


export default defineComponent({
    components: {
        EmployeeCard,
        TopBar
    },
    props: {
        employee: {
            type: Object,
            default: () => ({})
        }
    },

    setup() {
        const store = useEmployeesStore()

        const employees = computed(() => {
            return store.employeesList
        })

        onMounted(() => {
            store.fetchEmployees()
        })


        return {
            employees
        }
    }
})
</script>
<template>
    <div>
        <TopBar />
        <div v-for="employee in employees" :key="employee.id" class="flex flex-col my-4 mx-auto w-4/6">
            <EmployeeCard :employee="employee" />
        </div>
    </div>
</template>
<style scoped></style>

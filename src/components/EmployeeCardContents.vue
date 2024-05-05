<template>
    <div class="flex flex-col">
        <div class="flex flex-row space-x-2 items-end">
            <HolidayWaring />
            <button
                class="bg-green-900 hover:bg-green-700 text-green-200  py-3 font-bold px-4 text-sm w-2/6 rounded-full"
                @click="toggleModal(employee as Employee)">Register
                vacation</button>
        </div>
        <div class="mt-2 overflow-hidden border border-slate-500 rounded">
            <table class=" min-w-full divide-y divide-slate-500">
                <thead class="bg-slate-300 w-full">
                    <tr>
                        <th>From date</th>
                        <th>To date</th>
                        <th>Number of days</th>
                        <th>Note</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody class="min-w-full text-center" v-if="employee.vacationRequest">
                    <td>
                        <p>{{ new Date(employee.vacationRequest.startDate).toDateString() }}</p>
                    </td>
                    <td>
                        <p>{{ new Date(employee.vacationRequest.endDate).toDateString() }}</p>
                    </td>
                    <td>
                        <p>{{ employee.vacationRequest.daysRequested }}</p>
                    </td>
                    <td>
                        <p>{{ employee.vacationRequest.notes }}</p>
                    </td>
                    <td v-if="employee.vacationRequest.aprooved">
                        <p class="text-green
                        ">Aproved</p>
                    </td>
                    <td v-else>
                        <p class="text-gray-500">Pending</p>
                    </td>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script setup lang="ts">

import { useModalStore } from '@/stores/Modal';
import HolidayWaring from './HolidayWaring.vue';
import { useEmployeesStore } from '@/stores/Employees';

import type { Employee } from '@/stores/Employees';

const modalStore = useModalStore();
const employeeStore = useEmployeesStore();

defineProps({
    employee: {
        type: Object,
        default: () => ({}),
    },
});

async function toggleModal(employee: Employee) {
    await employeeStore.fetchEmployee(employee.id);
    modalStore.toggleModal();

}


</script>
<style scoped></style>
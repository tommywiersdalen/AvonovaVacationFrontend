<template>
    <div class="flex flex-col py-6 px-3 rounded-md shadow-md bg-white">
        <div class="flex flex-row flex-1 justify-between items-center">
            <h2 class="text-3xl">{{ employee.name }}</h2>
            <p>{{ employee.vacationDaysUsed }} of {{ employee.vacationDays }} used</p>
            <button @click="toggleOpen()" class="flex items-center space-x-3">
                <svg class="w-3 transition-all duration-200 transform" :class="{
                    'rotate-180': isOpen,
                    'rotate-0': !isOpen,
                }" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 10"
                    aria-hidden="true">
                    <path d="M15 1.2l-7 7-7-7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </button>
        </div>
        <div class="mt-2">
            <div v-if="isOpen" class="flex flex-col">
                <EmployeeCardContents :employee="employee" />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

import EmployeeCardContents from './EmployeeCardContents.vue';


defineProps({
    employee: {
        type: Object,
        default: () => ({}),
    },
});
const isOpen = ref(false);

function toggleOpen() {
    isOpen.value = !isOpen.value;
}

</script>

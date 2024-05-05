<template>
    <nav class="bg-gray-800">
        <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div class="relative flex h-16 items-center justify-between">
                <select class="text-white bg-gray-800 border border-gray-800 rounded-md px-3 py-2"
                    v-model="selectedCountry" @change="updateCountry">
                    <option v-for="country in countries" :key="country" :value="country">
                        {{ country }}</option>
                </select>
            </div>
        </div>
    </nav>
</template>
<script setup lang="ts">
import { computed, onMounted, ref, watch, } from 'vue';
import { useCountryStore } from '@/stores/CountryContext';
import { useEmployeesStore } from '@/stores/Employees';


const countries = ['NO', 'SE'];

const countryStore = useCountryStore();
const employeeStore = useEmployeesStore();

const selectedCountry = ref('');

onMounted(() => {
    countryStore.fetchCountryCode();
})
watch(() => countryStore.countryCode, (newVal) => {
    selectedCountry.value = newVal;
})

const country = computed(() => countryStore.countryCode);
console.log(country.value);



const updateCountry = () => {
    console.log(selectedCountry.value);
    countryStore.updateCountryCode(selectedCountry.value);
    employeeStore.fetchEmployees();

}


</script>
<style scoped></style>
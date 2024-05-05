<script setup lang="ts">

import EmployerVacationCreateModal from '@/components/EmployerVacationCreateModal.vue';
import EmployeeList from '../components/EmployeeList.vue'
import { onMounted, ref } from 'vue';
import { useCountryStore } from '@/stores/CountryContext';
const countryContextStore = useCountryStore()
const modalActive = ref(false)
const toggleModal = () => {
  modalActive.value = !modalActive.value
}
onMounted(async () => {

  await countryContextStore.fetchCountryCode()
})
</script>
<template>
  <main>
    <EmployeeList :modalActive="modalActive" />
    <EmployerVacationCreateModal :modal-active="modalActive" @close-modal="toggleModal" />
  </main>
</template>

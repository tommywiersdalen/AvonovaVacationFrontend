<template>
    <Teleport to="body">
        <Transition name="modal-outer">
            <div v-show="modalActive" class="fixed inset-0 bg-black bg-opacity-50 z-50">
                <Transition name="modal-inner">
                    <div v-if="modalActive" class="p-4 bg-white mx-auto mt-32 max-w-screen-lg rounded">
                        <div class="flex flex-row justify-between items-center px-20 ">
                            <h2 class="text-bold text-2xl">Register vacation</h2>
                            <p>{{ employee.name }}</p>
                            <button class="border rounded-full bg-slate-200 hover:bg-slate-400 px-2 text-slate-500"
                                @click="closeModal">X</button>
                        </div>
                        <div class="mt-4">
                            <div class="flex flex-col w-5/6 bg-slate-200 p-8 mx-auto rounded">
                                <HolidayWaring />
                                <div class="flex flex-col w-1/4">
                                    <label for="from">From date*</label>
                                    <input type="date" id="from" class="border rounded-md p-2" v-model="fromDate" />
                                </div>
                                <div>
                                    <p>seleted {{ fromDate }}</p>
                                </div>
                                <div class="flex flex-col w-1/4">
                                    <label for="to">To date*</label>
                                    <input type="date" id="to" class="border rounded-md p-2" v-model="toDate" />
                                </div>
                                <div class="flex flex-col w-2/5">
                                    <label for="Notes">Notes</label>
                                    <textarea id="Notes" class="border rounded-md p-2" v-model="notes"></textarea>
                                </div>
                            </div>
                            <div class="mt-4 flex flex-row justify-between px-20">
                                <button
                                    class="text-green-800 bg-white border hover:bg-green-200 border-green-800 rounded-full py-2 px-6"
                                    @click="closeModal">Cancel</button>
                                <button class="bg-green-900 hover:bg-green-700 text-green-200  rounded-full py-2 px-6"
                                    @click="submitForm">Register</button>
                            </div>
                        </div>
                    </div>
                </Transition>
            </div>
        </Transition>
    </Teleport>
</template>
<script setup lang="ts">
import { useModalStore } from '@/stores/Modal';
import { computed, ref, } from 'vue';
import HolidayWaring from './HolidayWaring.vue';
import { useEmployeesStore } from '@/stores/Employees';
import type { vacationRequest } from '@/stores/Employees';

const modalStore = useModalStore();
const employeeStore = useEmployeesStore();

const employee = computed(() => employeeStore.employee);

const modalActive = computed(() => modalStore.modal);

const closeModal = () => {
    modalStore.toggleModal()
}

const fromDate = ref('');
const toDate = ref('');
const notes = ref('');
const pending = true;
const approved = false;
const denied = false;

const daysRequested = computed(() => {
    let from = new Date(fromDate.value);
    let to = new Date(toDate.value);
    let diff = to.getTime() - from.getTime();
    return diff / (1000 * 60 * 60 * 24);
})

const validateDates = (from: string, to: string, daysRequested: number) => {

    let fromDate = new Date(from);
    let toDate = new Date(to);
    if (fromDate > toDate) {
        alert('From date must be before to date');
        return false;
    }
    if (fromDate < new Date()) {
        alert('From date must be in the future');
        return false;
    }
    if (daysRequested < 1) {
        alert('You must request at least one day');
        return false;
    }

    if (daysRequested > employee.value.vacationDaysLeft) {
        alert('Employee do not have enough vacation days');
        return false;
    }



    return true;
}
const submitForm = async () => {
    let vacation: vacationRequest = {
        id: 0,
        employeeId: employee.value.id,
        startDate: fromDate.value,
        endDate: toDate.value,
        notes: notes.value,
        pending: pending,
        approved: approved,
        denied: denied,
        daysRequested: daysRequested.value
    }
    console.log(vacation);
    if (!validateDates(fromDate.value, toDate.value, daysRequested.value)) {
        return;

    } else {
        await employeeStore.registerVacationRequest(vacation);
        await employeeStore.fetchEmployees();
        modalStore.toggleModal();
    }


}

</script>
<style scoped>
.modal-outer-enter-active,
.modal-outer-leave-active {
    transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-outer-enter-from,
.modal-outer-leave-to {
    opacity: 0;
}

.modal-inner-enter-active {
    transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}

.modal-inner-leave-active {
    transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-inner-enter-from {
    opacity: 0;
    transform: scale(0.8);
}

.modal-inner-leave-to {
    transform: scale(0.8);
}
</style>
import { defineStore } from "pinia";

export const useModalStore = defineStore("modal", {
    state: () => {
        return {
            modal: false,

        };
    },
    actions: {
        toggleModal() {
            this.modal = !this.modal;
        },

    },
    getters: {
        getModal(state) {
            return state.modal;
        },

    },
});
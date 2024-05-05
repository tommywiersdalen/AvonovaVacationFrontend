
import axios from "axios";

import { defineStore } from "pinia";

interface State {
    countryCode: string;
}

export const useCountryStore = defineStore("country", {
    state: (): State => {
        return {
            countryCode: "",
        };
    },
    actions: {
        async fetchCountryCode() {
            try {
                const response = await axios.get("http://localhost:5017/CountryContext");
                this.countryCode = response.data.countryCode;
            }
            catch (error) {
                console.log(error);
            }

        },
        async updateCountryCode(countryCode: string) {
            try {
                await axios.put(`http://localhost:5017/CountryContext/${countryCode}/update`);
                this.countryCode = countryCode;
            }
            catch (error) {
                console.log(error);
            }
        }
    },
    getters: {
        getCountryCode(state) {
            return state.countryCode;
        },
    },
});

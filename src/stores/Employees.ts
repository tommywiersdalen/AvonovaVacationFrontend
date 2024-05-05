import { defineStore } from "pinia";

import axios from "axios";

export interface vacationRequest {
    id: number;
    employeeId: number;
    startDate: string | undefined;
    endDate: string | undefined;
    daysRequested: number;
    notes: string | undefined;
    approved: boolean;
    denied: boolean;
    pending: boolean;

}


export interface Employee {
    id: number;
    name: string | null;
    vactionDays: number;
    vacationDaysLeft: number;
    vacationDaysUsed: number;
    vacationRequest: vacationRequest | null;
}



interface State {
    employeesList: Employee[];
    employee: Employee;
}


export const useEmployeesStore = defineStore("employees", {
    state: (): State => {
        return {
            employeesList: [],
            employee: {
                id: 0,
                name: "",
                vactionDays: 0,
                vacationDaysLeft: 0,
                vacationDaysUsed: 0,
                vacationRequest: {
                    id: 0,
                    employeeId: 0,
                    startDate: "",
                    endDate: "",
                    daysRequested: 0,
                    notes: "",
                    approved: false,
                    denied: false,
                    pending: false,
                },
            },
        };
    },
    actions: {
        async fetchEmployees() {
            try {
                const response = await axios.get("http://localhost:5017/employee");
                this.employeesList = response.data;
            } catch (error) {
                console.error(error);
            }
        },
        async fetchEmployee(id: number) {
            try {
                const response = await axios.get(`http://localhost:5017/employee/${id}`);
                this.employee = response.data;
            } catch (error) {
                console.error(error);
            }
        },
        async registerVacationRequest(vacationRequest: vacationRequest) {
            try {
                await axios.post("http://localhost:5017/vacationRequest", vacationRequest);
            } catch (error) {
                console.error(error);
            }
        }
    },
    getters: {
        getEmployees(state) {
            return state.employeesList;
        },
        getEmployee(state) {
            return state.employee;
        },
    },


});


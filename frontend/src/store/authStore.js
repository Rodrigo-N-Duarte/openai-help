import {api} from './api'
import {defineStore} from "pinia";

export const AuthStore = defineStore('AuthStore', {
    state: () => {
        return {
            logged: false,
            id: null,
            jwt: null
        }
    },
    persist: true,
    actions: {
        async login(body) {
            return await api.post("/auth/login", body)
        },

        async register(body) {
            return await api.post("/auth/register", body)
        },

/*        async reponse() {
            return await api.get("/", {headers: {"Authorization": `Bearer ${this.$state.jwt}`}})
        }*/
    }
})

import {api} from './api'
import {defineStore} from "pinia";

export const AuthStore = defineStore('AuthStore', {
    state: () => {
        return {
            logged: false,
            userId: null
        }
    },
    actions: {
        async login(body) {
            return await api.post("/auth/login", body)
        },

        async register(body) {
            return await api.post("/auth/register", body)
        }
    }
})

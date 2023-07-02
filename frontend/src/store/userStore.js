import {api} from './api'
import {defineStore} from "pinia";
import {AuthStore} from "@/store/authStore";
export const UserStore = defineStore('UserStore', {
    state: () => {
    },
    persist: true,
    actions: {
        async buscarPorId(id) {
            const authStore = AuthStore()
            return await api.get(`/user/${id}`,{headers: {"Authorization": `Bearer ${authStore.jwt}`}})
        },
    }
})

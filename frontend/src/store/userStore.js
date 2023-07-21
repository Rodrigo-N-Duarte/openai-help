import {api} from './api'
import {defineStore} from "pinia";
export const UserStore = defineStore('UserStore', {
    state: () => {
    },
    persist: true,
    actions: {
        async findById(id) {
            return await api.get(`/user/${id}`)
        },
        async findAll() {
            return await api.get(`/user`)
        },
        async getHistory(id) {
            return await api.get(`/user/purchase-history/${id}`)
        }
    }
})

import {defineStore} from "pinia";
import {api} from "@/store/api";
import {AuthStore} from "@/store/authStore";
export const ItemStore = defineStore("itemStore", {
    state: () => {},
    actions: {
        async getAllItems() {
            const authStore = new AuthStore()
            return await api.get(`/item/${authStore.id}`)
        },
        async purchaseItem(itemId) {
            const authStore = new AuthStore()
            return await api.post(`/item/purchase`, {
                itemId: itemId,
                userId: authStore.id
            })
        }
    }
})

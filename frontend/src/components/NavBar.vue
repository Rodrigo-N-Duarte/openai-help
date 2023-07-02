<template>
    <v-app-bar>
            <v-app-bar-nav-icon size="x-large" @click="navbar = !navbar"></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer
            v-model="navbar"
            absolute
            bottom
            temporary
            width="400"
    >
        <v-list class="ma-10">
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="text-h6">
                        {{ user ? user.name : null }}
                    </v-list-item-title>
                    <v-list-item-subtitle>{{ user ? user.email : null }}</v-list-item-subtitle>
                </v-list-item-content>

            </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list
                class="ml-8 mt-10"
                dense
                nav
        >
            <v-list-item v-for="item in items" :key="item">
                <v-icon style="margin-right: 20px">{{ item.icon }}</v-icon>
                <span>{{ item.text }}</span>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
import {UserStore} from "@/store/userStore";
import {AuthStore} from "@/store/authStore";

export default {
    name: "NavBar",
    data() {
        return {
            user: null,
            navbar: false,
            selectedItem: 0,
            items: [
                {text: 'Dashboard', icon: 'mdi-home'},
                {text: 'Logout', icon: 'mdi-logout'},
            ],
        }
    },
    methods: {
        async buscarUsuarioPorId() {
            const userStore = new UserStore()
            const authStore = new AuthStore()
            const res = await userStore.buscarPorId(authStore.id)
            this.user = res.data
            console.log( res)
            console.log(this.user)
        }
    },
    async beforeMount() {
        await this.buscarUsuarioPorId()
    }
}
</script>

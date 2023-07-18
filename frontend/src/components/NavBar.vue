<template>
    <v-app-bar class="px-20 background-default" elevation="0">
        <v-row justify="start">
            <v-col cols="1">
                <span class="mx-10 font-weight-light">NAME</span>
            </v-col>
            <v-col cols="11">
                <v-row>
                    <v-col cols="1" class="nav-item" align="center">
                        <span class="font-weight-medium ">Loja</span>
                    </v-col>
                    <router-link to="/rank" class="link-default nav-item">
                        <v-col cols="1" class="nav-item" align="center">
                            <span class="font-weight-medium ">Classificação</span>
                        </v-col>
                    </router-link>
                    <v-col cols="1" class="nav-item" align="center" @click="logout">
                        <span class="font-weight-medium ">Logout</span>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-app-bar>
</template>

<script>
import {AuthStore} from "@/store/authStore";

export default {
    name: "NavBar",
    data() {
        return {
            authStore: new AuthStore(),
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
        async logout() {
            try {
                await this.authStore.logoutUser(this.authStore.id).then(() => {
                    this.authStore.id = null
                    this.authStore.jwt = null
                    this.authStore.logged = false
                    this.$router.push("/login")
                    })
            } catch (e) {
                console.log(e)
            }
        }
    }
}
</script>

<style>
.nav-item {
    height: 100% !important;
}
.nav-item:hover {
    background-color: #282828;
    cursor: pointer;
}
</style>

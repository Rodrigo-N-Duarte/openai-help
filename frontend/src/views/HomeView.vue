<template>
    <v-row>
        <NavBar></NavBar>
        <v-container class="px-25">
            <v-row>
                <SideMenu></SideMenu>
                <v-col cols="12" lg="10">
                    <v-row>
                        <v-col>
                            <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>
                            <div v-if="user" class="container-welcome">
                                <h2>Olá, <span class="text-capitalize">{{user.name}}! </span>{{getHour()}}</h2>
                                <h3>Espero que esteja bem! Qual será a ferramenta da plataforma que irá utilizar hoje?</h3>
                                <h4 style="margin-top: 5%">Aqui estão algumas de suas estatísticas:</h4>
                            </div>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
    </v-row>
</template>
<script>
import {AuthStore} from "@/store/authStore";
import {UserStore} from "@/store/userStore";
import SideMenu from "@/components/SideMenu.vue";
import NavBar from "@/components/NavBar.vue";
import {mapState} from "pinia";

export default {
    name: "HomeView",
    components: {NavBar, SideMenu},
    computed: {
      ...mapState(UserStore, ['findById'])
    },
    data() {
        return {
            authStore: new AuthStore(),
            user: null,
            breadcrumbs: [
            {
                title: 'Geral',
                disabled: true,
            },
            {
                title: 'Dashboard',
                disabled: false,
                href: '/',
            },
            ]
        }
    },
    methods: {
        async findUserById() {
            const res = await this.findById(this.authStore.id)
            this.user = res.data
        },
        getHour() {
            const hour = new Date().getHours()
            return hour >= 18 && hour <= 23 ? 'Boa noite.' : hour >= 13 ? 'Boa tarde.' : 'Bom dia.'
        }
    },
    async beforeMount() {
        if (!this.authStore.logged) {
            this.$router.push("/login")
        }
        await this.findUserById()
    },

}
</script>

<style>

.px-20 {
    margin-right: 10% !important;
    margin-left: 10% !important;
}

.px-25 {
    margin-right: 12.5% !important;
    margin-left: 12.5% !important;
}
.container-welcome {
    background-image: linear-gradient(90deg, #3e8ed0, #00dcdc);
    padding: 30px 50px 30px 50px;
    flex-wrap: wrap;
}

</style>

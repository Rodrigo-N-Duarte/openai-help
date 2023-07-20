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
                            <v-row v-if="user">
                                <v-col align="center" cols="12">
                                    <div>
                                        <v-avatar size="200" style="background-color: #e8e8e8">
                                            <v-icon size="120">mdi-account-outline</v-icon>
                                        </v-avatar>
                                        <h1 class="text-capitalize font-weight-light mt-10">{{ user.name }}</h1>
                                        <h2 class="font-weight-light mt-1">{{ user.email }}</h2>
                                    </div>
                                </v-col>
                                <v-col cols="12">
                                    <h3 class="mb-8">Meus dados</h3>
                                    <v-row justify="space-evenly">
                                        <v-tooltip location="bottom" text="ID de usuário">
                                            <template v-slot:activator="{ props }">
                                                <v-col align="center" cols="12" lg="2">
                                                    <div v-bind="props">
                                                        <div class="item-profile"
                                                             style="display: flex; flex-direction: column">
                                                            <span class="item-title">ID:</span>
                                                            <span class="item-content">#{{ user.id }}</span>
                                                        </div>
                                                    </div>
                                                </v-col>
                                            </template>
                                        </v-tooltip>
                                        <v-tooltip location="bottom" text="Nível de usuário">
                                            <template v-slot:activator="{ props }">
                                                <v-col align="center" cols="12" lg="2">
                                                    <div v-bind="props">
                                                        <div class="item-profile"
                                                             style="display: flex; flex-direction: column">
                                                            <span class="item-title">Nível:</span>
                                                            <span class="item-content">{{ user.level }}</span>
                                                        </div>
                                                    </div>
                                                </v-col>
                                            </template>
                                        </v-tooltip>
                                        <v-tooltip location="bottom" text="Pontuação total">
                                            <template v-slot:activator="{ props }">
                                                <v-col align="center" cols="12" lg="2">
                                                    <div v-bind="props">
                                                        <div class="item-profile"
                                                             style="display: flex; flex-direction: column">
                                                            <span class="item-title">Pontos:</span>
                                                                <div style="display: flex; justify-content: center; align-items: center">
                                                                    <span class="item-content mr-1">{{ user.points }}</span>
                                                                    <v-icon>mdi-currency-usd</v-icon>
                                                                </div>
                                                        </div>
                                                    </div>
                                                </v-col>
                                            </template>
                                        </v-tooltip>
                                        <v-tooltip location="bottom" text="Data de registro">
                                            <template v-slot:activator="{ props }">
                                                <v-col align="center" cols="4" lg="2">
                                                    <div v-bind="props">
                                                        <div
                                                             style="display: flex; flex-direction: column" class="mt-10">
                                                            <span class="item-title">Data de entrada:</span>
                                                            <span class="font-weight-black" style="font-size: 25px">{{ formatDate(user.registeredDate) }}</span>
                                                        </div>
                                                    </div>
                                                </v-col>
                                            </template>
                                        </v-tooltip>
                                    </v-row>
                                </v-col>
                                <v-divider class="my-5"></v-divider>
                                <v-col cols="12">
                                    <v-row>
                                        <v-col>
                                            <h3 class="mb-2">XP</h3>
                                        </v-col>
                                    </v-row>
                                    <v-row justify="space-evenly">
                                        <v-col align="start">
                                            <h3 class="font-weight-regular mb-4">Barra de progresso de experiência: </h3>
                                            <h4 class="font-weight-regular mb-4">{{user.points}}/100 </h4>
                                            <v-progress-linear
                                                    v-model="user.points"
                                                    color="#00dcdc"
                                                    height="25"
                                                    max="100"
                                            ></v-progress-linear>
                                        </v-col>
                                    </v-row>
                                </v-col>
                                <v-divider class="my-5"></v-divider>
                                <v-col>
                                    <h3 class="mb-8">Conquistas</h3>
                                    <v-row>
                                        <p>Nenhuma conquista por enquanto</p>
                                    </v-row>
                                </v-col>
                            </v-row>
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
import {formatDate} from "@/utils/formatDate";

export default {
    name: "ProfileView",
    components: {NavBar, SideMenu},
    computed: {
        ...mapState(UserStore, ['findById'])
    },
    data() {
        return {
            authStore: new AuthStore(),
            user: null,
            xp: 20,
            breadcrumbs: [
                {
                    title: 'Geral',
                    disabled: true,
                },
                {
                    title: 'Perfil',
                    disabled: false,
                    href: '/profile',
                },
            ]
        }
    },
    methods: {
        formatDate,
        async findUserById() {
            await this.findById(this.authStore.id)
                .then((res) => {
                    this.user = res.data
                    console.log(this.user)
                })
        },
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

.item-profile {
    background-color: #2f2f2f;
    border-radius: 100px;
    width: 150px;
    height: 150px;
    cursor: pointer;
    padding: 40px;
}

.item-title {
font-size: 18px;
    font-family: monospace;
}

.item-content {
    font-weight: bold;
    font-size: 30px;
    font-family: Samanata,serif;
}

</style>

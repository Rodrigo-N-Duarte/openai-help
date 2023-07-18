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
                            <v-row class="ma-2">
                                <v-col>
                                    <v-row>
                                        <h3>Classificação dos usuários:</h3>
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            <div>
                                                <v-table class="rank-table">
                                                    <thead>
                                                    <tr>
                                                        <th class="text-left">
                                                            #ID
                                                        </th>
                                                        <th class="text-left">
                                                            Nome
                                                        </th>
                                                        <th class="text-left">
                                                            Email
                                                        </th>
                                                        <th class="text-left">
                                                            Level
                                                        </th>
                                                        <th class="text-left">
                                                            <v-icon size="small">mdi-currency-usd</v-icon>Points
                                                        </th>
                                                        <th class="text-left">
                                                            XP
                                                        </th>
                                                        <th class="text-left">
                                                            Data de entrada
                                                        </th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr
                                                        v-for="user in users"
                                                        :key="user.id"
                                                    >
                                                        <td>{{ user.id }}</td>
                                                        <td>{{ user.name }}</td>
                                                        <td>{{ user.email }}</td>
                                                        <td>{{ user.level }}</td>
                                                        <td>{{ user.points }}</td>
                                                        <td>{{ user.xp }}</td>
                                                        <td>{{ formatDate(user.registeredDate) }}</td>
                                                    </tr>
                                                    </tbody>
                                                </v-table>
                                            </div>
                                        </v-col>
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
import {formatDate} from "../utils/formatDate";

export default {
    name: "RankView",
    components: {NavBar, SideMenu},
    computed: {
        ...mapState(UserStore, ['findAll'])
    },
    data() {
        return {
            authStore: new AuthStore(),
            users: null,
            breadcrumbs: [
                {
                    title: 'Geral',
                    disabled: true,
                },
                {
                    title: 'Classificação',
                    disabled: false,
                    href: '/rank',
                },
            ],
        }
    },
    methods: {
        formatDate,
        async findAllUsers() {
            await this.findAll()
                .then((res) => this.users = res.data)
        }
    },
    async beforeMount() {
        if (!this.authStore.logged) {
            this.$router.push("/login")
        }
        await this.findAllUsers()
    },

}
</script>

<style>
.rank-table {
    background-color: inherit;
    border: 1px solid lightgray;

}
.rank-table th, tr, thead, tbody, td {
    color: white !important ;
    border: 1px solid lightgray !important;
}
</style>

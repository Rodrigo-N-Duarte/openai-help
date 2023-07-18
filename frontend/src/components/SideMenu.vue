<template>
    <v-col cols="0" lg="2">
        <div class="mb-7">
            <h3 class="mb-3 menu-subtitle">Geral</h3>
            <v-sheet class="ml-5 background-default">
                <router-link to="/" class="link-default">
                    <h4 class="my-3 menu-item">Dashboard</h4>
                </router-link>
                <router-link to="/profile" class="link-default">
                    <h4 class="my-3 menu-item">Perfil</h4>
                </router-link>
                <router-link to="/itens" class="link-default">
                    <h4 class="my-3 menu-item">Itens</h4>
                </router-link>
                <router-link to="/history" class="link-default">
                    <h4 class="my-3 menu-item">Histórico</h4>
                </router-link>
            </v-sheet>
        </div>
    </v-col>
</template>

<script>

export default {
    name: "SideMenu",
    data() {
        return {

        }
    },
    methods: {}
}
</script>

<style>
.menu-subtitle {
    color: #e1e1e1;
}
.menu-item {
    width: 30% !important;
}
.menu-item:hover {
    color: #3e8ed0;
    cursor: pointer;
}
.link-default {
    text-decoration: none;
    color: inherit;
}
</style>

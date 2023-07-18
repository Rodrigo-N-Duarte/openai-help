<template>
    <v-app class="background-default">
        <v-main>
            <router-view/>
        </v-main>
    </v-app>
</template>

<script>
export default {
    name: 'App',
    data() {
        return {
            currentRoute: null
        }
    },
    methods: {},
}
</script>

<style>
.background-default {
    background-color: #1b1b1b !important;
    color: aliceblue !important;
}

.basic-alert {
    background-color: black !important;
    color: aliceblue !important
}
.basic-alert h5 {
    color: aliceblue !important
}
</style>

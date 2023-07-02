<template>
    <NavBar></NavBar>
</template>
<script>
import {AuthStore} from "@/store/authStore";
import {UserStore} from "@/store/userStore";
import NavBar from "@/components/NavBar.vue";

export default {
    name: "HomeView",
    components: {NavBar},
    data() {
        return {
            authStore: new AuthStore(),
            userStore: new UserStore(),
            user: null
        }
    },
    methods: {

    },
    beforeMount() {
        if (!this.authStore.logged) {
            this.$router.push("/login")
        }
    }
}
</script>

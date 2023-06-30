<template>
    <NavBar />
</template>
<script>
import NavBar from "@/components/NavBar.vue";
import {AuthStore} from "@/store/authStore";
export default {
  name: "HomeView",
  components: {NavBar},
  data() {
    return {
      authStore: new AuthStore()
    }
  },
  beforeMount() {
    if (!this.authStore.logged) {
      this.$router.push("/login")
    }
  }
}
</script>
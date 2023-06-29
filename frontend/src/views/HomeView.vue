<template>home</template>
<script>
import {AuthStore} from "@/store/authStore";

export default {
  name: "HomeView",
  data() {
    return {
      authStore: new AuthStore()
    }
  },
  beforeMount() {
    this.authStore.logged ? null : this.$router.push("/login")
  }
}
</script>
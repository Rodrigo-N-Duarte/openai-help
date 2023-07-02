<template>
  <v-row justify="center" v-if="login">
    <VCard
        class="auth-card pa-4 pt-7 form-login-container"
        max-width="448"
        elevation="24"
    >
      <VCardItem class="justify-center">
        <template #prepend>
          <div class="d-flex">
            <div
                class="d-flex text-primary"
            />
          </div>
        </template>

        <VCardTitle class="text-2xl font-weight-bold">
          Login
        </VCardTitle>
      </VCardItem>
      <VCardText class="pt-2">
        <h5 class="text-h5 mb-1">
          Bem-vindo de volta! 👋🏻
        </h5>
        <p class="mb-0">
          Por favor faça seu login ou cadastre-se.
        </p>
      </VCardText>
      <VCardText>
        <VForm @submit.prevent="$router.push('/')">
          <VRow>
            <!-- email -->
            <VCol cols="12">
              <VTextField
                  v-model="email"
                  placeholder="seunome@email.com"
                  label="Email"
                  type="email"
              />
            </VCol>

            <VCol cols="12">
                          <VTextField
                              v-model="password"
                              label="Senha"
                              placeholder="············"
                              :type="showPassword ? 'text' : 'password'"
                              :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                              @click:append-inner="showPassword = !showPassword"
                          />
            </VCol>
            <v-row justify="center my-2">
              <v-btn @click="fazerLogin" :loading="loading">Login</v-btn>
            </v-row>
            <VCol
                cols="12"
                class="text-center text-base"
            >
              <span>Novo na plataforma?</span>
              <span
                  class="text-primary ms-2"
                  style="cursor: pointer"
                  @click="login = !login"
              >
                Criar uma conta.
              </span>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </v-row>
  <v-row justify="center" v-else>
    <VCard
        class="auth-card pa-4 pt-7 form-login-container"
        max-width="448"
        elevation="24"
    >
      <VCardItem class="justify-center">
        <template #prepend>
          <div class="d-flex">
            <div
                class="d-flex text-primary"
            />
          </div>
        </template>

        <VCardTitle class="text-2xl font-weight-bold">
          Cadastre-se
        </VCardTitle>
      </VCardItem>
      <VCardText class="pt-2">
        <h5 class="text-h5 mb-1">
          Bem-vindo! 🎖
        </h5>
        <p class="mb-0">
          Por favor prencha seus dados.
        </p>
      </VCardText>
      <VCardText>
        <VForm @submit.prevent="$router.push('/')">
          <VRow>
            <VCol cols="12">
              <VTextField
                  v-model="newName"
                  label="Nome"
                  placeholder="Seu nome"
                  type="text"
              />
            </VCol>
            <VCol cols="12">
              <VTextField
                  v-model="newEmail"
                  placeholder="seunome@email.com"
                  label="Email"
                  type="email"
              />
            </VCol>
            <VCol cols="12">
              <VTextField
                  v-model="newPassword"
                  label="Senha"
                  placeholder="············"
                  :type="showPassword ? 'text' : 'password'"
                  :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append-inner="showPassword = !showPassword"
              />
            </VCol>
            <VCol cols="12">
              <VTextField
                  v-model="confirmPassword"
                  label="Confirmação da senha"
                  placeholder="············"
                  :type="showPassword ? 'text' : 'password'"
                  :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append-inner="showPassword = !showPassword"
              />
            </VCol>
            <v-row justify="center my-2">
              <v-btn @click="fazerCadastro" :loading="loading">Cadastrar</v-btn>
            </v-row>
            <VCol
                cols="12"
                class="text-center text-base"
            >
              <span>Já tem conta?</span>
              <span
                  class="text-primary ms-2"
                  style="cursor: pointer"
                  @click="login = !login"
              >
                Fazer login.
              </span>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </v-row>
  <vue-basic-alert
      ref="alert" :duration="30"/>
</template>

<script>
import {defineComponent} from 'vue';
import {AuthStore} from "@/store/authStore";
import VueBasicAlert from 'vue-basic-alert'
import {setAlert} from "@/utils/setAlert";

export default defineComponent({
  name: 'HomeView',
  components: {VueBasicAlert},
  data() {
    return {
      authStore: new AuthStore(),
      showDialog: false,
      loading: false,
      login: true,
      showPassword: false,
      email: null,
      password: null,
      newName: null,
      newEmail: null,
      newPassword: null,
      confirmPassword: null,
      nameRules: [
        v => !!v || 'Campo obrigatório'
      ],
    }
  },
  methods: {
    async fazerLogin() {
      this.loading = true
      try {
        const res = await this.authStore.login({email: this.email, password: this.password})
        this.setAuthStore(res)
      } catch (e) {
        setAlert(this.$refs.alert, "error", "Erro", e.response.data)
        this.authStore.logged = false
      }
      this.loading = false
    },

    parseJwt(token) {
      try {
        return JSON.parse(atob(token.split('.')[1]));
      } catch (e) {
        return null;
      }
    },

    async fazerCadastro() {
      this.loading = true
      if (!this.newName || !this.newEmail || !this.newPassword || !this.confirmPassword) {
        setAlert(this.$refs.alert, "error", "Erro","Os campos não podem estar vazios.")
      }
      try {
        const res = await this.authStore.register({
          name: this.newName,
          email: this.newEmail,
          password: this.newPassword,
          confirmPassword: this.confirmPassword
        })
        this.setAuthStore(res)
      } catch (e) {
        this.authStore.logged = false
        setAlert(this.$refs.alert, "error", "Erro", e.response.data)
      }
      this.loading = false
    },

    setAuthStore(res) {
      const user = this.parseJwt(res.data)
      this.authStore.id = user.id
      this.authStore.logged = true
      this.authStore.jwt = res.data
      this.$router.push('/')
    }
  },
});
</script>

<style>
.form-login-container {
  margin-top: 7%;
}
</style>


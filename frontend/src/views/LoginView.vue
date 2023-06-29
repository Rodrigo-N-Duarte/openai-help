<template>
  <v-parallax
      src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
  >
    <div v-if="login" class="d-flex flex-column fill-height justify-center align-center text-white">
      <v-sheet class="mx-auto mb-16 login-container" width="400">
        <v-form ref="form">
          <v-text-field
              v-model="email"
              :rules="nameRules"
              label="Email"
              required
          ></v-text-field>
          <v-text-field
              v-model="password"
              :rules="nameRules"
              :type="showPassword ? 'text' : 'password'"
              label="Senha"
              required
          >
            <template v-slot:append>
              <v-icon @click="showPassword = !showPassword">{{ showPassword ? 'mdi-eye-off' : 'mdi-eye' }}</v-icon>
            </template>
          </v-text-field>

          <div class="d-flex flex-column">
            <v-btn
                class="mt-4"
                color="success"
                @click="fazerLogin"
            >
              Login
            </v-btn>
          </div>
          <h4 class="mt-5">Não tem cadastro? <span class="form-login-subtitle"
                                                   @click="login = !login">Clique aqui</span></h4>
        </v-form>
      </v-sheet>
    </div>
    <div v-else class="d-flex flex-column fill-height justify-center align-center text-white">
      <v-sheet class="mx-auto mb-16 login-container" width="400">
        <v-form ref="form">
          <v-text-field
              v-model="newName"
              :rules="nameRules"
              label="Nome"
              required
          ></v-text-field>
          <v-text-field
              v-model="newEmail"
              :rules="nameRules"
              label="Email"
              required
          ></v-text-field>
          <v-text-field
              v-model="newPassword"
              :rules="nameRules"
              :type="showPassword ? 'text' : 'password'"
              label="Senha"
              required
          >
            <template v-slot:append>
              <v-icon @click="showPassword = !showPassword">{{ showPassword ? 'mdi-eye-off' : 'mdi-eye' }}</v-icon>
            </template>
          </v-text-field>
          <v-text-field
              v-model="confirmPassword"
              :rules="nameRules"
              :type="showPassword ? 'text' : 'password'"
              label="Confirmação de senha"
              required
          >
            <template v-slot:append>
              <v-icon @click="showPassword = !showPassword">{{ showPassword ? 'mdi-eye-off' : 'mdi-eye' }}</v-icon>
            </template>
          </v-text-field>

          <div class="d-flex flex-column">
            <v-btn
                class="mt-4"
                color="success"
            >
              Cadastrar
            </v-btn>
          </div>
          <h4 class="mt-5">Já tem cadastro? <span class="form-login-subtitle" @click="login = !login">Clique aqui</span>
          </h4>
        </v-form>
      </v-sheet>
    </div>
  </v-parallax>
</template>

<script>
import { defineComponent } from 'vue';
import {AuthStore} from "@/store/authStore";
export default defineComponent({
  name: 'HomeView',
  data() {
    return {
      authStore: new AuthStore(),
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
      try {
        await this.authStore.login({email: this.email, password: this.password})
        this.authStore.logged = true
        this.$router.push('/')
      }
      catch (e) {
        this.authStore.logged = false
        console.log(e)
      }
    }
  }
});
</script>

<style>
.login-container {
  background-color: aliceblue;
  padding: 30px;
  border-radius: 15px !important;
}

.form-login-subtitle {
  cursor: pointer;
  color: goldenrod;
}
</style>


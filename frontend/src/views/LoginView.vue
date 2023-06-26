<template>
  <v-parallax src="https://cdn.vuetifyjs.com/images/parallax/material.jpg">
    <v-sheet class="mx-auto form-login-container">
      <v-form v-if="login" ref="form">
        <v-text-field
            v-model="email"
            :rules="nameRules"
            label="Email"
            required
            variant="outlined"
            class="input-login"
        ></v-text-field>
        <v-text-field
            v-model="senha"
            :rules="nameRules"
            :type="mostrarSenha ? 'text' : 'password'"
            label="Senha"
            required
            variant="outlined"
            class="input-login"
        >
          <template v-slot:append>
            <v-icon @click="mostrarSenha = !mostrarSenha">{{ mostrarSenha ? 'mdi-eye' : 'mdi-eye-off' }}</v-icon>
          </template>
        </v-text-field>

        <div class="d-flex flex-column">
            <router-link to="/home">
              <v-btn
                  block
                  class="mt-4"
                  color="success"
              >
                Login
              </v-btn>
            </router-link>
          <h5 class="form-login-subtitle">Não tem login? <span style="cursor: pointer" @click="login = !login">Cadastre-se</span>
          </h5>
        </div>
      </v-form>
      <v-form v-else ref="form">
        <v-text-field
            v-model="novoNome"
            :rules="nameRules"
            label="Nome *"
            required
            class="input-login"
        ></v-text-field>
        <v-text-field
            v-model="novoEmail"
            :rules="nameRules"
            label="Email *"
            required
            class="input-login"
        ></v-text-field>
        <v-text-field
            v-model="novaSenha"
            :rules="nameRules"
            :type="mostrarSenha ? 'text' : 'password'"
            label="Senha *"
            required
            class="input-login"
        >
          <template v-slot:append>
            <v-icon @click="mostrarSenha = !mostrarSenha">{{ mostrarSenha ? 'mdi-eye' : 'mdi-eye-off' }}</v-icon>
          </template>
        </v-text-field>
        <v-text-field
            v-model="novaConfirmacaoSenha"
            :rules="nameRules"
            :type="mostrarSenha ? 'text' : 'password'"
            label="Confirmação de senha *"
            required
            class="input-login"
        >
          <template v-slot:append>
            <v-icon @click="mostrarSenha = !mostrarSenha">{{ mostrarSenha ? 'mdi-eye' : 'mdi-eye-off' }}</v-icon>
          </template>
        </v-text-field>

        <div class="d-flex flex-column">
          <v-btn
              block
              class="mt-4"
              color="success"
              @click="validate"
          >
            Cadastrar
          </v-btn>
          <h5 class="form-login-subtitle">Já tem conta? <span @click="login = !login" style="cursor: pointer">Login.</span></h5>
        </div>
      </v-form>
    </v-sheet>
  </v-parallax>
</template>

<script>
export default {
  name: "LoginView",
  data() {
    return {
      email: null,
      senha: null,
      login: true,
      novoNome: null,
      novoEmail: null,
      novaSenha: null,
      mostrarSenha: false,
      novaConfirmacaoSenha: null,
      nameRules: [
        v => !!v || 'Campo obrigatório.'
      ],
    }
  },
  methods: {
    async validate() {
      const {valid} = await this.$refs.form.validate()

      if (valid) alert('Form is valid')
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
  },
}
</script>

<style>
.form-login-container {
  margin-top: 10%;
  width: 30%;
  padding: 50px;
  border-radius: 15px;
}
.input-login {
  margin-bottom: 10px;
}
.form-login-subtitle {
  margin-top: 20px;
}
</style>
<template>
    <v-parallax height="100%"
                src="https://cdn.pixabay.com/photo/2014/08/29/03/02/horses-430441_1280.jpg">
        <div v-if="login" >
            <v-sheet class="mx-auto login-container" width="400">
                <div class="title-form-login">Login</div>
                <v-form ref="form" style="border: 1px solid lightgray; padding: 40px">
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
                            <v-icon @click="showPassword = !showPassword">{{
                                showPassword ? 'mdi-eye-off' : 'mdi-eye'
                                }}
                            </v-icon>
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
        <div v-else>
            <v-sheet class="mx-auto mb-16 login-container" width="400">
                <div class="title-form-login">Cadastro</div>
                <v-form ref="form" style="border: 1px solid lightgray; padding: 40px">
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
                            <v-icon @click="showPassword = !showPassword">{{
                                showPassword ? 'mdi-eye-off' : 'mdi-eye'
                                }}
                            </v-icon>
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
                            <v-icon @click="showPassword = !showPassword">{{
                                showPassword ? 'mdi-eye-off' : 'mdi-eye'
                                }}
                            </v-icon>
                        </template>
                    </v-text-field>

                    <div class="d-flex flex-column">
                        <v-btn
                                class="mt-4"
                                color="success"
                                @click="fazerCadastro"
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
    <vue-basic-alert
            ref="alert" :duration="30"/>
</template>

<script>
import {defineComponent} from 'vue';
import {AuthStore} from "@/store/authStore";
import VueBasicAlert from 'vue-basic-alert'

export default defineComponent({
    name: 'HomeView',
    components: {VueBasicAlert},
    data() {
        return {
            authStore: new AuthStore(),
            showDialog: false,
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
        setAlert(type, title, subtitle) {
            this.$refs.alert
                .showAlert(type, title, subtitle)
        },

        async fazerLogin() {
            try {
                await this.authStore.login({email: this.email, password: this.password})
                this.authStore.logged = true
                this.$router.push('/')
            } catch (e) {
                this.setAlert("error", "Erro", e.response.data)
                this.authStore.logged = false
            }
        },

        async fazerCadastro() {
            if (!this.newName || !this.newEmail || !this.newPassword || !this.confirmPassword || this.newPassword !== this.confirmPassword) {
                return
            }
            try {
                await this.authStore.register({
                    name: this.newName,
                    email: this.newEmail,
                    password: this.confirmPassword
                })
                this.authStore.logged = true
                this.$router.push('/')
            } catch (e) {
                this.authStore.logged = false
                this.setAlert("error", "Erro", e.response.data)
            }
        }
    }
});
</script>

<style>
.login-container {
    background-color: aliceblue;
    margin-top: 15%;
    padding: 30px;
}

.title-form-login {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: lightgray;
    padding: 10px;
    border-radius: 5px;
}


.form-login-subtitle {
    cursor: pointer;
    color: goldenrod;
}
</style>


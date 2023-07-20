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
                            <v-row class="ma-4">
                                <v-col>
                                    <v-row>
                                        <h3>Loja</h3>
                                    </v-row>
                                    <v-row class="my-5">
                                        <v-col v-for="(item, i) in items" :key="item.id" cols="12">
                                            <v-card
                                                    class="mx-auto"
                                                    style="background-color: #2f2f2f; color: aliceblue"
                                            >
                                                <v-card-text>
                                                    <div>
                                                        <p>Item</p>
                                                        <h4 style="font-size: 15px">#{{ item.id }}</h4>
                                                    </div>
                                                    <p class="text-h4 text--primary ma-1">
                                                        {{ item.name }}
                                                    </p>

                                                    <div class="text--primary ma-2 pa-4 my-5 border-dotted justify-center"
                                                         style="width: 200px; font-size: 18px; display: flex">
                                                        <h3>${{ item.price }}</h3>
                                                    </div>
                                                </v-card-text>
                                                <v-card-actions>
                                                    <v-btn
                                                            color="purple"
                                                            variant="text"
                                                            style="font-size: 18px"
                                                            :disabled="item.purchased"
                                                            @click="purchase(item.id)"
                                                    >
                                                        {{item.purchased ? 'Já adquirido' : 'Adquirir'}}
                                                    </v-btn>
                                                    <v-btn
                                                            @click="showDescription[i] = !showDescription[i]"
                                                    >
                                                        <div>
                                                            <span style="font-size: 12px">Descrição</span>
                                                            <v-icon>{{showDescription[i] ? 'mdi-chevron-up' : 'mdi-chevron-down'}}</v-icon>
                                                        </div>
                                                    </v-btn>
                                                </v-card-actions>
                                                <v-expand-transition>
                                                    <div v-show="showDescription[i]">
                                                        <v-divider></v-divider>
                                                        <v-card-text>
                                                            {{ item.description }}
                                                        </v-card-text>
                                                    </div>
                                                </v-expand-transition>
                                            </v-card>
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
import {ItemStore} from "@/store/itemStore";
import SideMenu from "@/components/SideMenu.vue";
import NavBar from "@/components/NavBar.vue";
import {mapState} from "pinia";

export default {
    name: "StoreView",
    components: {NavBar, SideMenu},
    computed: {
        ...mapState(ItemStore, ['getAllItems', 'purchaseItem'])
    },
    data() {
        return {
            authStore: new AuthStore(),
            items: null,
            showDescription: [],
            breadcrumbs: [
                {
                    title: 'Geral',
                    disabled: true,
                },
                {
                    title: 'Loja',
                    disabled: false,
                    href: '/store',
                },
            ],
        }
    },
    methods: {
        async getItems() {
            await this.getAllItems()
                .then((res) => {
                    this.items = res.data
                    this.items.map(() => {
                        this.showDescription.push(false)
                    })
                    console.log(this.items)
                })
        },
      async purchase(id) {
          await this.purchaseItem(id)
              .then(() => {
                alert("Ferramenta já adicionada ao seu perfil")
                this.getItems()
              })
              .catch((e) => {
                alert(e.response.data)
                console.log(e)
              })
      }
    },
    async beforeMount() {
        if (!this.authStore.logged) {
            this.$router.push("/login")
        }
        await this.getItems()
    },

}
</script>

<style>

</style>

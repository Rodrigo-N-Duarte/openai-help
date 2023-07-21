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
              <v-row class="ma-2">
                <v-col>
                  <v-row>
                    <v-col>
                      <v-card class="background-default">
                        <v-parallax>
                          <v-img
                              height="200"
                              width="100%"
                              src="https://cdn.pixabay.com/photo/2018/01/17/20/22/analytics-3088958_1280.jpg"
                              class="text-white"
                          >
                          </v-img>
                        </v-parallax>
                        <v-card-text v-if="history">
                          <v-toolbar
                              class="background-default"
                          >
                            <v-toolbar-title class="text-h6">
                              <h3>Histórico de compras:</h3>
                            </v-toolbar-title>
                          </v-toolbar>
                          <v-timeline density="compact" align="start">
                            <v-timeline-item
                                v-for="item in history"
                                :key="item.id"
                                size="x-small"
                                width="100%"
                            >
                              <v-row align="start">
                                <v-col align="start" cols="12">
                                  <div class="font-weight-bold historic-subtitle">
                                    Dia: {{formatDate(item.datePurchased)}}
                                  </div>
                                  <div class="mb-4">
                                    <div class="font-weight-normal my-5 historic-title">
                                      <strong>{{ item.itemName }}</strong> #{{ item.idItem }}
                                    </div>
                                    <div class="historic-subtitle">Preço: {{ item.itemPrice }}$</div>
                                  </div>
                                  <v-divider color="white" class="border-opacity-100 my-5" ></v-divider>
                                </v-col>
                              </v-row>
                            </v-timeline-item>
                          </v-timeline>
                        </v-card-text>
                        <h3 v-else>Parece que você ainda não fez nenhuma compra, visite a loja para liberar ferramentas.</h3>
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
import SideMenu from "@/components/SideMenu.vue";
import NavBar from "@/components/NavBar.vue";
import {mapState} from "pinia";
import {UserStore} from "@/store/userStore";
import {formatDate} from "../utils/formatDate";

export default {
  name: "PurchaseHistoryView",
  components: {NavBar, SideMenu},
  computed: {
    ...mapState(UserStore, ['getHistory'])
  },
  data() {
    return {
      authStore: new AuthStore(),
      history: null,
      breadcrumbs: [
        {
          title: 'Geral',
          disabled: true,
        },
        {
          title: 'Histórico',
          disabled: false,
          href: '/history',
        },
      ],
    }
  },
  methods: {
    formatDate,
    async getPurchasedHistory() {
      await this.getHistory(this.authStore.id)
          .then((res) => this.history = res.data)
    }
  },
  async beforeMount() {
    if (!this.authStore.logged) {
      this.$router.push("/login")
    }
    await this.getPurchasedHistory()
  },

}
</script>

<style>
.historic-title {
  font-size: 22px;
}
.historic-subtitle {
  font-size: 18px;
}
</style>

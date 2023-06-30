<template>
  <v-sheet class="d-flex flex-column align-start" height="100%" elevation="10" width="15%">
    <h3>info</h3>
    <div>
      <div v-for="icon in infoIcons" :key="icon">
        <v-icon>{{icon.icon}}</v-icon>
        <span>{{icon.text}}</span>
      </div>
    </div>
    <div>
      <span>Pages</span>
      <div v-for="icon in pageIcons" :key="icon">
        <v-icon>{{icon.icon}}</v-icon>
        <span>{{icon.text}}</span>
      </div>
    </div>
    <div>
      <span>User interface</span>
      <div v-for="icon in userIcons" :key="icon">
        <v-icon>{{icon.icon}}</v-icon>
        <span>{{icon.text}}</span>
      </div>
    </div>
  </v-sheet>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      infoIcons: [
        {
          icon: 'mdi-home-outline',
          text: "Dashboard"
        },
        {
          icon: 'mdi-account-outline',
          text: "Configurações da conta"
        }
      ],
      pageIcons: [
        {
          icon: 'mdi-account-plus-outline',
          text: "Login"
        },
        {
          icon: 'mdi-plus',
          text: "Register"
        },
        {
          icon: 'mdi-information-outline',
          text: "Error"
        }
      ],
      userIcons: [
        {
          icon: 'mdi-alpha-t-box-outline',
          text: "Typography"
        },
        {
          icon: 'mdi-eye-outline',
          text: "Icons"
        },
        {
          icon: 'mdi-card-account-details-outline',
          text: "Cards"
        },
        {
          icon: 'mdi-table',
          text: "Tables"
        },
        {
          icon: 'mdi-form-select',
          text: "Forms"
        }
      ]
    }
  }
}
</script>
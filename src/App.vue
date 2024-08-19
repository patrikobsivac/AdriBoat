<template>
  <v-app>
    <v-app-bar
      app
      color="#2a272d"
      dark
    >
      <div class="d-flex align-center">
        <v-btn href="/" class="mr-2">
          <v-img
            alt="Logo"
            class="shrink"
            contain
            src="./assets/boat.svg"
            width="40"
          />
        </v-btn>

      <v-btn href="/" text color="grey lighten-8" class="text-h6">
          AdriBoat
        </v-btn>
      </div>
    
    <v-col align="right">
      <v-btn text class="pa-3" color="grey lighten-6" to="/prijava" v-if="!isUserAuthenticated">
        Login
      </v-btn>
      &nbsp; | 
      <v-btn text class="pa-3" color="grey lighten-6" to="/registracija" v-if="!isUserAuthenticated">
          Register
        </v-btn>
      <v-btn text class="pa-3" color="red lighten-8" v-else @click="Logout()" href="/">
        Logout
      </v-btn>
    </v-col>

    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import { getAuth, onAuthStateChanged } from "../firebase";
export default {
  name: 'App',
  data() {
    return {
      isUserAuthenticated: false
    };
  },

  methods: {
    checkAuthStatus() {
      const auth = getAuth();

      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.isUserAuthenticated = true;
        } else {
          this.isUserAuthenticated = false;
        }
      });

    },

    handleLogout() {
      try {
        console.log("Korisnik odjavljen");
        getAuth().signOut();
      } catch (error) {
        console.log("Logout error", error);
      }
      this.checkAuthStatus();
    }
  },

  mounted() {
    this.checkAuthStatus();
  }
};
</script>

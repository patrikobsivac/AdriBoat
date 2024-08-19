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
	  
	  
	  
</template>

<script>
import HelloWorld from './components/HelloWorld';
export default {
  name: 'App',
  components: {
    HelloWorld,
  },
  data: () => ({
    //
  }),
};
</script>
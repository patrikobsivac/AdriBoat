<template>
  <v-container>
    <h1>Istaknuti plovila</h1>
    <hr>
    <br>
    <v-row>
      <v-col v-for="boat in boats">
        <v-card
          class="mx-auto"
          max-width="350"
          color="#e9e8eb"
        >
          <v-img
            :src="/"
            height="180px"
            class="image-border"
          ></v-img>


          <v-card-subtitle>
            Cijena: {{ formatThousands() }} €
          </v-card-subtitle>

          <v-card-actions>
            <v-btn
              @click="setStates()"
              color="red"
              text
            >
              Zatražite informacije
            </v-btn>
			
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
} 
</script>

<style scoped>
.image-border {
  border: 2px solid #000; 
  border-radius: 5px;
}
</style>
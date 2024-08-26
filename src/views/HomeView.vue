<template>
  <v-container>
    <h1>Istaknuta plovila</h1>
    <hr>
    <br>
    <v-row>
      <v-col v-for="boat in boats" :key="boat.id">
        <v-card
          class="mx-auto"
          max-width="350"
          color="#e9e8eb"
        >
          <v-img
            :src="boat.imageUrl"
            height="180px"
            class="image-border"
          ></v-img>

          <v-card-title>
            {{ boat.boatName }}
          </v-card-title>

          <v-card-subtitle>
            Cijena: {{ formatThousands(boat.cijena) }} €
          </v-card-subtitle>

          <v-card-actions>
            <v-btn
              @click="setStates(boat.id)"
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
import { mapGetters, mapMutations} from "vuex";
export default {
  name: 'HomeView',
  data: () => ({
    boats: [
      {
        id: 1,
        boatName: "2018 Eolo Day 830",
        cijena: 115000.00,
        imageUrl: "https://images.boatsgroup.com/resize/1/94/52/2018-eolo-day-830-power-689452-20240713110352886-0_XLARGE.jpg"
      },
      {
        id: 2,
        boatName: "2022 AquaSpirit S585 CC",
        cijena: 46550.00,
        imageUrl: "https://images.boatsgroup.com/resize/1/36/41/2022-aquaspirit-s585-cc-power-623641-20240702121411427-0_XLARGE.jpg"
      },
      {
        id: 3,
        boatName: "2023 Regal LS2",
        cijena: 108000.00,
        imageUrl: "https://images.boatsgroup.com/resize/1/11/89/2023-regal-ls2-681189-20240622061504041-0_XLARGE.jpg"
      },
      {
        id: 4,
        boatName: "2007 Windy Grand Bora 42",
        cijena: 177000.00,
        imageUrl: "https://images.boatsgroup.com/resize/1/37/33/423733_20220805032532461_0_XLARGE.jpg"
      },
      {
        id: 5,
        boatName: "2021 Jeanneau CAP CAMARAT",
        cijena: 325000.00,
        imageUrl: "https://images.boatsgroup.com/resize/1/21/41/2021-jeanneau-cap-camarat-125-wa-power-9502141-20240811045825764-1_XLARGE.jpg"
      },
      {
        id: 6,
        boatName: "2021 Technohull Explorer 40",
        cijena: 365000.00,
        imageUrl: "https://images.boatsgroup.com/resize/1/5/94/2021-technohull-explorer-40-power-9340594-20240415040739016-1_XLARGE.jpg"
      }
    ]
  }),

  methods: {
    ...mapMutations({ setBoatIme: "setBoatIme", setBoatCijena: "setBoatCijena" }),

    formatThousands(res) {
      return new Intl.NumberFormat('en-US').format(res);
    },

    setStates(boatId) {
      this.setBoatIme(this.boats.find(boat => boat.id === boatId).boatName);
      this.setBoatCijena(this.boats.find(boat => boat.id === boatId).cijena);
      this.$router.push({ name: 'boatDetails', params: { id: boatId } });
    }
  },

  mutations: {
  setBoatIme(state, boatIme) {
    state.boatIme = boatIme;
  },
  setBoatCijena(state, boatCijena) {
    state.boatCijena = boatCijena;
  }
},

  computed: {
    ...mapGetters({ getBoatIme: 'getBoatIme' })
  }
}
</script>

<style scoped>
.image-border {
  border: 2px solid #000; 
  border-radius: 5px;
}
</style>
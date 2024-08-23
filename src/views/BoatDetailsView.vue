<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8">
        <v-card>
          <v-img :src="selectedBoat.image" height="400px"></v-img>
          <v-card-title class="headline">{{ selectedBoat.name }}</v-card-title>
          <v-card-subtitle>{{ selectedBoat.year }} | {{ selectedBoat.brand }}</v-card-subtitle>
          <v-card-text>
            <v-list dense>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Model</v-list-item-title>
                  <v-list-item-subtitle>{{ selectedBoat.model }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Vrsta</v-list-item-title>
                  <v-list-item-subtitle>{{ selectedBoat.type }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Dužina</v-list-item-title>
                  <v-list-item-subtitle>{{ selectedBoat.length }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Fuel Type</v-list-item-title>
                  <v-list-item-subtitle>{{ selectedBoat.fuelType }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title class="headline">Kontaktirajte Prodavača</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field label="Ime i prezime" v-model="form.name"></v-text-field>
              <v-text-field label="Telefon" v-model="form.phone"></v-text-field>
              <v-text-field label="E-mail" v-model="form.email"></v-text-field>
              <v-textarea label="Pitanja/komentari" v-model="form.comments"></v-textarea>
              <v-btn color="red" @click="contactSeller">Kontaktirati Prodavača</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
  
  <script>
  import { db, getAuth, onAuthStateChanged } from "firebase/auth";
  import { addDoc, collection } from 'firebase/firestore/lite';
  export default {
    data() {
      return {
        boats: [
          {
            id: 1,
            name: 'Eolo Day 830',
            image: 'https://images.boatsgroup.com/resize/1/94/52/2018-eolo-day-830-power-689452-20240713110352886-0_XLARGE.jpg',
            year: 2018,
            brand: 'Eolo',
            model: 'Day 830',
            type: 'Power',
            length: '8.3m',
            fuelType: 'Gasoline'
          },
          {
            id: 2,
            name: 'AquaSpirit S585 CC',
            image: 'https://images.boatsgroup.com/resize/1/36/41/2022-aquaspirit-s585-cc-power-623641-20240702121411427-0_XLARGE.jpg',
            year: 2022,
            brand: 'AquaSpirit',
            model: 'S585 CC',
            type: 'Power',
            length: '5.85m',
            fuelType: 'Gasoline'
          },
          {
            id: 3,
            name: 'Regal LS2',
            image: 'https://images.boatsgroup.com/resize/1/11/89/2023-regal-ls2-681189-20240622061504041-0_XLARGE.jpg',
            year: 2023,
            brand: 'Regal',
            model: 'LS2',
            type: 'Power',
            length: '6.8m',
            fuelType: 'Gasoline'
          },
          {
            id: 4,
            name: 'Windy Grand Bora 42',
            image: 'https://images.boatsgroup.com/resize/1/37/33/423733_20220805032532461_0_XLARGE.jpg',
            year: 2007,
            brand: 'Windy',
            model: 'Grand Bora 42',
            type: 'Sail',
            length: '12.8m',
            fuelType: 'Diesel'
          },
          {
            id: 5,
            name: 'Jeanneau CAP CAMARAT',
            image: 'https://images.boatsgroup.com/resize/1/21/41/2021-jeanneau-cap-camarat-125-wa-power-9502141-20240811045825764-1_XLARGE.jpg',
            year: 2021,
            brand: 'Jeanneau',
            model: 'CAP CAMARAT',
            type: 'Power',
            length: '12.5m',
            fuelType: 'Gasoline'
          },
          {
            id: 6,
            name: 'Technohull Explorer 40',
            image: 'https://images.boatsgroup.com/resize/1/5/94/2021-technohull-explorer-40-power-9340594-20240415040739016-1_XLARGE.jpg',
            year: 2021,
            brand: 'Technohull',
            model: 'Explorer 40',
            type: 'Power',
            length: '12m',
            fuelType: 'Gasoline'
          }
        ],
        selectedBoat: null,
      form: {
        name: '',
        phone: '',
        email: '',
        comments: ''
      },
    }
  },
  mounted() {
    const id = this.$route.params.id;
    this.selectedBoat = this.boats.find(boat => boat.id === parseInt(id));

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
  },
  methods: {
    async submitForm() {
      const formIsValid = this.$refs.formRef.validate();
      if (!formIsValid) {
        return;
      }

      try {
        const formData = {
          name: this.form.name,
          phone: this.form.phone,
          email: this.form.email,
          comments: this.form.comments,
          selectedBoat: this.selectedBoat
        };

        const docRef = await addDoc(collection(db, 'boatDetails'), formData);
        console.log('Podaci su uspješno spremljeni s ID-om:', docRef.id);

        this.form.name = '';
        this.form.phone = '';
        this.form.email = '';
        this.form.comments = '';
        this.selectedBoat = null;
        this.$refs.formRef.reset();
      } catch (error) {
        console.error('Pogreška pri spremanju podataka:', error);
      }
    }
  }
};
</script>
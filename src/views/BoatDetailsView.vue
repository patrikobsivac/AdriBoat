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
                  <v-list-item-title>Garancija trupa</v-list-item-title>
                  <v-list-item-subtitle>{{ selectedBoat.hullWarranty }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Nudi</v-list-item-title>
                  <v-list-item-subtitle>{{ selectedBoat.offers }}</v-list-item-subtitle>
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
                  <v-list-item-title>Materijal trupa</v-list-item-title>
                  <v-list-item-subtitle>{{ selectedBoat.hullMaterial }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Tip goriva</v-list-item-title>
                  <v-list-item-subtitle>{{ selectedBoat.fuelType }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Opis</v-list-item-title>
                  <v-list-item-subtitle style="white-space: pre-line">{{ selectedBoat.description }}</v-list-item-subtitle>
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
              <v-textarea label="Pitanja/komentari" v-model="form.comments" placeholder="Zanima me više informacija o *naziv plovila*. Molim kontaktirajte me. "></v-textarea>
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
            type: 'Bowrider Plovila',
            length: '9m',
            fuelType: 'Plinski',
            hullMaterial: 'Stakloplastika',       
            hullWarranty: '5 godina',     
            offers: 'Privatni prodavač', 
            description: 'Plaćena zimnica do travnja 2025., mogućnost preuzimanja veza.' 
          },
          {
            id: 2,
            name: 'AquaSpirit S585 CC',
            image: 'https://images.boatsgroup.com/resize/1/36/41/2022-aquaspirit-s585-cc-power-623641-20240702121411427-0_XLARGE.jpg',
            year: 2022,
            brand: 'AquaSpirit',
            model: 'S585 CC',
            type: 'Kruti Sportski Gumenjaci',
            length: '5.85m',
            fuelType: 'Plinski',
            hullMaterial: 'Fiberglass',       
            hullWarranty: '5 godina',     
            offers: 'Privatni prodavač', 
            description: 'Prvo zalijevanje 07/2023. Brod je 2022. godine, korišten samo za odmor, stanje kao novo, Maksimalni broj osoba: 8. Brod, motor i prikolica još uvijek imaju punu garanciju!' 
          },
          {
            id: 3,
            name: 'Regal LS2',
            image: 'https://images.boatsgroup.com/resize/1/11/89/2023-regal-ls2-681189-20240622061504041-0_XLARGE.jpg',
            year: 2023,
            brand: 'Regal',
            model: 'LS2',
            type: 'Sportska Plovila',
            length: '6.81m',
            fuelType: 'Plinski',
            hullMaterial: 'Stakloplastika',
            hullWarranty: '10 godina',      
            offers: 'Privatni prodavač', 
            description: 'Istražite luksuz u Regal bowrideru bez premca u svom luksuzu i stilu. LS2 podiže ljestvicu onoga što brod od 22′ može i treba biti.' 
          },
          {
            id: 4,
            name: 'Windy Grand Bora 42',
            image: 'https://images.boatsgroup.com/resize/1/37/33/423733_20220805032532461_0_XLARGE.jpg',
            year: 2007,
            brand: 'Windy',
            model: 'Grand Bora 42',
            type: 'Motorne Jahte',
            length: '12m',
            fuelType: 'Dizel',
            hullMaterial: 'Kompozitni Materijal', 
            hullWarranty: '10 godina',          
            offers: 'Privatni prodavač', 
            description: 'Elegantna, sportska motorna jahta proizvedena u renomiranom norveškom brodogradilištu Windy Boats, poznata po visokoj kvaliteti izrade i izvrsnim performansama na vodi. Model Grand Bora 42 dio je popularne Windy serije, spajajući luksuz s iznimnim manevarskim sposobnostima.' 
          },
          {
            id: 5,
            name: 'Jeanneau CAP CAMARAT',
            image: 'https://images.boatsgroup.com/resize/1/21/41/2021-jeanneau-cap-camarat-125-wa-power-9502141-20240811045825764-1_XLARGE.jpg',
            year: 2021,
            brand: 'Jweanneau',
            model: 'CAP CAMARAT',
            type: 'Center Console Plovila',
            length: '11.90m',
            fuelType: 'Dizel',
            hullMaterial: 'Kompozitni Materijal',         
            hullWarranty: '10 godina',     
            offers: 'ALL YACHT MONTE-CARLO - ALL YACHT MC', 
            description: 'Luksuzni, višenamjenski kruzer sportskog karaktera, kreiran u renomiranom francuskom brodogradilištu Jeanneau. Ovo je plovilo iz linije Cap Camarat poznato po visokoj kvaliteti izrade, inovativnim rješenjima i izvrsnim performansama.' 
          },
          {
            id: 6,
            name: 'Technohull Explorer 40',
            image: 'https://images.boatsgroup.com/resize/1/5/94/2021-technohull-explorer-40-power-9340594-20240415040739016-1_XLARGE.jpg',
            year: 2021,
            brand: 'Technohull',
            model: 'Explorer 40',
            type: 'Kruti Sportski Gumenjaci',
            length: '12.10m',
            fuelType: 'Plinski',
            hullMaterial: 'Stakloplastika',     
            hullWarranty: '5 godina',     
            offers: 'Riginos Yachts SA', 
            description: 'Luksuzni, brzi motornog tipa RIB (kruto gumeni) iz brodogradilišta Technohull, poznatog po klasi rekreacijskih i sportskih plovila. Dizajniran je imajući na umu performanse, udobnost i svestranost.' 
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
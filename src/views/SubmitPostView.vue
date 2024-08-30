<template>
    <v-container>
      <v-form @submit.prevent="submitBoat">
        <v-row>
          <v-col cols="12">
            <v-file-input
              v-model="boat.image"
              label="Drag and drop or click to upload boat image"
              prepend-icon="mdi-image"
              accept="image/*"
              show-size
              required
              :drop-zone="true"
              @change="handleFileChange"
            >
              <template v-slot:selection="{ file }">
                <v-img :src="imagePreview" height="200px"></v-img>
                <div>{{ file.name }}</div>
              </template>
            </v-file-input>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field v-model="boat.name" label="Boat Name" required></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field v-model="boat.year" label="Year" required></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field v-model="boat.brand" label="Brand" required></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field v-model="boat.model" label="Model" required></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field v-model="boat.type" label="Type" required></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field v-model="boat.length" label="Length (m)" required></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-select v-model="boat.fuelType" :items="['Dizel', 'Plinski']" label="Fuel Type" required></v-select>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field v-model="boat.hullMaterial" label="Hull Material" required></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field v-model="boat.hullWarranty" label="Hull Warranty" required></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field v-model="boat.offers" label="Offers" required></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-textarea v-model="boat.description" label="Description" required></v-textarea>
          </v-col>
          <v-col cols="12">
            <v-btn color="red" type="submit">Objavi oglas</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </template>
  
  <script>
  import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
  import { storage } from "../../firebase"; 
  import { mapActions } from "vuex";
  
  export default {
    data() {
      return {
        boat: {
          image: null,
          name: "",
          year: "",
          brand: "",
          model: "",
          type: "",
          length: "",
          fuelType: "",
          hullMaterial: "",
          hullWarranty: "",
          offers: "",
          description: ""
        },
        imagePreview: null
      };
    },
    methods: {
      ...mapActions(["addBoat"]),
      handleFileChange(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreview = e.target.result;
        };
        if (file) {
          reader.readAsDataURL(file);
        }
      },
      async uploadImage(file) {
        const storageRef = ref(storage, `boats/${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        return await getDownloadURL(snapshot.ref);
      },
      async submitBoat() {
        if (this.boat.image) {
          const imageUrl = await this.uploadImage(this.boat.image);
          this.boat.image = imageUrl;
        }
        await this.addBoat(this.boat);
        this.$router.push("/");
      }
    }
  };
  </script>
  
  
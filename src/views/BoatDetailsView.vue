<template>
    <div>
      <h1>Detalji</h1>
      <div v-if="selectedBoat">
        <h2>{{ selectedBoat.name }}</h2>
        <img :src="selectedBoat.image" alt="Boat Image" style="max-width: 500px; margin: 20px;">
        <ul style="font-size: 18px;">
          <li>Year: {{ selectedBoat.year }}</li>
          <li>Brand: {{ selectedBoat.brand }}</li>
          <li>Model: {{ selectedBoat.model }}</li>
          <li>Type: {{ selectedBoat.type }}</li>
          <li>Length: {{ selectedBoat.length }}</li>
          <li>Fuel Type: {{ selectedBoat.fuelType }}</li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
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
        selectedBoat: null
      }
    },
    mounted() {
      const id = this.$route.params.id;
      this.selectedBoat = this.boats.find(boat => boat.id === parseInt(id));
    }
  }
  </script>
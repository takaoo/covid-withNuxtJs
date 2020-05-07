<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-center">
        <!-- <GmapMap
          :center="{lat:36, lng:140}"
          :zoom="7"
          map-type-id="terrain"
          style="width: 700px; height: 300px"
        >
        </GmapMap>-->
        <div v-for="(value, name) in global" :key="name">{{ name }}: {{ value }}</div>

        <v-card>
          <v-card-title>
            Summary
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table :headers="headers" :items="countries" :search="search"></v-data-table>
        </v-card>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
import axios from 'axios'

export default {
  data: () => ({
    global: [],
    countries: [],
    search: '',
    headers: [
      {
        text: 'Country',
        align: 'start',
        sortable: false,
        value: 'Country'
      },
      { text: 'TotalConfirmed', value: 'TotalConfirmed' },
      { text: 'TotalDeaths', value: 'TotalDeaths' },
      { text: 'TotalRecovered', value: 'TotalRecovered' }
    ]
  }),
  components: {
    Logo,
    VuetifyLogo
  },
  mounted() {
    axios.get('https://api.covid19api.com/summary').then((response) => {
      this.global = response.data.Global
      this.countries = response.data.Countries
      console.log(this.global, this.countries)
    })
  }
}
</script>

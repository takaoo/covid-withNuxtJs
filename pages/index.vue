<template>
  <v-layout column justify-center align-center>
    <v-flex>
      <div class="text-center">
        <!-- <GmapMap
          :center="{lat:36, lng:140}"
          :zoom="7"
          map-type-id="terrain"
          style="width: 700px; height: 300px"
        >
        </GmapMap>-->

        <v-card class="ma-1">
          <v-card-title>Global ( {{date}} )</v-card-title>
          <v-card-text>
            <div v-for="(value, name) in global" :key="name">{{ name }}: {{ value }}</div>
          </v-card-text>
          <v-row justify="center">
            {{global.TotalConfirmed}}
            <v-divider vertical />
            {{global.TotalRecovered}}
            <v-divider vertical />
            {{global.TotalDeaths}}
          </v-row>
        </v-card>

        <v-card class="ma-1">
          <v-card-title>
            Summary
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search Country Name"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <no-ssr>
            <v-data-table
              :headers="headers"
              :items="countries"
              :search="search"
              dense
              :sort-by="['TotalConfirmed']"
              :sort-desc="[true]"
              :items-per-page="20"
            />
          </no-ssr>
        </v-card>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
import axios from 'axios'
import moment from 'moment'

export default {
  data: () => ({
    global: [],
    countries: [],
    date: '',
    search: '',
    headers: [
      {
        text: 'Country',
        align: 'start',
        sortable: false,
        value: 'Country'
      },
      { text: 'NewConfirmed', value: 'NewConfirmed' },
      { text: 'NewDeaths', value: 'NewDeaths' },
      { text: 'NewRecovered', value: 'NewRecovered' },
      {
        text: 'TotalConfirmed',
        value: 'TotalConfirmed',
        filter: (value) => {
          if (value) return true
        }
      },
      { text: 'TotalDeaths', value: 'TotalDeaths' },
      { text: 'TotalRecovered', value: 'TotalRecovered' }
    ],
    options: []
  }),
  beforeCreate() {
    axios.get('https://api.covid19api.com/summary').then((response) => {
      this.global = response.data.Global
      this.countries = response.data.Countries
      this.date = moment(response.data.Date).format('MMMM Do YYYY')
      console.log(this.global, this.countries)
    })
  }
}
</script>

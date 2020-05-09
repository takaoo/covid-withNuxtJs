<template>
  <v-layout>
    <v-flex class="text-center">
      <v-select :items="countries" item-text="Country" item-value="Slug" label="Country"></v-select>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios'

export default {
  components: {},
  data: () => ({
    countries: []
  }),
  beforeCreate() {
    axios.get('https://api.covid19api.com/countries').then((response) => {
      this.countries = response.data
      console.log(this.countries)
    })
  }
}
</script>
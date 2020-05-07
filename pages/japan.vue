<template>
  <v-layout>
    <v-flex class="text-center">
      <MainChart class="chart" />
    </v-flex>
  </v-layout>
</template>

<script>
import MainChart from '../components/MainChart'

export default {
  components: {
    MainChart
  }
}
</script>
<template>
  <v-layout>
    <v-flex class="text-center">
      <v-row>
        <v-col cols="12" v-for="(data,n) in datas" :key="n" :sm="3">
          <v-card>
            <v-select
              :items="countries"
              item-text="Country"
              item-value="Slug"
              label="Country"
              v-model="data.selected"
              @change="testtest(n,data.selected)"
              :hint="`${data.selected}`"
            />
            <Chart v-if="data.loaded" :chartData="data.datacollection" :options="options" />
          </v-card>
        </v-col>
        <!-- <ul>
          <li v-for="country in countries" :key="country.Country">{{country.Slug}}</li>
        </ul>-->
      </v-row>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios'
import Chart from '../components/Chart'

export default {
  components: { Chart },
  data: () => ({
    countries: [],
    datas: [
      {
        selected: 'united-states',
        loaded: false,
        datacollection: null
      },
      { selected: 'spain', loaded: false, datacollection: null },
      { selected: 'france', loaded: false, datacollection: null },
      { selected: 'italy', loaded: false, datacollection: null }
    ],
    options: {
      // title: { display: true, text: `チャート` },
      scales: {
        xAxes: [
          {
            type: 'time',
            time: {
              unit: 'month'
            },
            scaleLabel: {
              display: false,
              labelString: 'Date'
            }
          }
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true
              // stepSize: 100
            },
            scaleLabel: {
              display: false,
              labelString: 'people'
            }
          }
        ]
      }
    }
  }),
  beforeCreate() {
    axios.get('https://api.covid19api.com/countries').then((response) => {
      this.countries = response.data
    })
  },
  methods: {
    async testtest(num, country) {
      try {
        axios
          .get(`https://api.covid19api.com/total/dayone/country/${country}`)
          .then((response) => {
            let confirmed = []
            let active = []
            let labels = []
            let deaths = []
            let recovered = []
            response.data.forEach((data) => {
              confirmed.push(data.Confirmed)
              active.push(data.Active)
              labels.push(data.Date)
              deaths.push(data.Deaths)
              recovered.push(data.Recovered)
            })
            this.datas[num].datacollection = {
              labels: labels,
              datasets: [
                {
                  data: confirmed,
                  label: '感染者数',
                  fill: false,
                  type: 'line',
                  lineTension: 0.3
                },
                {
                  data: active,
                  label: '感染者数(現在)',
                  borderColor: '#FF7F1A',
                  fill: false,
                  type: 'line',
                  lineTension: 0.3
                },
                {
                  data: deaths,
                  label: '死亡者数',
                  borderColor: '#FF4218',
                  fill: false,
                  type: 'line',
                  lineTension: 0.3
                },
                {
                  data: recovered,
                  label: '回復者数',
                  borderColor: '#91FFD7',
                  fill: false,
                  type: 'line',
                  lineTension: 0.3
                }
              ]
            }
          })
        data.loaded = true
      } catch (e) {
        console.error(e)
      }
    }
  },
  async mounted() {
    this.datas.forEach((data, num) => {
      this.testtest(num, data.selected)
      data.loaded = true
    })
  }
}
</script>

<style>
</style>
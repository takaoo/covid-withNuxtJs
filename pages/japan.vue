<template>
  <v-layout>
    <v-flex class="text-center">
      <Chart v-if="loaded" :chartdata="chartdata" :options="options" />
    </v-flex>
  </v-layout>
</template>

<script>
import Chart from '../components/Chart'
import axios from 'axios'
import moment from 'moment'

export default {
  components: {
    Chart
  },
  data: () => ({
    loaded: false,
    arr: ['Confirmed', 'Deaths', 'Recovered', 'Active'],
    chartdata: {
      labels: [],
      datasets: [
        {
          label: 'Confirmed',
          data: [],
          borderColor: '#CFD8DC',
          fill: false,
          type: 'line',
          lineTension: 0.3
        },
        {
          label: 'Deaths',
          data: [],
          borderColor: '#FF4218',
          fill: false,
          type: 'line',
          lineTension: 0.3
        },
        {
          label: 'Recovered',
          data: [],
          borderColor: '#91FFD7',
          fill: false,
          type: 'line',
          lineTension: 0.3
        },
        {
          label: 'Active',
          data: [],
          borderColor: '#FF7F1A',
          fill: false,
          type: 'line',
          lineTension: 0.3
        }
      ]
    },
    options: {
      scales: {
        xAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: 'Date'
            }
          }
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              stepSize: 100
            }
          }
        ]
      }
    }
  }),
  async mounted() {
    this.loaded = false
    try {
      axios
        .get('https://api.covid19api.com/total/dayone/country/japan')
        .then((response) => {
          response.data.forEach((data) => {
            this.arr.forEach((element, index) => {
              this.chartdata.datasets[index].data.push(data[element])
            })
            this.chartdata.labels.push(moment(data.Date).format('YY/MM/DD'))
          })
          console.log(response.data)
          this.loaded = true
        })
    } catch (e) {
      console.error(e)
    }
  }
}
</script>
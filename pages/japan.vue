<template>
  <v-layout>
    <v-flex class="text-center">
      <Chart v-if="loaded" :chartData="chartdata" :options="options" />
    </v-flex>
  </v-layout>
</template>

<script>
import Chart from '../components/Chart'
import axios from 'axios'

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
      title: { display: true, text: '日本のチャート' },
      scales: {
        xAxes: [
          {
            type: 'time',
            time: {
              unit: 'month'
            },
            scaleLabel: {
              display: true,
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
              display: true,
              labelString: 'people'
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
            this.chartdata.labels.push(data.Date)
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
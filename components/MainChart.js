import { Bar } from 'vue-chartjs'
import axios from 'axios'
import moment from 'moment'

export default {
    extends: Bar,
    data: () => ({
        data: {
            // labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            labels: [],
            datasets: [
                {
                    label: 'Confirmed',
                    // data: [10, 50, 20, 30, 30, 40],
                    data: [],
                    borderColor: '#CFD8DC',
                    fill: false,
                    type: 'line',
                    lineTension: 0.3,
                },
                {
                    label: 'Deaths',
                    data: [],
                    borderColor: '#FF4218',
                    fill: false,
                    type: 'line',
                    lineTension: 0.3,
                },
                {
                    label: 'Recovered',
                    data: [],
                    borderColor: '#91FFD7',
                    fill: false,
                    type: 'line',
                    lineTension: 0.3,
                },
                {
                    label: 'Active',
                    data: [],
                    borderColor: '#FF7F1A',
                    fill: false,
                    type: 'line',
                    lineTension: 0.3,
                }
            ]
        },
        options: {
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Month'
                    }
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        stepSize: 10,
                    }
                }]
            }
        },
        arr: ["Confirmed", "Deaths", "Recovered", "Active"]
    }),
    mounted() {
        this.renderChart(this.data, this.options)
    },
    beforeCreate() {
        axios.get('https://api.covid19api.com/total/dayone/country/japan').then((response) => {
            response.data.forEach(data => {
                this.arr.forEach((element, index) => {
                    this.data.datasets[index].data.push(data[element])
                });
                // this.data.datasets[0].data.push(data.Confirmed)
                // this.data.datasets[1].data.push(data.Deaths)
                this.data.labels.push(moment(data.Date).format('YY/MM/DD'))
            });
            // console.log(response.data)
            // console.log(this.data.datasets[0].data)
        })

    }
}
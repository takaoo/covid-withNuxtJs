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
                // {
                //     label: 'Bar Dataset',
                //     data: [10, 20, 30, 40, 50, 30],
                //     // data: [],
                //     backgroundColor: [
                //         'rgba(255, 99, 132, 0.2)',
                //         'rgba(54, 162, 235, 0.2)',
                //         'rgba(255, 206, 86, 0.2)',
                //         'rgba(75, 192, 192, 0.2)',
                //         'rgba(153, 102, 255, 0.2)',
                //         'rgba(255, 159, 64, 0.2)'
                //     ],
                //     borderColor: [
                //         'rgba(255, 99, 132, 1)',
                //         'rgba(54, 162, 235, 1)',
                //         'rgba(255, 206, 86, 1)',
                //         'rgba(75, 192, 192, 1)',
                //         'rgba(153, 102, 255, 1)',
                //         'rgba(255, 159, 64, 1)'
                //     ],
                //     borderWidth: 1
                // },
                {
                    label: 'Line Dataset',
                    // data: [10, 50, 20, 30, 30, 40],
                    data: [],
                    borderColor: '#CFD8DC',
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
        }
    }),
    mounted() {
        this.renderChart(this.data, this.options)
    },
    beforeCreate() {
        axios.get('https://api.covid19api.com/dayone/country/japan/status/confirmed').then((response) => {
            response.data.forEach(data => {
                this.data.datasets[0].data.push(data.Cases)
                this.data.labels.push(moment(data.Date).format('YYYY/MM/DD'))
            });
            // console.log(response.data)
            // console.log(this.data.datasets[0].data)

        })

    }
}
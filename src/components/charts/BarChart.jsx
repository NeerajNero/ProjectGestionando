import {Chart as ChartJs} from 'chart.js/auto'
import {Bar} from 'react-chartjs-2'

const BarChart = ({chartData}) => {
  return (
    <Bar data={chartData} />
  )
}

export default BarChart
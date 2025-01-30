import { useEffect, useState } from "react"
import BarChart from "../components/charts/BarChart"
import { getTasks } from "../slices/taskSlice"
import { useDispatch,useSelector } from "react-redux"

const AnalyticsPage = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    if(tasks.length === 0){
      dispatch(getTasks())
    }
  },[])

  const tasks = useSelector((state) => state?.tasks?.tasks)
  const [data,setData] = useState({
    labels: ["To Do", "In Progress", "Completed"],
    datasets: [{
      label: "Tasks",
      data: [tasks.filter((task) => task.status === "To Do").length,tasks.filter((task) => task.status === "In Progress").length, tasks.filter((task) => task.status === "Completed").length]
    }]
  })

  const [data1,setData1] = useState({
    labels: ["To Do", "In Progress", "Completed"],
    datasets: [{
      label: "Tasks",
      data: [tasks.filter((task) => task.status === "To Do").length,tasks.filter((task) => task.status === "In Progress").length, tasks.filter((task) => task.status === "Completed").length]
    }]
  })

  
  return (
    <main className='col-md-8'>
        <div>
          <h3>Charts</h3>
          <h4 className="text-center">Chart By Status</h4>
          <BarChart chartData={data}/>
        </div>
        <div>
          <h4 className="text-center">Most Productive User</h4>
          <BarChart chartData={data}/>
        </div>
    </main>
  )
}

export default AnalyticsPage
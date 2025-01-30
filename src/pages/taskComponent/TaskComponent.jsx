import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getTasks } from "../../slices/taskSlice"
import { getTeams } from "../../slices/teamSlice"
import { useEffect, useState } from "react"
import Loader from "../../utils/loader"

const TaskComponent = () => {
  const [filterByTeam, setFilterByTeam] = useState([])
    const dispatch = useDispatch()
    const tasks = useSelector((state) => state?.tasks?.tasks)
    const status = useSelector((state) => state?.tasks?.status)
    const teams = useSelector((state) => state?.teams?.teams)
    

    const handleFilterByTeam = (e) => {
      const {value} = e.target
      const filteredTasks = tasks.filter((task) => task.team.name === value)
      setFilterByTeam(filteredTasks)
    }

    const handleFilterByStatus = (e) => {
      const {value} = e.target
      const filteredTasks = tasks.filter((task) => task.status === value)
      setFilterByTeam(filteredTasks)
    }

    useEffect(() => {
        if(tasks.length === 0){
            dispatch(getTasks())
        }
        if(teams.length === 0){
          dispatch(getTeams())
        }
        setFilterByTeam(tasks)
    },[])
  return (
    <>
    <div className='projectContainer'>
          <h4>All Tasks</h4>
          <div className="my-3">
          <h3>Filter Tasks</h3>
          <label>Filter By Team</label>
          <select onChange={(e) => handleFilterByTeam(e)}>
              {teams.length > 0 && teams.map((team,i) => <option key={i} value={team.name}>{team.name}</option>)}
          </select>
          <label className="mx-3">Filter By Status</label>
          <select onChange={(e) => handleFilterByStatus(e)}>
              <option value="To Do">To Do</option>
              <option value="Completed">Completed</option>
              <option value="In Progress">In Progress</option>
          </select>
        </div>
          {status === "loading" && <Loader/>}
            <div className='projectBox'>
                {filterByTeam.length > 0 ? filterByTeam.map((task,i) => <Link to='/updateTask' state={task} className='linkStyle' key={i} >
                <div className="card text-bg-light mb-3" style={{maxWidth: "18rem"}}>
  <div className="card-header">{task.name}</div>
  <div className="card-body">
    <h5 className="card-title"></h5>
    <p className="card-text"><strong>Owners: </strong> {task?.owners.map((owner) => owner.fullName+", ")}</p>
    <p className="card-text"><strong>Project: </strong>{task?.project.name}</p>
    <p className="card-text"><strong>Tags: </strong>{task?.tags.map((tag) => tag+", ")}</p>
    <p className="card-text"><strong>Team: </strong>{task?.team.name}</p>
    <p className="card-text"><strong>Status: </strong>{task?.status}</p>
    <p className="card-text"><strong>Due Date: </strong>{task.createdAt}</p>
    <p className="card-text"><strong>Time To Complete: </strong>{task?.timeToComplete} Days</p>
  </div>
</div></Link>): "No Tasks Available"}
            </div>
        </div>
        
        </>
  )
}

export default TaskComponent
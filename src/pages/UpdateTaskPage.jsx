import { useState } from "react"
import { useLocation } from "react-router-dom"
import { useDispatch } from "react-redux"
import { updateTask } from "../slices/taskSlice"
import {toast} from 'react-hot-toast'

const UpdateTaskPage = () => {
    const dispatch = useDispatch()
    const [completed,setCompleted] = useState(false)
    const location = useLocation()
    const task = location.state

    const handleUpdateTask = (e) => {
      e.preventDefault()
      dispatch(updateTask({taskId: task._id})).unwrap().then(() => {
        toast.success("task updated successfully")
        setCompleted(true)
      })
      
    }
  return (
    <main className='col-md-8 my-3'>
        <div className="d-flex justify-content-center">
        <div className="card">
        <div className="card-body">
        <h3>{task?.name}</h3>
        <hr/>
        <p className="card-text"><strong>Owners: </strong> {task?.owners.map((owner) => owner.fullName+", ")}</p>
    <p className="card-text"><strong>Project: </strong>{task?.project.name}</p>
    <p className="card-text"><strong>Tags: </strong>{task?.tags.map((tag) => tag+", ")}</p>
    <p className="card-text"><strong>Team: </strong>{task?.team.name}</p>
    <p className="card-text"><strong>Status: </strong>{completed ? "Completed" : task?.status}</p>
    <p className="card-text"><strong>Due Date: </strong>{task.createdAt}</p>
    <p className="card-text"><strong>Time To Complete: </strong>{task?.timeToComplete} Days</p>
    {task?.status !== "Completed" && !completed ? <button className="btn btn-primary" onClick={handleUpdateTask}>Mark As Complete</button> : ""}
    </div>
    </div>
    </div>
    </main>
    
  )
}

export default UpdateTaskPage
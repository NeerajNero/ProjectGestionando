import { getTags } from "../slices/tagSlice"
import { getTeams } from "../slices/teamSlice"
import { getProjects } from "../slices/projectSlice"
import { getUsers} from "../slices/userSlice"
import { useDispatch,useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { addTask } from "../slices/taskSlice"
import toast from 'react-hot-toast'

const AddTaskPage = () => {
    const dispatch = useDispatch()
    const tags = useSelector((state) => state?.tags?.tags)
    const teams = useSelector((state) => state?.teams?.teams)
    const projects = useSelector((state) => state?.projects?.projects)
    const users = useSelector((state) => state?.user?.users)
    
    const [taskName, setTaskName] = useState('')
    const [taskProjectName, setTaskProjectName] = useState('')
    const [taskUsers, setTaskUsers] = useState([])
    const [taskTeam, setTaskTeam] = useState('')
    const [taskTags, setTaskTags] = useState([])
    const [taskTime, setTasktime] = useState(2)
    const [taskStatus, setTaskStatus] = useState('')

    const handleOwners = (e) => {
        const {checked, value} = e.target
        if(checked){
            setTaskUsers((prevValue) => [...prevValue, value])
        }else{
            setTaskUsers((prevValue) => prevValue.filter((prevVal) => prevVal !== value))
        }
    }

    const handleTags = (e) => {
        const {checked,value} = e.target
        if(checked){
            setTaskTags((prevValue) => [...prevValue, value])
        }else{
            setTaskTags((prevValue) => prevValue.filter((prevVal) => prevVal !== value))
        }
    }

    const handleAddTask = (e) => {
        e.preventDefault()
        if(!taskName && !taskProjectName && !taskUsers && !taskTeam && !taskTime){
           return toast.error("Please fill in all fields")
        }
        const taskData = {
            name: taskName,
            project: taskProjectName,
            team: taskTeam,
            owners: taskUsers,
            tags: taskTags,
            timeToComplete: taskTime,
            status: taskStatus
        }
        dispatch(addTask(taskData)).unwrap().then(() => {
            toast.success("task added")
            setTaskName("")
            setTaskProjectName("")
            setTaskTeam("")
            setTaskUsers([])
            setTaskTags([])
            setTasktime(0)
            setTaskStatus("")
        })
    }

    useEffect(() => {
        if(tags.length === 0){
            dispatch(getTags())
        }
        if(teams.length === 0){
            dispatch(getTeams())
        }
        if(projects.length === 0){
            dispatch(getProjects())
        }
        if(users.length === 0){
            dispatch(getUsers())
        }
    },[])
    
  return (
    <main className='col-md-8 my-3 d-flex justify-content-center'>
        <div className="col-md-5"> 
        <div className='text-center'>
        <h2 className="my-3">Add Task</h2>
            <form onSubmit={handleAddTask}>
            <label>Task Name:   </label>
            <input type="text" placeholder="Task Name" className="form-control" value={taskName} onChange={(e) => setTaskName(e.target.value)}/><br/>
            <label>Select Project:</label>
            <select className="form-control" onChange={(e) => setTaskProjectName(e.target.value)}>
                {projects.length > 0 && projects.map((project,i) => <option key={i} value={project._id}>{project.name}</option>)}
            </select>
            <label className="my-3">Owners: </label>
            <div >
            {users.length > 0 && users.map((user,i) => <span key={i} className="mx-2"><label>{user.fullName}: </label><input type="checkbox" value={user._id} onChange={(e) => handleOwners(e)} className="ms-1"/></span>)}
            </div>
            <label className="my-3">Select Team: </label>
            <select className="form-control" onChange={(e) => setTaskTeam(e.target.value)}>
                {teams.length > 0 && teams.map((team,i) => <option value={team._id} key={i}>{team.name}</option>)}
            </select>
            <label>Tags:</label><br/>
            {tags.length > 0 && tags.map((tag,i) => <span key={i} className="mx-2"><label>{tag.name} </label><input type="checkbox" className="ms-1" value={tag.name} onChange={(e) => handleTags(e)}/></span>)}<br/>
            <label className="my-3">Time to complete: </label>
            <input type="number" className="form-control" placeholder="Time To Complete in (Days)" value={taskTime} onChange={(e) => setTasktime(e.target.value)}/>
            <label>Status:</label>
            <select className="form-control" onChange={(e) => setTaskStatus(e.target.value)}>
                <option value="To Do">To Do</option>
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
            </select>
            <button className="btn btn-primary my-3">Add Task</button>
            </form>
        
        </div>
        </div>
    </main>
  )
}

export default AddTaskPage
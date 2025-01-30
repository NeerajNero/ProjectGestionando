import React from 'react'
import TaskComponent from './taskComponent/TaskComponent'
import { Link } from 'react-router-dom'

const TaskPage = () => {
  return (
    <main className='col-md-8 my-3'>
      <div className='text-center'>
      <h2>Tasks</h2>
      <hr />  
      <Link className='btn btn-primary' to='/addTask'>Add Task</Link>
      <TaskComponent />
      </div>

    </main>
  )
}

export default TaskPage
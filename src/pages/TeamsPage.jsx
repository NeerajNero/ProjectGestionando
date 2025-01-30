import React from 'react'
import TeamComponent from './teamComps/TeamComponent'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTeam } from '../slices/teamSlice'
import toast from 'react-hot-toast'
const TeamsPage = () => {
  const [name,setName] = useState('')
  const [description,setDescription] = useState('')
  const dispatch = useDispatch()

  const handleAddTeam = (e) => {
    e.preventDefault()
    dispatch(addTeam({name,description})).unwrap().then(() => {
      setName('')
      setDescription('')
      toast.success("Team Added")
    })
  }
  return (
    <main className='col-md-8 my-3'>
        <h2 className='text-center'>Teams</h2>
        <hr/>
        <div className="text-center">
        <h3>Add Team</h3>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Add Team
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Add Team
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <label>Team Name</label><br/>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}/><br/>
                <label>Team Description</label><br/>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} style={{width: "100%"}}/>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" onClick={handleAddTeam} className="btn btn-primary">
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
        <TeamComponent />
    </main>
  )
}

export default TeamsPage
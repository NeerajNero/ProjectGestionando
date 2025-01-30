import { useState } from "react";
import ProjectComps from "./projectComps/ProjectComps";
import { addProject } from "../slices/projectSlice";
import { useDispatch, useSelector } from "react-redux";
import {toast} from 'react-hot-toast'

const Projects = () => {
  const [name,setName] = useState('')
  const [description,setDescription] = useState('')

  const dispatch = useDispatch()

  const handleAddProject = (e) => {
    e.preventDefault()
    dispatch(addProject({name,description})).unwrap().then(() => {
      setName('')
      setDescription('')
      toast.success("Project Added")
    })
  }
  return (
    <div className="col-md-8 my-3">
      <div className="text-center">
        <h2>Projects</h2>
        <hr/>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Add Project
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
                Add Project
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
                <label>Project Name</label><br/>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}/><br/>
                <label>Project Description</label><br/>
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
              <button type="submit" onClick={handleAddProject} className="btn btn-primary">
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
      <ProjectComps />
    </div>
  );
};

export default Projects;

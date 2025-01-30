import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getProjects } from '../../slices/projectSlice'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../utils/loader'

const ProjectComps = () => {
  const dispatch = useDispatch()
  const projects = useSelector((state) => state?.projects?.projects) || null
  const projectStatus = useSelector((state) => state?.projects?.status)
  useEffect(() => {
      if(projects.length === 0){
        dispatch(getProjects())
      }
  },[])
  return (
    <div className='projectContainer'>
          <h4>All Projects</h4>
          {projectStatus === "loading" && <Loader/>}
            <div className='projectBox'>
                {projects.length > 0 ? projects.map((project,i) => <Link className='linkStyle' key={i}>
                <div className="card text-bg-light mb-3" style={{maxWidth: "18rem"}}>
  <div className="card-header">{project.name}</div>
  <div className="card-body">
    <h5 className="card-title"></h5>
    <p className="card-text">{project.description}</p>
  </div>
</div></Link>): ""}
            </div>
        </div>
  )
}

export default ProjectComps
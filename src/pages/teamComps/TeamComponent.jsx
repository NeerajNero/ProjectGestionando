import { Link } from "react-router-dom"
import { getTeams } from "../../slices/teamSlice"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import Loader from '../../utils/loader'

const TeamComponent = () => {
  const dispatch = useDispatch()
  const teams = useSelector((state) => state?.teams?.teams)
  const status = useSelector((state) => state?.teams?.status)

  useEffect(() => {
    if(teams.length === 0){
      dispatch(getTeams())
    }
  },[])
  return (
    <div className='projectContainer'>
          <h4>All Teams</h4>
          {status === "loading" && <div className="text-center"><Loader /></div>}
            <div className='projectBox'>
                {teams.length > 0 ? teams.map((team,i) => <Link key={i} className="linkStyle"><div className="card text-bg-light mb-3" style={{maxWidth: "18rem"}}>
  <div className="card-header">{team.name}</div>
  <div className="card-body">
    <h5 className="card-title"></h5>
    <p className="card-text">{team.description}</p>
  </div>
</div></Link>) : ""}
            </div>
        </div>
  )
}

export default TeamComponent
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../slices/userSlice"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import Loader from "../../utils/loader"
const Sidebar = () => {
    const status = useSelector((state) => state?.user?.status)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = (e) => {
        e.preventDefault()
        dispatch(logout()).unwrap().then(() => {
            toast.success("logged out successfully")
            navigate('/login')
        })
    }
    return (
      <main className='col-md-3 sidebar'>
            <h4 className="text-center my-3">Quick Links</h4>
          <div className="container mt-2">
                <ul className="list-group">
                    <li className="list-group-item"><Link to='/homePage' className="btn btn-secondary" style={{width: "100%"}}>Dashboard</Link></li>
                    <li className="list-group-item"><Link to='/projects' className="btn btn-secondary" style={{width: "100%"}}>Projects</Link></li>
                    <li className="list-group-item"><Link to='/tasks' className="btn btn-secondary" style={{width: "100%"}}>Tasks</Link></li>
                    <li className="list-group-item"><Link to='/teams' className="btn btn-secondary" style={{width: "100%"}}>Teams</Link></li>
                    <li className="list-group-item"><Link to='/analytics' className="btn btn-secondary" style={{width: "100%"}}>Analytics</Link></li>
                </ul>
          </div>
          <div className="text-center my-3">
          <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
          </div>
          
      </main>
    )
  }
  
  export default Sidebar
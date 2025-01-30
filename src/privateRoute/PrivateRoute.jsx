import { Navigate, Outlet } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'
import { setCurrentUser } from '../slices/userSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
    const dispatch = useDispatch()
    const currentUser = useSelector((state) => state?.user?.currentUser)
    const token = localStorage.getItem('authToken');
    if(token){
        const decoded = jwtDecode(token)
        if(!currentUser){
            dispatch(setCurrentUser(decoded))
        }
    }
    return token ? <Outlet /> : <Navigate to='/login' />

}
export default PrivateRoute;

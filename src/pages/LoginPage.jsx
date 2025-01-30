import React, {useState } from 'react'
import { Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../slices/userSlice'
import toast from 'react-hot-toast'

const LoginPage = () => {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userData = useSelector((state) => state?.user?.user)
  const status = useSelector((state) => state?.user?.status)

  const handleLogin = (e) => {
    e.preventDefault()
    dispatch(userLogin({email,password})).unwrap().then(() => {
        setEmail("")
        setPassword("")
        toast.success("Login success")
        navigate('/')
    })
  }
  return (
    <section className='loginPage'>
        <div className='loginContainer card shadow'>
            <h4>Login ProjectGestionando</h4>
            <form className='loginForm' onSubmit={handleLogin}>
            <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' className='inputField input'/><br/>
            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' className='inputField input'/><br/>
            <button type='submit' className="button type1">
                <span className="btn-txt">Login</span>
            </button>
            <Link className='noAccountLink' to='/signup'>Don't have an account?</Link>
            </form>
        </div>
    </section>
  )
}

export default LoginPage
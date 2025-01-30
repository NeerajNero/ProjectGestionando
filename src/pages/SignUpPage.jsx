import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { userSignup } from '../slices/userSlice'
import toast from 'react-hot-toast'
import { useEffect } from 'react'
const SignUpPage = () => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const handleSignin = (e) => {
    e.preventDefault()
    if(fullName && email && password){
        dispatch(userSignup({fullName,email,password})).unwrap().then(() => {
          setFullName("")
          setEmail("")
          setPassword("")
          toast.success("Signed up successfully")
          navigate('/')
        })
      }
    }
  return (
    <section className='loginPage'>
        <div className='loginContainer card shadow'>
            <h4>Sign up ProjectGestionando</h4>
            <form className='loginForm' onSubmit={handleSignin}>
            <input type='text' value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder='Full Name' className='inputField input'/><br/>
            <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' className='inputField input'/><br/>
            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' className='inputField input'/><br/>
            <button type='submit' className="button type1">
                <span className="btn-txt">Sign Up</span>
            </button>
            <Link className='noAccountLink' to='/login'>Already have an account?</Link>
            </form>
        </div>
    </section>
  )
}

export default SignUpPage
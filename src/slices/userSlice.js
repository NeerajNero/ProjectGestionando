import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
const initialState = {
    currentUser: null,
    users: [],
    auth: null,
    error: null,
    status: 'idle'
}
export const userLogin = createAsyncThunk('login', async({email,password}) => {
    const response = await axios.post('http://localhost:5000/api/auth/login',{email,password})
    return response.data
})

export const userSignup = createAsyncThunk('signup', async({fullName, email, password}) => {
    const response = await axios.post('http://localhost:5000/api/auth/signin', {fullName, email, password})
    return response.data
})

export const logout = createAsyncThunk('logout', async() => {
    const token = localStorage.getItem('authToken')
    const response = await axios.post('http://localhost:5000/api/auth/logout',{},{headers: {
        Authorization: `Bearer ${token}`
    }})
    return response.data
})

export const getUsers = createAsyncThunk('getUsers', async() => {
    const token = localStorage.getItem('authToken')
    const response = await axios.get('http://localhost:5000/api/auth/getUser',{headers: {
        Authorization: `Bearer ${token}`
    }})
    return response.data 
})

const userSlice = createSlice({
    name: 'USER',
    initialState,
    reducers: {
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload.user
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(userLogin.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(userLogin.fulfilled, (state,action) => {
            state.status = 'success'
            state.currentUser = action.payload.user
            localStorage.setItem('authToken', action.payload.token)
        })
        .addCase(userLogin.rejected, (state,action) => {
            state.status = 'rejected'
            state.error = action.error.message
        })
        builder
        .addCase(logout.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(logout.fulfilled, (state,action) => {
            state.status = 'success'
            if(action.payload?.logout){
                localStorage.removeItem('authToken')
            }
            
        })
        .addCase(logout.rejected, (state,action) => {
            state.status = 'rejected'
            state.error = action.error.message
        })
        builder
        .addCase(userSignup.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(userSignup.fulfilled, (state,action) => {
            state.status = 'success'
            state.currentUser = action.payload.user
            localStorage.setItem('authToken', action.payload.token)
        })
        .addCase(userSignup.rejected, (state,action) => {
            state.status = 'rejected'
            state.error = action.error.message
        })
        builder
        .addCase(getUsers.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(getUsers.fulfilled, (state,action) => {
            state.status = 'success'
            state.users = action.payload.users
            
        })
        .addCase(getUsers.rejected, (state,action) => {
            state.status = 'rejected'
            state.error = action.error.message
        })
    }
})

export default userSlice.reducer 
export const {setCurrentUser} = userSlice.actions
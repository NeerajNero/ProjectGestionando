import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
const initialState = {
    projects: [],
    error: null,
    status: 'idle'
}

export const getProjects = createAsyncThunk('getProjects', async() => {
    const token = localStorage.getItem('authToken')
    const response = await axios.get('https://project-gestionando-backend.vercel.app/api/projects/project',{
        withCredentials: true,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
})

export const addProject = createAsyncThunk('addProject', async({name,description}) => {
    const token = localStorage.getItem('authToken')
    const response = await axios.post('https://project-gestionando-backend.vercel.app/api/projects/addProject', {name,description}, {
        withCredentials: true,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    console.log(response.data)
    return response.data
})
const projectSlice = createSlice({
    name: 'PROJECT',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getProjects.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(getProjects.fulfilled, (state,action) => {
            state.status = "success"
            state.projects = action.payload.project
        })
        .addCase(getProjects.rejected, (state,action) => {
            state.status = "failed"
            state.error = action.error.message
        })
        builder
        .addCase(addProject.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(addProject.fulfilled, (state,action) => {
            state.status = "success"
            state.projects.push(action.payload.project)
        })
        .addCase(addProject.rejected, (state,action) => {
            state.status = "failed"
            state.error = action.error.message
        })
    }
})

export default projectSlice.reducer
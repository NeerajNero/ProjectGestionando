import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    tasks: [],
    status: "idle",
    error: null
}

export const getTasks = createAsyncThunk('getTasks', async() => {
    const token = localStorage.getItem('authToken')
    const response = await axios.get('project-gestionando-backend.vercel.app/api/tasks/getTasks', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
})
export const addTask = createAsyncThunk('addTask', async(taskData) => {
    const token = localStorage.getItem('authToken')
    const response = await axios.post('project-gestionando-backend.vercel.app/api/tasks/addTask', {taskData}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
})

export const updateTask = createAsyncThunk('updateTask', async({taskId}) => {
    const token = localStorage.getItem('authToken')
    const response = await axios.put('project-gestionando-backend.vercel.app/api/tasks/updateTask', {taskId}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data 
})

const taskSlice = createSlice({
    name: 'TASKS',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
                .addCase(getTasks.pending, (state) => {
                    state.status = 'loading'
                })
                .addCase(getTasks.fulfilled, (state,action) => {
                    state.status = 'success'
                    state.tasks = action.payload.task
                })
                .addCase(getTasks.rejected, (state,action) => {
                    state.status = 'rejected'
                    state.error = action.error.message
                })
                builder
                .addCase(addTask.pending, (state) => {
                    state.status = 'loading'
                })
                .addCase(addTask.fulfilled, (state,action) => {
                    state.status = 'success'
                    state.tasks.push(action.payload.task)
                })
                .addCase(addTask.rejected, (state,action) => {
                    state.status = 'rejected'
                    state.error = action.error.message
                })
                builder
                .addCase(updateTask.pending, (state) => {
                    state.status = 'loading'
                })
                .addCase(updateTask.fulfilled, (state,action) => {
                    state.status = 'success'
                    const findTask = state.tasks.find((task) => task._id === action.payload.task._id)
                    findTask.status = "Completed"
                })
                .addCase(updateTask.rejected, (state,action) => {
                    state.status = 'rejected'
                    state.error = action.error.message
                })
    }
})

export default taskSlice.reducer
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    teams: [],
    status: 'idle',
    error: null
}

export const getTeams = createAsyncThunk('getTeams', async() => {
    const token = localStorage.getItem('authToken')
    const response = await axios.get('http://localhost:5000/api/teams/getTeams',{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
})
export const addTeam = createAsyncThunk('addTeam', async({name,description}) => {
    const token = localStorage.getItem('authToken')
    const response = await axios.post('http://localhost:5000/api/teams/addTeam', {name,description}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
})
const teamSlice = createSlice({
    name: 'TEAMS',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getTeams.pending, (state) => {
            state.status = "loading"
        })
        .addCase(getTeams.fulfilled, (state,action) => {
            state.status = "success"
            state.teams = action.payload.teams
        })
        .addCase(getTeams.rejected, (state,action) => {
            state.status = "failed"
            state.error = action.error.message
        })
        builder
        .addCase(addTeam.pending, (state) => {
            state.status = "loading"
        })
        .addCase(addTeam.fulfilled, (state,action) => {
            state.status = "success"
            state.teams.push(action.payload.team)
        })
        .addCase(addTeam.rejected, (state,action) => {
            state.status = "failed"
            state.error = action.error.message
        })
    }
})

export default teamSlice.reducer
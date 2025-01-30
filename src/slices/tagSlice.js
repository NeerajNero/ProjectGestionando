import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    tags: [],
    status: "idle",
    error: null
}

export const getTags = createAsyncThunk('getTags', async() => {
    const token = localStorage.getItem('authToken')
    const response = await axios.get('https://projectgestionando-backend.onrender.com/api/tags/getTags', {
        withCredentials: true,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
})

const tagSlice = createSlice({
    name: 'TAGS',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
                builder
                .addCase(getTags.pending, (state) => {
                    state.status = "loading"
                })
                .addCase(getTags.fulfilled, (state,action) => {
                    state.status = "success"
                    state.tags = action.payload.tags
                })
                .addCase(getTags.rejected, (state,action) => {
                    state.status = "failed"
                    state.error = action.error.message
                })
    }
})

export default tagSlice.reducer
import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../slices/userSlice'
import projectReducer from '../slices/projectSlice'
import teamReducer from '../slices/teamSlice'
import tagReducer from '../slices/tagSlice'
import taskReducer from '../slices/taskSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        projects: projectReducer,
        teams: teamReducer,
        tags: tagReducer,
        tasks: taskReducer
    }
})
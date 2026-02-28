import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as authApi from './authApi'

export const registration = createAsyncThunk('auth/register', async(data, {rejectWithValue})=>{
    try {
        const res = await authApi.registration(data)
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        accessToken: null,
        loading: false,
        error: null,
        message: null
    },
    reducers: {
        logout: (state) => {
            state.user = null
            state.accessToken = null
        }
    },
    extraReducers: (builder)=>{
builder.addCase()
    }
})

export const {logout} = authSlice.actions
export default authSlice.reducer
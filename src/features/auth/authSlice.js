import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as authApi from './authApi'

export const registration = createAsyncThunk('auth/register', async (data, { rejectWithValue }) => {
    try {
        const res = await authApi.registration(data)
        return res.data
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const login = createAsyncThunk('auth/login', async (data, { rejectWithValue }) => {
    try {
        const res = await authApi.login(data)
        return res.data
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const verify = createAsyncThunk('auth/verify', async (token, { rejectWithValue }) => {
    try {
        const res = await authApi.verifyEmail(token)
        return res.data
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const forgotPass = createAsyncThunk('auth/forgot', async (email, { rejectWithValue }) => {
    try {
        const res = await authApi.forgotPass(email)
        return res.data
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const resetPass = createAsyncThunk('auth/reset', async ({ token, formData }, { rejectWithValue }) => {
    
    try {
        const res = await authApi.resetPass(token, formData)
        return res.data
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

    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false
                state.accessToken = action.payload.accessToken
                state.message = action.payload.message
                state.user = {
                    email: action.payload.email,
                    username: action.payload.username
                }
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.error
            })

            .addCase(registration.pending, (state) => {
                state.loading = true
            })
            .addCase(registration.fulfilled, (state, action) => {
                state.loading = false
                state.message = action.payload.message
            })
            .addCase(registration.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.error
            })

            .addCase(verify.pending, (state) => {
                state.loading = true
            })
            .addCase(verify.fulfilled, (state, action) => {
                state.loading = false
                state.message = action.payload.message
            })
            .addCase(verify.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.error
            })

            .addCase(forgotPass.pending, (state) => {
                state.loading = true
            })
            .addCase(forgotPass.fulfilled, (state, action) => {
                state.loading = false
                state.message = action.payload.message
            })
            .addCase(forgotPass.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.error
            })

            .addCase(resetPass.pending, (state) => {
                state.loading = true
            })
            .addCase(resetPass.fulfilled, (state, action) => {
                state.loading = false
                state.message = action.payload.message
            })
            .addCase(resetPass.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.error
            })
    }
})

export const { logout } = authSlice.actions
export default authSlice.reducer
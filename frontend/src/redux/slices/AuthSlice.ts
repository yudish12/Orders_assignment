import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { InitState } from "..";
import { loginWithGoogleThunk } from "../thunks/AuthThunk";


const initState:InitState = {
    user:null,
    googleUser:null,
    loading:false
}

export const loginWithGoogle = createAsyncThunk('users/googleLogin',loginWithGoogleThunk)

const authSlice = createSlice({
    name:'auth',
    initialState:initState,
    reducers:{
        logout:(state)=>{
            state.googleUser = null
            state.user = null
            state.loginState = false
            localStorage.removeItem('user')
        },
        restoreAuth:(state)=>{
            const isUserinLocal = JSON.parse(localStorage.getItem('user')!)
            state.googleUser = isUserinLocal
            state.loginState = false;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(loginWithGoogle.pending,(state)=>{
            state.loading = true;
        })
        builder.addCase(loginWithGoogle.fulfilled,(state,action)=>{
            state.googleUser = action.payload
            console.log(action.payload)
            localStorage.setItem('user',JSON.stringify(action.payload))
            state.loginState = true;
            state.loading = false;
        })
        builder.addCase(loginWithGoogle.rejected,(state,action)=>{
            state.error = action.error
            state.loading = false;
            state.loginState = true;
        })
    }
})

export const {restoreAuth,logout} = authSlice.actions

export default authSlice.reducer
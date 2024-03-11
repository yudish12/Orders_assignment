import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { productInitStateType } from "..";
import { createProductThunk, deleteProductThunk, getProductsThunk, searchProductThunk, updateProductThunk } from "../thunks/ProductThunk";

const productInitState:productInitStateType = {
    products:[],
    loading:false,
    totalPages:null,
    navigate:false
}

export const getProducts = createAsyncThunk('products/get',getProductsThunk)
export const deleteProduct = createAsyncThunk('products/delete',deleteProductThunk)
export const updateProduct = createAsyncThunk('products/update',updateProductThunk)
export const createProduct = createAsyncThunk('products/create',createProductThunk)
export const searchProduct = createAsyncThunk('products/search',searchProductThunk)

const productSlice = createSlice({
    name:'product',
    initialState:productInitState,
    reducers:{
        SetNavigate:(state)=>{
            state.navigate = false;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getProducts.pending,(state)=>{
            state.loading = true
        })
        builder.addCase(getProducts.fulfilled,(state,action)=>{
            state.totalPages = action.payload.totalPages
            state.products = action.payload.products
            state.loading = false
        })
        builder.addCase(getProducts.rejected,(state,action)=>{
            state.error = action.error
            state.navigate = true
            state.loading = false
        })
        builder.addCase(searchProduct.pending,(state)=>{
            state.loading = true
        })
        builder.addCase(searchProduct.fulfilled,(state,action)=>{
            state.totalPages = action.payload.totalPages
            state.products = action.payload.products
            state.loading = false
        })
        builder.addCase(searchProduct.rejected,(state,action)=>{
            state.error = action.error
            state.loading = false
        })
        builder.addCase(updateProduct.pending,(state)=>{
            state.loading = true
        })
        builder.addCase(updateProduct.fulfilled,(state)=>{
            state.navigate = true
            alert('Product Updated Successfully')
            state.loading = false
        })
        builder.addCase(updateProduct.rejected,(state,action)=>{
            state.error = action.error
            state.loading = false
        })
        builder.addCase(createProduct.pending,(state)=>{
            state.loading = true
        })
        builder.addCase(createProduct.fulfilled,(state)=>{
            state.navigate = true
            alert('Product Created Successfully')
            state.loading = false
            
        })
        builder.addCase(createProduct.rejected,(state,action)=>{
            state.error = action.error
            state.loading = false
        })
        builder.addCase(deleteProduct.fulfilled,(state,action)=>{
            state.products = state.products.filter((e)=>e._id!==action.payload.id)
            state.loading = false
        })
        builder.addCase(deleteProduct.rejected,(state,action)=>{
            state.error = action.error
            state.loading = false
        })
    }
})

export const {SetNavigate} = productSlice.actions

export default productSlice.reducer
import axios from "axios";
import { ProductType } from "..";

type getPayloadType = {
    page:number,
    pageSize:number
}

export const getProductsThunk = async(payload:getPayloadType,thunkApi: { rejectWithValue: (arg0: unknown) => void; })=>{
    try {
        console.log(payload)
        const data = await axios.get(`${import.meta.env.VITE_API_URL}/api/products?page=${payload.page}&pageSize=${payload.pageSize}`);
        return data.data;
    } catch (error) {
        thunkApi.rejectWithValue(error);
        throw error;
    }
}

export const deleteProductThunk = async(id:string,thunkApi: { rejectWithValue: (arg0: unknown) => void; })=>{
    try {
        const data = await axios.delete(`${import.meta.env.VITE_API_URL}/api/products/${id}`);
        return data.data;
    } catch (error) {
        thunkApi.rejectWithValue(error);
        throw error;
    }
}

export const updateProductThunk = async(payload:ProductType,thunkApi: { rejectWithValue: (arg0: unknown) => void; })=>{
    try {
        const data = await axios.patch(`${import.meta.env.VITE_API_URL}/api/products/${payload._id}`,payload);
        return data.data;
    } catch (error) {
        thunkApi.rejectWithValue(error);
        throw error;
    }
}


export const createProductThunk = async(payload:ProductType,thunkApi: { rejectWithValue: (arg0: unknown) => void; })=>{
    try {
        const data = await axios.post(`${import.meta.env.VITE_API_URL}/api/products/`,payload);
        return data.data;
    } catch (error) {
        thunkApi.rejectWithValue(error);
        throw error;
    }
}


export const searchProductThunk = async(payload:string,thunkApi: { rejectWithValue: (arg0: unknown) => void; })=>{
    try {
        const data = await axios.get(`${import.meta.env.VITE_API_URL}/api/products/search?${payload}`);
        return data.data;
    } catch (error) {
        thunkApi.rejectWithValue(error);
        throw error;
    }
}
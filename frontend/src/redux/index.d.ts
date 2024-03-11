import { SerializedError } from "@reduxjs/toolkit";

export type GoogleUserType = {
    accessToken: string;
    displayName: string;
    email: string;
    emailVerified: boolean;
    isAnonymous: boolean;
    phoneNumber: string | null | number;
    photoURL: string;
}

export type UserType = {
    email: string;
    token: string;
    username: string;
}

export type InitState = {
    user: null | UserType;
    googleUser: null | GoogleUserType;
    loading: boolean;
    error?: SerializedError | null;
    loginState?: boolean;
}

export type ProductType = {
    _id: string,
    customer_name: string,
    customer_email: string,
    product: string,
    quantity: number|string,
    order_value: number|string
}

export type productInitStateType = {
    products: [] | ProductType[],
    error?:SerializedError;
    loading:boolean;
    totalPages: number | null,
    navigate:boolean;
}
import mongoose from "mongoose";

const product_schema = new mongoose.Schema({
    _id:{
        type:String,
        required:true
    },
    customer_name:{
        type:String,
        required:true,
    },
    customer_email:{
        type:String,
        required:true,
    },
    product:{
        type:String,
        required:true,
    },
    quantity:{
        type:Number,
        default:0
    },
    order_value:{
        type:Number,
        required:true,
    }
},{timestamps:false});

export const productModel = mongoose.model("Porducts",product_schema);
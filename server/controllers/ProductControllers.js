import { productModel} from '../models/Product.js'

export const getAllProducts = async(req,res,next)=>{
    try {
        const products = await productModel.find();
        res.status(200).json({
            products:products,
            message:"success"
        })
    } catch (error) {
        next(error)
    }
}

export const getProducts = async(req,res,next)=>{
    try {
        //*1 to convert string to number
        const page = req.query.page * 1 || 1;
        const limit = req.query.pageSize * 1 || 100;
        const skip = (page - 1) * limit;
        const products = await productModel.find().skip(skip).limit(limit);
        const count = await productModel.countDocuments()

        res.status(200).json({
            message: 'success',
            products: products,
            page:page,
            pageSize:limit,
            totalPages:Math.ceil(count/req.query.pageSize)
          });
    } catch (error) {
        next(error)
    }
}

export const createProduct = async(req,res,next)=>{
    try {
        const {customer_name,customer_email,order_value,product} = req.body
        if(!customer_email || !customer_name || !product || !order_value){
            next("Missing required fields")
        }
        const productCreated = await productModel.create(req.body);
        console.log(productCreated)
        return res.status(200).json({
            message:"success",
            product:productCreated
        })
    } catch (error) {
        next(error)
    }
}


export const searchProducts = async(req,res,next)=>{
    try {
        console.log(req.query)
        let query =  productModel.find()
        Object.keys(req.query).map((e)=>{
            if(req.query[e]) query.find({[e]:req.query[e]});
        })
        const products = await query.exec();
        const count = products.length;
        res.status(200).json({
            message:"success",
            products:products,
            totalPages:Math.ceil(count/12)
        })
    } catch (error) {
        next(error)
    }
}


export const updateProduct = async(req,res,next)=>{
    try {
        const _id = req.params.id;
        const {customer_name,customer_email,quantity,order_value,product} = req.body
        if(!customer_email || !customer_name || !product || !order_value || !_id){
            next("Missing required fields")
        }
        const data = await productModel.findByIdAndUpdate(_id,{customer_name,customer_email,quantity,order_value,product},{new:true});
        return res.status(200).json({
            message:"success",
            product:data,
        })
    } catch (error) {
        next(error);   
    }
    
}

export const deleteProduct = async(req,res,next)=>{
    try {
        const {id} = req.params;
        if(!id){
            next('Invalid product Id')
        }
        await productModel.findByIdAndDelete(id);
        return res.status(200).json({
            message:"success",
            id:id,
        })
    } catch (error) {
        next(error)
    }
}
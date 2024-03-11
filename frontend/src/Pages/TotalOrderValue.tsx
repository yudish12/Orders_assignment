import axios from "axios"
import { useEffect, useState } from "react";
import { ProductType } from "../redux";

const TotalOrderValue = () => {
    const [loading,setLoading] = useState(true);
    const [totalOrderValue,setTotalOrderValue] = useState(0);
    const getAllProducts = async ()=>{
        try {
            const allProducts = await axios.get(`${import.meta.env.VITE_API_URL}/api/products/allproducts`);
            const total = allProducts.data.products.reduce((total:number,curr:ProductType)=>{
                return total+parseInt(curr.order_value.toString())
            },0)
            setTotalOrderValue(total)
        } catch (error) {
            console.error(error);
        }finally{
            setLoading(false);
        }

    }

    useEffect(()=>{
        setLoading(true);
        getAllProducts();
    },[])

    if(loading){
        return <p>Fetching Order Value</p>
    }

  return (
    <div>TotalOrderValue:{totalOrderValue}</div>
  )
}

export default TotalOrderValue
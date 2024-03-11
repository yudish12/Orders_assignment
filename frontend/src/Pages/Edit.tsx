import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { ProductType } from "../redux";
import { useAppDispatch, useAppSlector } from "../redux/store";
import { SetNavigate, updateProduct } from "../redux/slices/ProductSlice";

const Edit = () => {
    const { id } = useParams();
    const { state } = useLocation();
    const dispatch = useAppDispatch()
    const {navigate:prodNavigate} = useAppSlector((state)=>state.productReducers);
    const navigate = useNavigate();
    const [formData, setFormData] = useState<ProductType>({
        product: state.product,
        customer_email: state.customer_email,
        customer_name: state.customer_name,
        quantity: state.quantity,
        order_value: state.order_value,
        _id: state._id
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    useEffect(()=>{
        if(prodNavigate){
            dispatch(SetNavigate())
            navigate("/products")
        }
    },[prodNavigate])

    if (id !== state._id) {
        return <div>Product Not Found</div>;
    }

    return (
        <div className='shadow' style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            justifyContent: "center",
            borderRadius: "16px",
            background: "white",
            borderTopColor: "#3b82f6",
            width: "60%",
            margin: "4rem auto",
            borderTopWidth: "2px",
            alignItems: "center",
            padding: "20px"
        }}>
            <h3 style={{ textAlign: "center", marginTop: "40px" }}>Edit Product</h3>
            <div style={{ width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                {Object.keys(formData).map((key, i) =>
                    <div key={i} style={{ display: "flex", flexDirection: "column", padding: "10px 3rem", marginTop: "50px" }}>
                        <label htmlFor={key}>
                            {key.split('_').join(' ')}
                        </label>
                        <input
                            onChange={handleChange}
                            className="form-input"
                            type={key === "customer_email" ? "email" : (
                                key === "quantity" || key === "order_value" ? "number" :
                                    "text"
                            )}
                            name={key}
                            id={key}
                            value={(formData as never)[key]}
                        />
                    </div>
                )}
            </div>
            <div style={{ gridColumn: "1 / span 2", textAlign: "center", marginTop: "20px" }} className="buttons">
            <button 
                    onClick={()=>{
                        if(!formData.customer_email || !formData.customer_name || !formData.order_value || !formData.product){
                            alert("Please fill required fields")
                        }
                        const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
                        if(!emailRegex.test(formData.customer_email)){
                            alert("Invalid email")
                            return;
                        }
                        dispatch(updateProduct(formData))
                    }} 
                    style={{ 
                        fontSize: "15px", 
                        fontWeight: "600" 
                    }} 
                    className="btn" 
                    type='submit'
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default Edit;

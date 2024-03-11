import React, { useEffect, useState, Suspense } from "react";
import { ProductType } from "../redux";
import { logout } from "../redux/slices/AuthSlice";
import { useAppDispatch, useAppSlector } from "../redux/store"
import binSvg from '../assets/rubbish-bin-svgrepo-com.svg';
import editSvg from '../assets/8666681_edit_icon.svg';
import { deleteProduct, getProducts, searchProduct } from "../redux/slices/ProductSlice";
import { useNavigate } from "react-router-dom";

const TotalOrderValue = React.lazy(() => import('./TotalOrderValue'))

const ProductCard = ({ product }: { product: ProductType }) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				width: "100%",
				height: 300,
				background: "white",
				padding: "3rem",
				gap: "1.5rem"
			}}
		>
			<h5>Name:{product.product}</h5>
			<h5>Quantity:{product.quantity}</h5>
			<h5>Selling price:{product.order_value}</h5>
			<h5>Customer Name:{product.customer_name}</h5>
			<h5>Customer Email:{product.customer_email}</h5>
			<div className="btns"
				style={{
					display: "flex",
					justifyContent: "space-between",
					gap: "8rem"
				}}
			>
				<button onClick={() => dispatch(deleteProduct(product._id))} style={{ background: "white" }} className="btn" >
					<img src={binSvg} alt="bin" />
				</button>
				<button onClick={() => navigate(`/edit/${product._id}`, { state: product })} style={{ background: "white" }} className="btn">
					<img src={editSvg} alt="edit" />
				</button>
			</div>
		</div>
	)
}


const Products = () => {
	const { googleUser } = useAppSlector((state) => state.authReducers);
	const { products, loading, totalPages } = useAppSlector((state) => state.productReducers);
	const [paginate, setPaginate] = useState({
		page: 1,
		pageSize: 12
	})
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const [formData, setFormData] = useState<ProductType>({
        product: "",
        customer_email: "",
        customer_name: "",
        quantity: "",
        order_value: "",
        _id: ""
    });

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value} = e.target;
        setFormData((prev)=>({...prev,[name]:value}))
    }

	useEffect(() => {
		if (!loading) dispatch(getProducts(paginate))
	}, [dispatch, paginate])

	return (
		<section>
			<nav
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					padding: "20px",
					width: "100%",
					position: "fixed",
					top: "0px",
					zIndex: 10,
					background: "#bfdbfe"
				}}
			>
				<div
					className="left"
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						gap: 20
					}}
				>
					<img src={googleUser?.photoURL} alt={googleUser?.displayName} />
					<div>
						<h3>{googleUser?.displayName}</h3>
						<h3>{googleUser?.email}</h3>
						{googleUser?.phoneNumber ? <h3>{googleUser.phoneNumber}</h3> : <h3>Phone number not found</h3>}
					</div>
				</div>
				<div className="right"
					style={{
						display: "flex",
						gap: "2rem"
					}}
				>
					<button
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							padding: "10px 20px",
							alignSelf: "start",
							fontWeight: "600",
							fontSize: "15px"
						}}
						onClick={() => dispatch(logout())}
						className="btn"
					>
						Logout
					</button>
					<button
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							padding: "10px 20px",
							alignSelf: "start",
							fontWeight: "600",
							fontSize: "15px"
						}}
						onClick={() => navigate('/create')}
						className="btn"
					>
						Create
					</button>
				</div>
			</nav>
			<div
				style={{
					marginTop: "16rem",
					display: "flex",
					alignItems:"center",
					flexDirection:"column"
				}}
			>
				<Suspense fallback={<p>Calculating Total Order Value</p>} >
					<TotalOrderValue />
				</Suspense>
				<div style={{
					display:"flex"
				}} >
					{Object.keys(formData).map((key, i) =>
						<div key={i} style={{ display: "flex", flexDirection: "column", padding: "10px 3rem", marginTop: "50px" }}>
							<label htmlFor={key}>
								{key.split('_').join(' ')}
							</label>
							<input onChange={handleChange} className="form-input" type="text" name={key} id={key} value={(formData as never)[key]} />
						</div>
					)}
				</div>
				<button 
					className="btn" 
					style={{
						marginTop:"2rem"
					}}
					onClick={()=>dispatch(searchProduct(
						`customer_name=${formData.customer_name}
						&customer_email=${formData.customer_email}
						&quantity=${formData.quantity}
						&product=${formData.product}
						&order_value=${formData.order_value}
						`
					))}
				>
					Search
				</button>
			</div>
			{
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "380px 380px 380px 380px",
						gap: 20,
						padding: 30,
					}}
				>
					{loading && products.length === 0 ?
						<h3>Loading....</h3> :
						products?.map((e) => <ProductCard key={e._id} product={e} />)
					}
				</div>
			}
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					gap: "14rem",
					padding: "3rem"
				}}
				className="pagination"
			>
				<button
					disabled={paginate.page === 1}
					onClick={() => {
						setPaginate((prev) => {
							const temp = JSON.parse(JSON.stringify(prev));
							temp.page = prev.page - 1;
							temp.pageSize = prev.pageSize;
							return temp;
						})
					}}
					className="btn"
				>
					Prev
				</button>
				<button
					disabled={paginate.page === totalPages}
					onClick={() => {
						setPaginate((prev) => {
							const temp = JSON.parse(JSON.stringify(prev));
							temp.page = prev.page + 1;
							temp.pageSize = prev.pageSize;
							return temp;
						})
					}}
					className="btn"
				>
					Next
				</button>
			</div>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					marginTop: "-5.5rem",
				}}
			>
				{paginate.page} page of {totalPages}
			</div>
		</section>
	)
}

export default Products

import { useEffect } from 'react';
import GoogleSVG from '../assets/1534129544.svg'
import { loginWithGoogle } from '../redux/slices/AuthSlice';
import { useAppDispatch, useAppSlector } from '../redux/store'
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { loading,loginState } = useAppSlector((state) => state.authReducers)

    const handleGoogleLogin = () => {
        dispatch(loginWithGoogle(null))
    }

    useEffect(()=>{
        console.log(loginState)
        if(loginState){
            navigate('/products')
        }
    },[loginState])

    return (
        <div
            style={{
                display: "flex",
                height: "100vh",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div
                className='shadow'
                style={{
                    borderRadius: "16px",
                    background: "white",
                    width: "400px",
                    height: "400px",
                    borderTopColor: "#3b82f6",
                    borderTopWidth: "2px",
                    display:"flex",
                    flexDirection:"column"
                }}
            >
                {loading ? <span style={{margin:"4rem auto"}} >Sign in With Google in New Window</span> :
                    <>
                        <h3 style={{ textAlign: "center", marginTop: "40px" }}>Login With Google</h3>
                        <div style={{ display: "flex", flexDirection: "column", padding: "10px 3rem", marginTop: "50px" }}>
                            <label htmlFor="email">
                                Email
                            </label>
                            <input className="form-input" type="text" name="" id="email" />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", padding: "10px 3rem" }}>
                            <label htmlFor="password">
                                Password
                            </label>
                            <input className="form-input" type="text" name="" id="password" />
                        </div>
                        <div className="buttons">
                            <button style={{ fontSize: "15px", fontWeight: "600" }} className="btn" type='submit'>Submit</button>
                            <button style={{ display: "flex", fontSize: "15px", fontWeight: "600", gap: "8px", alignItems: "center" }} className="btn" onClick={handleGoogleLogin}>
                                <img style={{ background: "white" }} width={20} height={20} src={GoogleSVG} alt="google" />
                                Login With Google
                            </button>
                        </div>
                    </>
                }

            </div>
        </div>
    )
}

export default Auth
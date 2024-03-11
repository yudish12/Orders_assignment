import { ReactNode, useEffect } from 'react'
import { useAppDispatch, useAppSlector } from '../redux/store'
import { Navigate } from 'react-router-dom'
import { restoreAuth } from '../redux/slices/AuthSlice'


const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const state = useAppSlector((state) => state.authReducers)
    const dispatch = useAppDispatch();
    const loginState = state.googleUser || state.user || JSON.parse(localStorage.getItem('user')!)?.accessToken

    useEffect(()=>{
        dispatch(restoreAuth());
    },[])

    if(!loginState){
        return <Navigate to={"/"} />
    }

    

    return (
        <>
            {children}
        </>
    )
}

export default ProtectedRoute
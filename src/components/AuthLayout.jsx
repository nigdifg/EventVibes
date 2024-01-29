import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


export default function Protected({children, authentication = true}) {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        if(authentication && authStatus !== authentication){
            navigate("/login");
            toast.error("You are not authenticated. Redirecting to login page...");
        } else if(!authentication && authStatus !== authentication){
            navigate("/");
            toast.success("You are authenticated. Redirecting to home page...");
        }
        setLoader(false);
    }, [authStatus, navigate, authentication]);
    // useEffect(() => {

    //     if(authentication && authStatus !== authentication){
    //         navigate("/login")
    //     } else if(!authentication && authStatus !== authentication){
    //         navigate("/")
    //     }
    //     setLoader(false)
    // }, [authStatus, navigate, authentication])
return loader ? <h1 style={{ color: 'blue', fontSize: '2em' }}>Loading...</h1> : <>{children}</>
//   return loader ? <h1>Loading...</h1> : <>{children}</>
}

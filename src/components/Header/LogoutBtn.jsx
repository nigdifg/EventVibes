import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
      authService.logout().then(() => {
        dispatch(logout());
        toast.success("Logged out successfully");
      }).catch((error) => {
        toast.error(`An error occurred: ${error.message}`);
      });
    };
  return (
    <>
    <ToastContainer />
    <button
    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    onClick={logoutHandler}

    >Logout</button>
    </>
  )
}

export default LogoutBtn
import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import {Button, Input} from "./index"
import {useDispatch} from "react-redux"
import authService from "../appwrite/auth"
import {useForm} from "react-hook-form"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")

    const login = async(data) => {
        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(authLogin(userData));
                toast.success("Login successful");
                navigate("/")
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

  return (
    <>
      <ToastContainer />
      <div className='flex items-center justify-center w-full h-screen bg-gray-500'>
          <div className={`mx-auto w-full max-w-lg bg-white rounded-xl p-20 border border-green-500 shadow-lg`}>
          <div className="mb-2 flex justify-center">
                      
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight mb-4">Sign in to your account</h2>
          <form onSubmit={handleSubmit(login)} className='mt-8'>
              <div className='space-y-5'>
                  <Input
                  label="Email: "
                  placeholder="Enter your email"
                  type="email"
                  {...register("email", {
                      required: true,
                      validate: {
                          matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                          "Email address must be a valid address",
                      }
                  })}
                  />
                  <Input
                  label="Password: "
                  type="password"
                  placeholder="Enter your password"
                  {...register("password", {
                      required: true,
                  })}
                  />
                  <Button
                  type="submit"
                  className="w-full bg-green-500 text-white py-2 rounded hover:bg-blue-400 transition duration-200"
                  >Sign in</Button>
              </div>
          </form>
          <p className="mt-2 text-center text-base text-black/60">
                      Don&apos;t have any account?&nbsp;
                      <Link
                          to="/signup"
                          className="font-medium text-green-500 transition-all duration-200 hover:underline"
                      >
                          Sign Up
                      </Link>
          </p>
          </div>
      </div>
    </>
  )
}

export default Login
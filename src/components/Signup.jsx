import React, {useState} from 'react'
import authService from '../appwrite/auth'
import {Link ,useNavigate} from 'react-router-dom'
import {login} from '../store/authSlice'
import {Button, Input} from './index.js'
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()

    const create = async(data) => {
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(login(userData));
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
            
          <h2 className="text-center text-2xl font-bold leading-tight mb-4">Sign up to create account</h2>
          <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-blue-500 transition-all duration-200 hover:underline"
                    >
                        <span className="text-green-500">
                        Sign In
                        </span>
                    </Link>
                </p>
          <form onSubmit={handleSubmit(create)} className='mt-8'>
              <div className='space-y-8'>
                  <Input
                  label="Full Name"
                  placeholder="Enter your full name"
                  {...register("name", {
                      required: true,
                  })}
                  />
                  <Input
                  label="Email "
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
                  label="Password "
                  type="password"
                  placeholder="Enter your password"
                  {...register("password", {
                      required: true,})}
                  />
                  <Button
                  type="submit"
                  className="w-full bg-green-500 text-white py-2 rounded hover:bg-blue-400 transition duration-200"
                  >Create Account</Button>
              </div>
          </form>
          </div>
      </div>
    </>
  )
}

export default Signup
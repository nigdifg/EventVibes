import React from 'react'
import { FaRegCalendarCheck, FaShareSquare, FaRegChartBar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux'
import CarouselImage from './CarouselImage'

function Intro() {
  const authStatus = useSelector((state) => state.auth.status)

  return (
    <div className='flex flex-col items-center justify-center bg-gray-500 min-h-screen text-white p-8'>
    
      <p className='text-green-400 font-bold text-4xl md:text-7xl text-center'>
        Welcome to
        <span className='text-white'> EventVibes</span>
      </p>
      <h1 className='text-2xl md:text-4xl font-bold py-6 text-center'>
        Organise your events with us!
      </h1>
      <p className='text-xl md:text-2xl font-bold py-4 text-center'>
        Fast, flexible for organizing events!
      </p>
      <p className='text-lg md:text-xl wrap font-bold text-gray-300 text-center'>
        Monitor your event analytics to optimize your planning, increase attendee engagement, and maximize your event's impact.
      </p>     
      <h2 className='text-2xl md:text-4xl font-bold py-6 text-center'>
       Do you Know the Best part? <span className='text-green-400'> its free!</span>
      </h2>
      
        <CarouselImage />
        
      {
        authStatus ? (
          <Link to='/about'>
            <button className='bg-green-400 w-full md:w-52 rounded-md font-medium my-6 py-3 text-black transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110'>Get Started</button>
          </Link>
        ) : (
          <Link to='/login'>
            <button className='bg-green-400 w-full md:w-52 rounded-md font-medium my-6 py-3 text-black transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110'>Login to explore</button>
          </Link>
        )
      }

      </div>
    
  )
}

export default Intro
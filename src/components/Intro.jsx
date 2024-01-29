import React from 'react'
function Intro() {
  return (
    <div className='text-white flex flex-col items-center justify-center bg-gray-540'>
      <p className='text-green-400 font-bold text-2xl'>
        Welcome to
        <span className='text-4xl md:text-7xl font-bold'> EventVibes</span>

      </p>
      <h1 className='text-4xl md:text-7xl font-bold py-6'>
        Organise your events with us!
      </h1>
      <div className='flex justify-center items-center'>
        <p className='text-xl md:text-5xl font-bold py-4'>
          Fast, flexible for organizing events!
        </p>
       
      </div>
      <p className='text-xl md:text-2xl font-bold text-gray-500'>Monitor your data analytics to increase revenue for BTB, BTC, & SASS platforms.</p>
      <button className='bg-green-400 w-52 rounded-md font-medium my-6 py-3 text-black'>Get Started</button>
    </div>
  )
}

export default Intro

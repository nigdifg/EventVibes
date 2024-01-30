import React from 'react'
import { FaRegCalendarCheck, FaShareSquare, FaRegChartBar } from 'react-icons/fa';

function Intro() {

  const Card = ({ title, description, Icon }) => (
    <div className="flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-6 m-4">
      <Icon className="h-12 w-12 text-green-400 mb-4"/>
      <h2 className="font-bold text-gray-700 text-xl mb-2">{title}</h2>
      <p className="text-gray-700">{description}</p>
    </div>
  );

  return (
    <div className='flex flex-col items-center justify-center bg-gray-500 min-h-screen text-white p-4'>
      <p className='text-green-400 font-bold text-4xl md:text-7xl'>
        Welcome to
        <span className='text-white'> EventVibes</span>
      </p>
      <h1 className='text-2xl md:text-4xl font-bold py-6'>
        Organise your events with us!
      </h1>
      <p className='text-xl md:text-2xl font-bold py-4'>
        Fast, flexible for organizing events!
      </p>
      <p className='text-lg md:text-xl font-bold text-gray-300'>Monitor your data analytics to increase revenue for BTB, BTC, & SASS platforms.</p>
      <h2 className='text-2xl md:text-4xl font-bold py-6'>
        How it works
      </h2>
      <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4">
        <Card 
          Icon={FaRegCalendarCheck} 
          title="1. Create an event" 
          description="Create your event and set up all the details." 
        />
        <Card 
          Icon={FaShareSquare} 
          title="2. Share the event" 
          description="Share your event with your audience or community." 
        />
        <Card 
          Icon={FaRegChartBar} 
          title="3. Track the event" 
          description="Track the performance and engagement of your event." 
        />
      </div>
      <button className='bg-green-400 w-full md:w-52 rounded-md font-medium my-6 py-3 text-black'>Login to explore</button>
    </div>
  )
}

export default Intro
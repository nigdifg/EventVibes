import React from 'react'
import { FaRegCalendarCheck, FaShareSquare, FaRegChartBar, FaRegEdit } from 'react-icons/fa';
import { FcInspection } from "react-icons/fc";
import { PiRocketFill } from "react-icons/pi";

function About() {

  const Card = ({ title, description, Icon }) => (
    <div className="flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-6 m-4">
      <Icon className="h-12 w-12 text-green-400 mb-4"/>
      <h2 className="font-bold text-gray-700 text-xl mb-2">{title}</h2>
      <p className="text-gray-700">{description}</p>
    </div>
    );
  const CardUse = ({ title, description, Icon }) => (
    <div className="flex flex-col items-center justify-center bg-green-400 shadow-md rounded-lg p-6 m-4">
      <Icon className="h-14 w-14 text-white mb-6"/>
      <h2 className="font-bold text-gray-700 text-xl mb-2">{title}</h2>
      <p className="text-gray-700">{description}</p>
    </div>
    );

  return (
    <div className='flex flex-col items-center justify-center bg-gray-500 min-h-screen text-white p-4'>
      <p className='text-green-400 font-bold text-4xl md:text-7xl'>
        About
        <span className='text-white'> Us</span>
      </p>
      <h1 className='text-2xl md:text-4xl font-bold py-6'>
        Organise your events with us!
      </h1>
      <p className='text-xl md:text-2xl font-bold py-4'>
        Fast, flexible for organizing events!
      </p>
      <p className='text-lg md:text-xl wrap font-bold text-gray-300'>
        Monitor your event analytics to optimize your planning, increase attendee engagement, and maximize your event's impact.
      </p>     
      <h2 className='text-2xl md:text-4xl font-bold py-6'>
        How it <span className='text-green-500'>works!</span>
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
      <h2 className='text-2xl md:text-4xl font-bold py-6'>
        Why use <span className='text-green-500'> EventVibes?</span>
      </h2>
      <p className='flex-wrap text-3xl'>
        Offcourse its <span className='text-green-500 '> free!</span> <br /> We have a lot of features that you can use to make your event more engaging and fun!
        Easy to use and easy to share!
      </p>
      <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4">
        <CardUse 
          Icon={FcInspection} 
          title="Easy to use" 
          description="Create your event and set up all the details very easily and quickly with our user friendly interface." 
        />
        <CardUse 
          Icon={FaRegEdit} 
          title="Flexibility and Adaptability" 
          description="It is very flexible and adaptble as per your needs , you can edit and update your event anytime you want." 
        />
        <CardUse 
          Icon={PiRocketFill}
          title="Audience Engagement" 
          description="Share you event with your audience and engage with them with our interactive features." 
        />
      </div>
      

      
    </div>
  )
}

export default About
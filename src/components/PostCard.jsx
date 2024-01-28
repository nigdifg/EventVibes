import React from 'react'
import appwriteService from "../appwrite/config"
import {Link, useLocation} from 'react-router-dom'

function PostCard({$id, title, featuredImage, ticketPrice, eventDateTime}) {
  const location = useLocation();
  const postUrl = `${window.location.origin}/post/${$id}`;
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(postUrl);
      console.log('URL copied to clipboard');
    } catch (err) {
      console.error('Failed to copy URL: ', err);
    }
  }

  return (
    <div className="block bg-white rounded-lg shadow-md overflow-hidden transition transform hover:scale-105">
      <Link to={`/post/${$id}`}>
        <img src={appwriteService.getFilePreview(featuredImage)} alt={title} className='w-full h-64 object-cover' />
        <div className='p-6'>
          <h2 className='text-2xl font-bold mb-2'>{title}</h2>
          <p className='text-lg text-gray-700 mb-2'>Ticket Price: Rs {ticketPrice}</p>
          <p className='text-lg text-gray-700'>Date: {new Date(eventDateTime).toDateString()}</p>
        </div>
      </Link>
      <button onClick={copyToClipboard} className="p-2 bg-blue-500 text-white rounded">Copy URL</button>
    </div>
  )
}

export default PostCard
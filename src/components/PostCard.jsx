import { useState } from "react"
import React from 'react'
import appwriteService from "../appwrite/config"
import {Link, useLocation} from 'react-router-dom'
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa'; // Add this line


function PostCard({$id, title, featuredImage, ticketPrice, eventDateTime}) {
  const location = useLocation();
  const postUrl = `${window.location.origin}/post/${$id}`;
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [likeStatus, setLikeStatus] = useState(null); // Add this line

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(postUrl);
      console.log('URL copied to clipboard');
    } catch (err) {
      console.error('Failed to copy URL: ', err);
    }
  }

  const handleLike = () => {
    if (likeStatus === 'disliked') {
      setDislikes(dislikes - 1);
    }
    setLikes(likeStatus === 'liked' ? likes - 1 : likes + 1);
    setLikeStatus(likeStatus === 'liked' ? null : 'liked');
  }

  const handleDislike = () => {
    if (likeStatus === 'liked') {
      setLikes(likes - 1);
    }
    setDislikes(likeStatus === 'disliked' ? dislikes - 1 : dislikes + 1);
    setLikeStatus(likeStatus === 'disliked' ? null : 'disliked');
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
      <div className="flex items-center justify-start mt-2">
        <button onClick={handleLike} className="p-2 bg-red-500 text-white rounded ml-2 flex items-center"><FaThumbsUp /><span className="ml-1">{likes}</span></button>
        <button onClick={handleDislike} className="p-2 bg-gray-500 text-white rounded ml-2 flex items-center"><FaThumbsDown /><span className="ml-1">{dislikes}</span></button>
      </div>
    </div>
  )
}

export default PostCard
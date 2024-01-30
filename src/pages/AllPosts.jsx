import React, {useState, useEffect} from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config";

function AllPosts() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])

    return (
        <div className='w-full py-8 bg-gray-500'>
            <Container>
                <h1 className="text-3xl font-bold text-center text-green-200 mb-6">All Events</h1>
                <div className='grid grid-cols-3 gap-5'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-1 w-full shadow-md rounded-lg transform transition duration-500 ease-in-out hover:scale-105'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts
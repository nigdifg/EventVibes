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
        <div className='w-full py-8 bg-gray-100'>
            <Container>
                <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">All Posts</h1>
                <div className='grid grid-cols-4 gap-4'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-full bg-white shadow-md rounded-lg transform transition duration-500 ease-in-out hover:scale-105'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts
import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import {Container, PostCard,Intro} from '../components'

function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])
  
    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <Intro/>
                   
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full min-w-full min-h-full py-8'>
            <Container>
                <Intro/>
            </Container>
        </div>
    )
}

export default Home
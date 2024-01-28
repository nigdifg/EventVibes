import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import {Container, PostCard} from '../components'

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
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>

                    Todo:

                    To do something:

                    <br />
                    
                    App that can be used to organise events.
                    sell tickets, option - wise poll,B-day invitation,marrige invitaton
                    aplication form and advertisement with user response
                    template wise dynamic pages - customized pages
                    <br />
                    many template to give a custom template and edit template to make your own theme.
                    admin pannel to make template and all elements in ststic apge.
                    add preview and edit page.
                    create event hoster, share,and host

                    many comapnies can provide their hiring process 


                    
                    {/* {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))} */}
                </div>
            </Container>
        </div>
    )
}

export default Home
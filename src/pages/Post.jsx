import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="bg-gray-100 py-8">
            <Container>
                <div className="bg-white shadow-md rounded-lg p-6 mb-8">
                    <div className="flex justify-center mb-4 relative">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg w-full h-64 object-cover"
                        />

                        {isAuthor && (
                            <div className="absolute right-6 top-6">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button bgColor="bg-green-500" className="mr-3">
                                        Edit
                                    </Button>
                                </Link>
                                <Button bgColor="bg-red-500" onClick={deletePost}>
                                    Delete
                                </Button>
                            </div>
                        )}
                    </div>
                    <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
                        {post.title}
                    </h1>
                    <div className="mb-6 text-lg text-gray-700">
                        {parse(post.content)}
                    </div>
                    <div className="bg-blue-50 p-4 rounded-md shadow-inner">
                        <p className="text-xl font-bold mb-2">Event's Ticket Price : <span className="font-normal text-blue-600">{post.ticketPrice}</span></p>
                        <p className="text-xl font-bold mb-2">Location of Event : <span className="font-normal text-blue-600">{post.location}</span></p>
                        <p className="text-xl font-bold mb-2">Date of Event : 
                            <span className="font-normal text-blue-600">
                                {new Date(post.eventDateTime).toLocaleDateString()}
                            </span>                
                        </p>       
                        <p className="text-xl font-bold">Time of Event : 
                        <span className="font-normal text-blue-600">
                                {new Date(post.eventDateTime).toLocaleTimeString()}                        
                        </span>
                        </p>         
                    </div>
                </div>
            </Container>
        </div>
    ) : null;
}
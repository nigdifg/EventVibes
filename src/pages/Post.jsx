import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { FiPlusSquare, FiMinusSquare } from 'react-icons/fi';
import { toast } from 'react-toastify';
    import 'react-toastify/dist/ReactToastify.css';
    import { ToastContainer } from 'react-toastify';

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const [isEventDetailsOpen, setIsEventDetailsOpen] = useState(true);
    const [isOrganizerDetailsOpen, setIsOrganizerDetailsOpen] = useState(true);
    const [isWhenAndWhereOpen, setIsWhenAndWhereOpen] = useState(true);
    const [isTicketPriceOpen, setIsTicketPriceOpen] = useState(true);
    

    const userData = useSelector((state) => state.auth.userData);

    // console.log(userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;
    // console.log(post.contact);
    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            }).catch((error) => {
                toast.error(`An error occurred: ${error.message}`);
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        }).catch((error) => {
            toast.error(`An error occurred: ${error.message}`);
        });
    };
    // useEffect(() => {
    //     if (slug) {
    //         appwriteService.getPost(slug).then((post) => {
    //             if (post) setPost(post);
    //             else navigate("/");
    //         });
    //     } else navigate("/");
    // }, [slug, navigate]);

    // const deletePost = () => {
    //     appwriteService.deletePost(post.$id).then((status) => {
    //         if (status) {
    //             appwriteService.deleteFile(post.featuredImage);
    //             navigate("/");
    //         }
    //     });
    // };
  
    return post ? (
        <>
        <ToastContainer />
        
        <div className="bg-gray-500 py-8">
            <Container>
                <div className="flex">
                    <div className="w-1/2 bg-gray-500 shadow-md rounded-lg p-6 mb-8">
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
                        <h1 className="text-3xl font-bold text-center text-white mb-6">
                            {post.title}
                        </h1>
                        
                        <div className="bg-gray-500 shadow-md rounded-lg p-8 mb-8">
                            <h2 className="text-2xl text-green-500 font-bold mb-4 text-center cursor-pointer" onClick={() => setIsOrganizerDetailsOpen(!isOrganizerDetailsOpen)}>
                                Organizer Details <span text-green-500> {isOrganizerDetailsOpen ? <FiMinusSquare /> : <FiPlusSquare />}</span>
                            </h2>
                            {isOrganizerDetailsOpen && (
                                <>
                                    <p className="text-xl font-bold mb-2">Name : <span className="font-normal text-white">{post.name}</span></p>
                                    <p className="text-xl font-bold mb-2">Contact :<span className="font-normal text-white">{post.contact}</span></p>
                                </>
                            )}
                        </div>
                        
                    </div>
                    <div className="w-1/2">
                       

                        <div className="bg-gray-500 shadow-md rounded-lg p-6 mb-8">
                            <h2 className="text-2xl text-green-500 font-bold mb-4 text-center cursor-pointer" onClick={() => setIsEventDetailsOpen(!isEventDetailsOpen)}>
                                Event Details {isEventDetailsOpen ? <FiMinusSquare /> : <FiPlusSquare />}
                            </h2>
                            {isEventDetailsOpen && (
                                <>
                                  <p className="text-xl font-bold mb-2">
                                  <div className="mb-6 text-lg text-white">
                            {parse(post.content)}
                        </div>    
                                 <span className="font-normal text-white">{post.location}</span></p>    
                                </>
                            )}
                        </div>
                        <div className="bg-gray-500 shadow-md rounded-lg p-6 mb-8">
                        <h2 className="text-2xl text-green-500 font-bold mb-4 text-center cursor-pointer" onClick={() => setIsWhenAndWhereOpen(!isWhenAndWhereOpen)}>
                            When and Where? {isWhenAndWhereOpen ? <FiMinusSquare /> : <FiPlusSquare />}
                        </h2>
                        {isWhenAndWhereOpen && (
                            <>
                                <p className="text-xl font-bold mb-2">Date : &nbsp;
                                    <span className="font-normal text-white">
                                        {new Date(post.eventDateTime).toLocaleDateString()}
                                    </span>                
                                </p>       
                                <p className="text-xl font-bold">Time : &nbsp;
                                <span className="font-normal text-white">
                                        {new Date(post.eventDateTime).toLocaleTimeString()}                        
                                </span>
                                </p>         
                                <p className="text-xl font-bold">Location :&nbsp;
                                <span className="text-white font-noraml">
                                    {post.location}
                                </span>
                                
                                </p>         
                            </>
                        )}
                    </div>
                    <div className="bg-gray-500 shadow-md rounded-lg p-6 mb-8">
                    <h2 className="text-2xl text-green-500 font-bold mb-4 text-center cursor-pointer" onClick={() => setIsTicketPriceOpen(!isTicketPriceOpen)}>
                        Ticket Price {isTicketPriceOpen ? <FiMinusSquare /> : <FiPlusSquare />}
                    </h2>
                    {isTicketPriceOpen && (
                        <>
                            <p className="text-xl font-bold mb-2">Ticket Price : <span className="font-normal text-white">{post.ticketPrice}</span></p>
                        </>
                    )}
                    </div>
                    </div>
                </div>
            </Container>
        </div>
        </>
    ) : null;
}
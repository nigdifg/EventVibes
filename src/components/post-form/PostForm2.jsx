import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Container from "../container/Container";


export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
            eventDateTime: post?.eventDateTime || "",
            location: post?.location || "",
            ticketPrice: post?.ticketPrice || "",
            name: post?.name || "",
            contact: post?.contact || "",
            
        },
    });
    
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if (file) {
                appwriteService.deleteFile(post.featuredImage);
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } 
        else {
            const file = await appwriteService.uploadFile(data.image[0]);

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);
   

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <div className="bg-gray-100 py-8">
            <Container>
                <div className="bg-white shadow-md rounded-lg p-6 mb-8">
                    <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">{post ? "Update Event" : "Create Event"}</h1>
                    <form onSubmit={handleSubmit(submit)} className="space-y-4">
                        <div className="flex flex-wrap -mx-2">
                            <div className="w-full md:w-2/3 px-2">
                                <Input
                                    label="Event Name :"
                                    placeholder="Title"
                                    className="w-full"
                                    {...register("title", { required: true })}
                                />
                                <Input
                                    label="Slug :"
                                    placeholder="Slug"
                                    className="w-full"
                                    {...register("slug", { required: true })}
                                    onInput={(e) => {
                                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                                    }}
                                />
                                <Input
                                    label="Organizer Name :"
                                    placeholder="Organizer Name"
                                    className="w-full"
                                    {...register("name", { required: true })}   
                                />
                                <Input
                                    label="Organizer Contact :"
                                    placeholder="Organizer Contact"
                                    className="w-full"
                                    {...register("contact", { required: true })}
                                />

                                <RTE label="Description of Event :" name="content" control={control} defaultValue={getValues("content")} />
                            </div>
                            <div className="w-full md:w-1/3 px-2">
                                <Input 
                                    label="Date and Time of Event :"
                                    placeholder="Date and Time of Event"
                                    className="w-full"
                                    type="datetime-local" {...register("eventDateTime")} 
                                />
                                <Input
                                    label="Location of Event :"
                                    placeholder="Location of Event"
                                    className="w-full"
                                    {...register("location", { required: true })}
                                />
                                <Input  
                                    label="Event's Ticket Price :"
                                    placeholder="Event's Ticket Price"
                                    className="w-full"
                                    {...register("ticketPrice", { required: true })}
                                />
                                <Input
                                    label="Event Image :"
                                    type="file"
                                    className="w-full"
                                    accept="image/png, image/jpg, image/jpeg, image/gif"
                                    {...register("image", { required: !post })}
                                />
                                {post && (
                                    <div className="w-full mb-4">
                                        <img
                                            src={appwriteService.getFilePreview(post.featuredImage)}
                                            alt={post.title}
                                            className="rounded-lg w-full h-64 object-cover"
                                        />
                                    </div>
                                )}
                                <Select
                                    options={["active", "inactive"]}
                                    label="Status"
                                    className="w-full"
                                    {...register("status", { required: true })}
                                />
                                <Button type="submit" bgColor={post ? "bg-green-500" : "bg-blue-500"} className="w-full mt-4">
                                    {post ? "Update" : "Submit"}
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </Container>
        </div>
    );
}
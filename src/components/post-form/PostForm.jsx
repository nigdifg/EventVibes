import React,{useCallback,useState } from "react";
import { useForm,useWatch } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Container from "../container/Container";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


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
const image = watch("image");
  const title = useWatch({ control, name: "title" });
  const detail = useWatch({ control, name: "detail" });
  const eventorganiser = useWatch({ control, name: "name" });
  const ticketprice = useWatch({ control, name: "ticketPrice" });
  const eventdatetime = useWatch({ control, name: "eventDateTime" });
  const status = useWatch({ control, name: "status" });

  // ... other required fields

  const [expandedSection, setExpandedSection] = useState("");

  const toggleSection = (sectionName) => {
    setExpandedSection(expandedSection === sectionName ? "" : sectionName);
  };

  const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
      try {
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
      } catch (error) {
        toast.error(`${error.message}`);
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
    <>
    <ToastContainer />
    
    <div className="bg-gray-100 py-8">
      <Container>
        <div className="grid grid-cols-3 gap-4">
          {/* Navbar */}
          <div className="col-span-1 bg-gray-300 p-4 rounded-lg">
            <button
              className={`p-4 w-full text-center rounded-lg mb-4 ${expandedSection === "eventName" ? "bg-blue-500 text-white" : ""}`}
              onClick={() => toggleSection("eventName")}
            >
              Event Name {title ? null : <span className="text-red-500">*</span>}
              
            </button>
            <button
              className={`p-4 w-full text-center rounded-lg mb-4 ${expandedSection === "eventDetails" ? "bg-blue-500 text-white" : ""}`}
              onClick={() => toggleSection("eventDetails")}
            >
              Event Details {detail ? null : <span className="text-red-500">*</span>}

            </button>
            <button
              className={`p-4 w-full text-center rounded-lg mb-4 ${expandedSection === "eventOrganizer" ? "bg-blue-500 text-white" : ""}`}
              onClick={() => toggleSection("eventOrganizer")}
            >
              Event Organizer {eventorganiser ? null : <span className="text-red-500">*</span>}
            </button>
            <button
              className={`p-4 w-full text-center rounded-lg mb-4 ${expandedSection === "ticketPrice" ? "bg-blue-500 text-white" : ""}`}
              onClick={() => toggleSection("ticketPrice")}
            >

              Event Ticket Price {ticketprice ? null : <span className="text-red-500">*</span>}
            </button>
            <button
              className={`p-4 w-full text-center rounded-lg mb-4 ${expandedSection === "eventDateTime" ? "bg-blue-500 text-white" : ""}`}
              onClick={() => toggleSection("eventDateTime")}
            >
              When and Where? {eventdatetime ? null : <span className="text-red-500">*</span>}
            </button>
            <button
              className={`p-4 w-full text-center rounded-lg mb-4 ${expandedSection === "status" ? "bg-blue-500 text-white" : ""}`}
              onClick={() => toggleSection("status")}
            >
              Status {status ? null : <span className="text-red-500">*</span>}
            </button>
            <button
              className={`p-4 w-full text-center rounded-lg mb-4 ${expandedSection === "image" ? "bg-blue-500 text-white" : ""}`}
              onClick={() => toggleSection("image")}
            >
              Event Image {image ? null : <span className="text-red-500">*</span>}
            </button>
            
          </div>

          {/* Main Content */}
          <div className="col-span-2 p-4 bg-white rounded-lg">
            <div className="mb-4">
              <p className="text-lg text-gray-700">
                <span className="font-bold">Note:</span> Please fill out all the fields below to create a new post.
              </p>
            </div>
          <form onSubmit={handleSubmit(submit)}>

            
            {expandedSection === "eventName" && (
              <div className="flex flex-col items-start">
                <label className="mb-2 font-bold text-lg">Event Name
              
                </label>
                <Input 
                  label="Event Name :"
                  className="p-2 rounded-md w-full"
                  placeholder="Event Name : "
                  {...register("title", { required: true })}
                  
                />
                
                <Input
                  label="Slug :"
                  className="p-2 rounded-md w-full"
                  placeholder="Slug"
                  {...register("slug", { required: true })}
                  onInput={(e) => {
                    setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                  }}
                />
              </div>
            )}

            {expandedSection === "eventDetails" && (
              <div className="flex flex-col items-start">
                <label className="mb-2 font-bold text-lg">Event Details</label>
                <RTE label="Description of Event :" name="content" control={control} defaultValue={getValues("content")} />

              </div>
            )}
            
            {expandedSection === "eventOrganizer" && (  
                <div className="flex flex-col items-start">
                <label className="mb-2 font-bold text-lg">Event Organizer</label>
                <Input
                  label="Organizer Name :"
                  className="p-2 rounded-md w-full"
                  placeholder="Organizer Name"
                  {...register("name", { required: true })}   
                />

                
                <Input
                  label="Organizer Contact :"
                  className="p-2 rounded-md w-full"
                  placeholder="Organizer Contact"
                  {...register("contact", { required: true })}
                />
              </div>
            )}

            {expandedSection === "ticketPrice" && (
              <div className="flex flex-col items-start">
                <label className="mb-2 font-bold text-lg">Ticket Price</label>
                <Input  
                  label="Event's Ticket Price :"
                  placeholder="Event's Ticket Price"
                  className="w-full"
                  {...register("ticketPrice", { required: true })}
                />
              </div>
            )}
            {expandedSection === "eventDateTime" && (
              <div className="flex flex-col items-start">
                <label className="mb-2 font-bold text-lg">When and Where?</label>
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
              </div>
            )}
            {expandedSection === "image" && (
              <div className="flex flex-col items-start">
                <label className="mb-2 font-bold text-lg">
                  Event Image {image && image[0] ? null : <span className="text-red-500">*</span>}
                </label>
                <Input
                  label="Event Image :"
                  type="file"
                  className="w-full"
                  accept="image/png, image/jpg, image/jpeg, image/gif"
                  {...register("image", { required: !post })}
                />
              </div>
            )} 
            {expandedSection === "status" && (
            <div className="flex flex-col items-start">
            <label className="mb-2 font-bold text-lg">Status</label>
            <Select
              options={["active", "inactive"]}
              label="Status"
              className="w-full"
              {...register("status", { required: true })}
            />
            
              </div>
              )}  

              <div className="mt-4">
                <Button 
                  onClick={handleSubmit(submit)} 
                  type="submit" 
                  bgColor={post ? "bg-green-500" : "bg-blue-500"} 
                  className="w-full"
                >
                  {post ? "Update" : "Submit"}
                </Button>
              </div>
          </form>         
          </div>
        </div>
      </Container>
    </div>
    </>
  );
}
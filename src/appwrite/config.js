import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";
import { toast,Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export class Service{
    client = new Client();
    databases;
    bucket;
    

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    
    async createPost({title, slug, content, featuredImage, status, userId, eventDateTime, location, ticketPrice,name,contact}){
        try {
            const result = await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                    eventDateTime, // new field
                    location,
                    ticketPrice,
                    name,
                    contact,
                }
            );
            toast.success("Post created successfully");
            return result;
        } catch (error) {
            toast.error(`An error occurred: ${error.message}`);
        }
    }

    async updatePost(slug, {title, content, featuredImage, status, eventDateTime, location,ticketPrice,name,contact}){
        try {
            const res =  await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    eventDateTime,
                    location,
                    ticketPrice,
                    name,
                    contact,
                }
            );
            toast.success("Post updated successfully");
            return res;
        } catch (error) {
            toast.error(`${error.message}`);
        }
    }
    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
            toast.success("Post deleted successfully");
            return true;
        } catch (error) {
            toast.error(`An error occurred: ${error.message}`);
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            
            )
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false
        }
    }


    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
                

            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }

    // file upload service

    async uploadFile(file){
        try {
            const result = await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
            toast.success("File uploaded successfully");
            return result;

        } catch (error) {
            toast.error(`An error occurred: ${error.message}`);
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}


const service = new Service()
export default service
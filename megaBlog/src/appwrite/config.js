import conf from "../conf/conf";
import { Client, Databases, ID ,Storage ,Query } from "appwrite";

export class Service{
    client = new Client();
    Databases ;
    bucket;
    constructor(){
        this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    //this.account = new Account(this.client);
    this.Databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
    }

    async createPost ({title , slug, content, featuredImage, status , userId}){
        try {
         return await this.Databases.createDocument(
           conf.appwriteDatabaseId,
           conf.appwriteCollectionId,
           slug,{
            title,content,featuredImage,status,userId,
           }
         )   
        } catch (error) {
            console.log("AppWrite service :: createPost :: error", error);
        }
    }

    async updatePost(slug,{title ,  content, featuredImage, status }){
        try {
           return await this.Databases.updateDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
            {
                title,content,featuredImage,status,
            }
           )
        } catch (error) {
            console.log("Appwrite Service :: updatePost :: error" ,error)
        }
    }

    async deletePost(slug){
        try {
         await this.Databases.deleteDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug
         )
         return true
        } catch (error) {
            console.log("Appwrite Service :: deletePost :: error" ,error )
            return false
        }
    }

    async getPost(slug){
        try {
          return await this.Databases.getDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug
          )  
        } catch (error) {
           console.log("Appwrite Service :: getPost :: error" ,error)
           return false
        }
    }

    async getPosts(queries = [
        Query.equal("Status","active")
    ]){
try {
    return await this.Databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries,
    )
} catch (error) {
    console.log("Appwrite Service :: getPosts :: error" ,error)
    return false
}
    }

    // file upload services
    async uploadFile(file){
        try {
           return await this.bucket.createFile(
            conf.appwriteBucketId,
            ID.unique(),
            file,
           ) 
        } catch (error) {
            console.log("Appwrite Service :: uploadFile :: error")
           return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId,
            )
            return true
        } catch (error) {
            console.log("Appwrite Service :: deleteFile :: error" ,error)
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
export default Service
import conf from "../conf/conf";
import { Client, Databases , ID , Storage} from "appwrite";

export class ProfileService {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);


        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }


    // CREATE 
    async createProfile(  { name, profileimage, savedposts, bio , userid }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteProfileCollectionId,
                userid,
                {
                   
                    name,
                    userid,
                    profileimage,
                    savedposts,
                    bio,
                }
            );
        } catch (error) {
            console.error("Appwrite service :: createProfile :: error", error);
            return null;
        }
    }

    //READ
    async getProfile(userid){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteProfileCollectionId,
                userid
            
            )
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false
        }
    }

    //UPDATE
    async updateProfile( userid ,{ name, profileimage, bio }){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                userid,
                {
                    
                    name, 
                    profileimage,
                    bio,
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error);
        }
    }

    //DELETE ( NO NEED FOR DELETING YOUR PROFILE THEREFORE NO DELETE FUNCTIONALITY )


    // Profile Image Handling using Bucket 
    async uploadImage(file){
        try {
            return await this.bucket.createFile(
                conf.appwritepfpBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }

    async deleteImage(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwritepfpBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    getImagePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }

}

const userService = new ProfileService();
export default userService;

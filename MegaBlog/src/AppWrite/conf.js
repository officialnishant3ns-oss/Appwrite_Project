import config from "../config/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";


export class Service {
    client = new Client()
    databases
    bucket

    constructor() {
        this.client
            .setEndpoint(config.appWriteUrl)
            .setProject(config.appWriteProjectID)

        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }
    async createPost({ title, slug, content, featuredImage, status, userID }) {
        try {
            return await this.databases.createDocument(
                config.appWriteDatabaseID,
                config.appWriteCollectionID,
                slug,
                { title, content, featuredImage, status, userID }
            )
        } catch (error) {
            throw error
        }
    }
    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                config.appWriteDatabaseID,
                config.appWriteCollectionID,
                slug,
                { title, content, featuredImage, status }
            )
        } catch (error) {
            throw error
        }
    }
    async deletePost(slug) {
        try {
            await this.databases.updateDocument(
                config.appWriteDatabaseID,
                config.appWriteCollectionID,
                slug,
            )
            return true
        } catch (error) {
            console.log("message error::", error)
            return false
        }
    }
    async singlePost(slug) {
        try {
            return await this.databases.getDocument(
                config.appWriteDatabaseID,
                config.appWriteCollectionID,
                slug,

            )
        } catch (error) {
            throw error
        }
    }
    async getPosts(queries = [Query.equal('status', 'active')]) {
        try {
            return await this.databases.listDocuments(
                config.appWriteDatabaseID,
                config.appWriteCollectionID,
                queries,
            )
        } catch (error) {
            console.log('message', error)
            return false
        }
    }

    //file upload code there
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                config.appWriteBucketID,
                ID.unique(),
                file
            )

        } catch (error) {
            console.log("message error appwrite service::", error)
            return false
        }
    }
    async deleteFile(fileID) {
        try {
            return await this.bucket.deleteFile(
                config.appWriteBucketID,
                fileID
            )
            return true
        } catch (error) {
            console.log("message error appwrite service::", error)
            return false
        }
    }
    GetFilePreview(fileID) {
        return this.bucket.getFilePreview(
            config.appWriteBucketID,
            file
        )
    }

}




const service = new Service()
export default Service
import 'dotenv/config'
import { ObjectId } from 'mongodb'
import connectDb from '../config/dbConfig.js'


const connect = await connectDb(process.env.URI)

export const getPosts = async () => {
    const db = connect.db('imersao-databytes')
    const collection = db.collection('posts')
    return collection.find().toArray()
}


export const createPost = async (new_post) => {
    const db = connect.db('imersao-databytes')
    const collection = db.collection('posts')
    return collection.insertOne(new_post)
}


export const updatePost = async (id, post) => {
    const db = connect.db('imersao-databytes')
    const collection = db.collection('posts')
    const objectId = ObjectId.createFromHexString(id)
    return collection.updateOne({_id: new ObjectId(objectId)}, {$set: post})
}

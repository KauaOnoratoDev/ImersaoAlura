import fs from 'fs'

import gerarDescricaoComGemini from '../services/geminiServices.js'
import { getPosts, createPost, updatePost } from '../models/postsModel.js'



export const listPosts = async (req, res) => {
    const posts = await getPosts()
    res.status(200).json(posts)
}


export const addNewPost = async (req, res) => {
    const new_post = req.body
    try {
        const created_post = await createPost(new_post)
        res.status(200).json(created_post)
    } catch(error) {
        console.error(error.message)
        res.status(500).json({'Error': 'Falha na requisição'})
    }
}


export const imageUpload = async (req, res) => {
    const new_post = {
        descricao: '',
        imgUrl: req.file.originalname,
        alt: ''
    }
    
    try {
        const created_post = await createPost(new_post)
        const updated_image = `uploads/${created_post.insertedId}.png`
        fs.renameSync(req.file.path, updated_image)
        res.status(200).json(created_post)
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ 'Error': 'Falha na requisição' })
    }
}


export const updateNewPost = async (req, res) => {
    const id = req.params.id
    const imageUrl = `http://localhost:3000/${id}.png`
    try {
        const imageBuffer = fs.readFileSync(`uploads/${id}.png`)
        const description = await gerarDescricaoComGemini(imageBuffer)
        const post = {
            imgUrl: imageUrl,
            description: description,
            alt: req.body.alt
        }
        const created_post = await updatePost(id, post)
        res.status(200).json(created_post)
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ 'Error': 'Falha na requisição' })
    }
}

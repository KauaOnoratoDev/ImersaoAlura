import express from 'express'
import multer from 'multer'
import cors from 'cors'

import {
    listPosts, 
    addNewPost, 
    imageUpload, 
    updateNewPost} from '../controllers/postControllers.js'

const cors_options = {
    origin: 'http://localhost:8000',
    optionsSuccessStatus: 200
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({
    dest: './uploads',
    storage
})

const routes = (app) => {
    app.use(express.json())
    app.use(cors(cors_options))
    app.get('/posts', listPosts)
    app.post('/posts', addNewPost)
    app.post('/upload', upload.single('image'), imageUpload)
    app.put('/upload/:id', updateNewPost)
}

export default routes

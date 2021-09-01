const router = require('express').Router()
const postController = require('../controllers/post-controller')

router.post('/createPost', postController.createPost)
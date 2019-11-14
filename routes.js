const express = require('express')
const router = express.Router()

const controller = require('./controller')

router.post('/login', controller.login)

router.post('/register', controller.createUser)

router.post('/feed', controller.getFeed)

router.post('/post/:id', controller.getPostInfo)

router.post('/getuserbookmarks/:id', controller.getUserBookmarks)

router.post('/addbookmark/:id', controller.addBookmark)

router.delete('/removebookmark', controller.removeBookmark)

module.exports = router
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const LikedMovies = require('../models/LikedMovies')
const catchErr = require('../middleware/serverError')


router.get('/', async (req, res) => {
	try {
		const favoriteMovies = await LikedMovies.find()
		return res.send({
            success: true,
            data: favoriteMovies
        })
    }catch(err){
        catchErr(err, res, 'Failed to look up favorite movies')
    }
})

router.get('/user', async (req, res) => {
	const token = req.headers["x-access-token"]
    console.log(token, "---------")
	try {
		const decoded = jwt.verify(token, process.env.TOKEN_GENERATOR)
		const id = decoded._id
        console.log(id, "id")
		const favoriteMovies = await LikedMovies.find({username: id })
		return res.send({
            success: true,
            data: favoriteMovies
        })
    }catch(err){
        catchErr(err, res, 'Failed to look up favorite movies')
    }
})

router.post('/', async (req, res) => {
    const token = req.headers['x-access-token']
    console.log(token, "token")
	try {
        const decoded = jwt.verify(token, process.env.TOKEN_GENERATOR)
		const id = decoded._id
        console.log(id, "id")
        req.body.user = id
        console.log(req.body, 'body')
        const newFavoriteMovie = await LikedMovies.create(req.body)
		return res.send({
            success: true,
            data: newFavoriteMovie
        })
    }catch(err){
        catchErr(err, res, 'Failed to create movie')
    }
})


module.exports = router;
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const LikedMovies = require('../models/LikedMovies')
const catchErr = require('../middleware/serverError')


router.get('/', async (req, res) => {
	try {
		const favoriteMovies = await LikedMovies.find()
		res.send({
            success: true,
            data: favoriteMovies
        })
    }catch(err){
        catchErr(err, res, 'Failed to look up favorite movies')
    }
})

router.get('/user', async (req, res) => {
	const token = req.headers['x-access-token']
	try {
		const decoded = jwt.verify(token, 'secret123')
		const id = decoded._id
		const favoriteMovies = await LikedMovies.find({username: id })
		res.send({
            success: true,
            data: favoriteMovies
        })
    }catch(err){
        catchErr(err, res, 'Failed to look up favorite movies')
    }
})

router.post('/', async (req, res) => {
    const token = req.headers['x-access-token']
	try {
        const decoded = jwt.verify(token, 'secret123')
		const id = decoded._id
        req.body.user = id
        const newFavoriteMovie = await LikedMovies.create(req.body)
		res.send({
            success: true,
            data: newFavoriteMovie
        })
    }catch(err){
        catchErr(err, res, 'Failed to create movie')
    }
})


module.exports = router;
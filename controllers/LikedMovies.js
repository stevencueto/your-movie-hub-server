const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const PlayList = require('../models/PlayLists')
const catchErr = require('../middleware/serverError')


router.get('/', async (req, res) => {
	try {
		const playList = await PlayList.find()
		return res.send({
            success: true,
            data: playList
        })
    }catch(err){
        return catchErr(err, res, 'Failed to look up playlist')
    }
})


router.get('/user', async (req, res) => {
	const token = req.headers["x-access-token"]
	try {
		const decoded = jwt.verify(token, process.env.TOKEN_GENERATOR)
		const id = decoded._id
		const playList = await PlayList.find({username: id })
		return res.send({
            success: true,
            data: playList
        })
    }catch(err){
        return catchErr(err, res, 'Failed to look up playlist')
    }
})

router.post('/', async (req, res) => {
    const token = req.headers['x-access-token']
	try {
        const decoded = jwt.verify(token, process.env.TOKEN_GENERATOR)
		const id = decoded._id
        req.body.user = id
        console.log(req.body, 'body')
        const newPlaylist = await PlayList.create(req.body)
		return res.send({
            success: true,
            data: newPlaylist
        })
    }catch(err){
        return catchErr(err, res, 'Failed to make new playlist')
    }
})

router.put('/', async (req, res) => {
    const token = req.headers['x-access-token']
	try {
        const decoded = jwt.verify(token, process.env.TOKEN_GENERATOR)
		const id = decoded._id
        req.body.user = id
        const newPlaylist = await PlayList.findById(req.body._id)
        if(newPlaylist.user === id){
            const updatedPlaylist = await PlayList.findByIdAndUpdate(newPlaylist._id, req.body, {new:true})
            return res.send({
                success: true,
                data: updatedPlaylist
            })
        }
        return catchErr(null, res, `You can modify that playlist`)
    }catch(err){
        return catchErr(err, res, 'Failed to make new playlist')
    }
})

router.put('/add', async (req, res) => {
    const token = req.headers['x-access-token']
    const addMovie = req.body.movie;
	try {
        const decoded = jwt.verify(token, process.env.TOKEN_GENERATOR)
		const id = decoded._id
        req.body.user = id
        const newPlaylist = await PlayList.findById(req.body._id)
        if(newPlaylist.user === id){
            const updatedPlaylist = await PlayList.findByIdAndUpdate(
                {
                    _id :newPlaylist._id
                },{
                    $push: {
                        movie: addMovie
                    }
                }, {
                    new:true
                }
            )
            return res.send({
                success: true,
                data: updatedPlaylist
            })
        }
        return catchErr(null, res, `You can modify that playlist`)
    }catch(err){
        return catchErr(err, res, 'Failed to make new playlist')
    }
})
router.delete('/remove', async (req, res) => {
    const token = req.headers['x-access-token']
    const removeMovie = req.body.movie;
	try {
        const decoded = jwt.verify(token, process.env.TOKEN_GENERATOR)
		const id = decoded._id
        req.body.user = id
        const newPlaylist = await PlayList.findById(req.body._id)
        if(newPlaylist.user === id){
            const updatedPlaylist = await PlayList.findByIdAndUpdate(
                {_id: newPlaylist._id},
                {
                    $pull: {
                        movie: 
                               removeMovie
                        }
                },{
                    new:true
                }
            )
            return res.send({
                success: true,
                data: updatedPlaylist
            })
        }
        return catchErr(null, res, `You can modify that playlist`)
    }catch(err){
        return catchErr(err, res, 'Failed to make new playlist')
    }
})

router.delete('/delete', async (req, res) => {
    const token = req.headers['x-access-token']
	try {
        const decoded = jwt.verify(token, process.env.TOKEN_GENERATOR)
		const id = decoded._id
        req.body.user = id
        const newPlaylist = await PlayList.findById(req.body._id)
        if(newPlaylist.user === id){
            const updatedPlaylist = await PlayList.findByIdAndDelete(newPlaylist._id)
            return res.send({
                success: true,
                data: updatedPlaylist
            })
        }else{
            return catchErr(null, res, `You can modify that playlist`)
        }
    }catch(err){
        return catchErr(err, res, 'Failed delete playlist')
    }
})


module.exports = router;
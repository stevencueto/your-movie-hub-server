const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Playlist = require('../models/PlayLists')
const catchErr = require('../middleware/serverError')


router.get('/', async (req, res) => {
	try {
		const playlist = await Playlist.find()
		return res.send({
            success: true,
            data: playlist
        })
    }catch(err){
        return catchErr(err, res, 'Failed to look up playlist')
    }
})

router.get('/find/:id', async (req, res) => {
    const token = req.headers['x-access-token']
    const decoded = jwt.verify(token, process.env.TOKEN_GENERATOR)
	try {
		const playlist = await Playlist.findById(req.params.id).populate("user", ["username"])
		return res.send({
            success: true,
            data: playlist
        })
    }catch(err){
        return catchErr(err, res, 'Failed to look up playlist')
    }
})



router.get('/user', async (req, res) => {
    const token = req.headers['x-access-token']
    const decoded = jwt.verify(token, process.env.TOKEN_GENERATOR)
	const id = decoded._id
	try {
		const playlist = await Playlist.find({user: id })
		return res.send({
            success: true,
            data: playlist
        })
    }catch(err){
        return catchErr(err, res, 'Failed to look up playlist')
    }
})

router.get('/user/:id', async (req, res) => {
    const token = req.headers['x-access-token']
    const decoded = jwt.verify(token, process.env.TOKEN_GENERATOR)
	try {
		const playlist = await User.findById(req.params.id).populate("playlist")
        const user = { username: playlist.username, playlist: playlist.playlist}
		return res.send({
            success: true,
            data: user
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
        const user = await User.findById(id)
        req.body.user = user._id
        const newPlaylist = await Playlist.create(req.body)
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
    const decoded = jwt.verify(token, process.env.TOKEN_GENERATOR)
    	try {
            const updatedPlaylist = await Playlist.findByIdAndUpdate(req.body._id, req.body, {new:true})
            return res.send({
                success: true,
                data: updatedPlaylist
            })
    }catch(err){
        return catchErr(err, res, 'Failed to make edit')
    }
})

router.put('/add/:id', async (req, res) => {
    const addMovie = req.body;
	try {
        const token = req.headers['x-access-token']
        const decoded = jwt.verify(token, process.env.TOKEN_GENERATOR)
        const findMovie = await Playlist.findById(req.params.id)  
        const otherMvoie = () =>{
            if(findMovie.movie.length === 0) return false
            let posMovie = false
            for(const movie of findMovie.movie){
                if(movie.id === addMovie.id) return posMovie = true
            }
            return posMovie
        }
        if(otherMvoie()) return catchErr(addMovie, res, "Movie Alredy in dbs")
            const updatedPlaylist = await Playlist.findByIdAndUpdate(
                {
                    _id :req.params.id
                },{
                    $push: {
                        movie: addMovie
                    }
                }, {
                    new:true
                }
            )
            console.log(updatedPlaylist)
            return res.send({
                success: true,
                data: updatedPlaylist
            })
    }catch(err){
        return catchErr(err, res, 'Server Error')
    }
})
router.delete('/remove/:id', async (req, res) => {
    const token = req.headers['x-access-token']
    const removeMovie = req.body;
	try {
        const decoded = jwt.verify(token, process.env.TOKEN_GENERATOR)
        if(decoded){
            const updatedPlaylist = await Playlist.findByIdAndUpdate(
                {_id: req.params.id},
                {
                    $pull: {
                        movie: removeMovie
                    }
                },{
                    new:true
                }
            )
            return res.send({
                success: true,
                data: updatedPlaylist
            })
        }else{
            return catchErr(null, res, `You can modify that playlist`)
        }
    }catch(err){
        return catchErr(err, res, 'Failed to make new playlist')
    }
})

router.delete('/delete/:id', async (req, res) => {
    const token = req.headers['x-access-token']
    const decoded = jwt.verify(token, process.env.TOKEN_GENERATOR)
	try {
            const updatedPlaylist = await Playlist.findByIdAndDelete(req.params.id)
            return res.send({
                success: true,
                data: updatedPlaylist})
    }catch(err){
        return catchErr(err, res, 'Failed delete playlist')
    }
})





module.exports = router;
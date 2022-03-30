const express = require('express')
const router = express.Router()
const key = process.env.API_KEY
const catchErr = require('../middleware/serverError')
const APILink = 'https://api.themoviedb.org/3/'
const superagent = require('superagent');


router.post('/trending', async (req, res)=>{
    const page = req.body.page;
        try {
          const apiResquest = await superagent.get(`${APILink}movie/popular?api_key=${key}&language=en-US`);
          const apiResponse =  apiResquest.text
          const toJson =  JSON.parse(apiResponse)
          console.log(toJson)
        return res.send({
            success: true,
            data: toJson,
            totalPages: toJson.total_pages
        })
        } catch (err) {
           return catchErr(err, res, err.message)
        }
})
router.post('/search', async (req, res)=>{
    const search = req.body.term;
    const page = req.body.page;
    console.log(req.body)
    if(!search) return  catchErr(search, res, "server err")
    try {
      const apiResquest = await superagent.get(`${APILink}search/movie?api_key=${key}&language=en-US&query=${search}&page=${page}&include_adult=false`);
      const apiResponse =  apiResquest.text
      const toJson =  JSON.parse(apiResponse)
      console.log(toJson)
        return res.send({
        success: true,
        data: toJson,
        totalPages: toJson.total_pages,
    })
    } catch (err) {
       return catchErr(err, res, "server err")
    }
})

router.get('/top-rated/:page', async (req, res)=>{
    const page = 1 || req.params.page;
    try {
      const apiResquest = await superagent.get(`${APILink}movie/top_rated?api_key=${key}&language=en-US&page=${page}`);
      const apiResponse =  apiResquest.text
      const toJson =  JSON.parse(apiResponse)
    return res.send({
        success: true,
        data: toJson,
        totalPages: toJson.total_pages
    })
    } catch (err) {
       return catchErr(err, res, err.message)
    }
})

router.get('/movie/:id', async(req, res)=>{
    const id = req.params.id;
    try {
        const apiResquest = await superagent.get(`${APILink}movie/${id}?api_key=${key}`);
        const apiResponse =  apiResquest.text
        const toJson =  JSON.parse(apiResponse)
      return res.send({
          success: true,
          data: toJson,
      })
      } catch (err) {
         return catchErr(err, res, "Server Error")
      }
  })

router.get('/credits/:id', async(req, res) =>{
    const id = req.params.id;
    try {
        const apiResquest = await superagent.get(`${APILink}movie/${id}/credits?api_key=${key}`);
        const apiResponse =  apiResquest.text
        const toJson =  JSON.parse(apiResponse)
      return res.send({
          success: true,
          data: toJson,
      })
      } catch (err) {
         return catchErr(err, res, "Server Error")
    }
})
module.exports =router;
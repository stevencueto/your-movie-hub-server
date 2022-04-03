const { text } = require('express');
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    name: {
      type: String,
    },
    title: {
        type: String,
      },
    poster_path: {
      type: String,
    },
    overview: {
        type: String,
    },runtime: {
      type: Number,
    },watched:{
      type: Boolean,
      default: false
    },
    id: {
      type: Number,
    },
  });

const paylistSchema = new Schema({
    name: {
        type: String
    },
    movie: [movieSchema,{sparse:true}],
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    description: {
        type: String
    }
})


const Playlist = mongoose.model('Playlist', paylistSchema)
module.exports = Playlist;
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
    },
    id: {
      type: Number,
      unique: true
    },
  });

const payListSchema = new Schema({
    name: {
        type: String
    },
    movie: [[movieSchema]],
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    description: {
        type: String
    }
})


const PlayList = mongoose.model('PlayList', payListSchema)
module.exports = PlayList;
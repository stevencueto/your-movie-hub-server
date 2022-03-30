const { text } = require('express');
const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const payListSchema = new Schema({
    name: {
        type: String
    },
    movie:[
            {
                type: Object,
                unique: true
            }
    ],
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
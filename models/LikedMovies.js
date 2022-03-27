const mongoose = require('mongoose')
const Schema = mongoose.Schema



const likedMoviesSchema = new Schema({
        title: {
            type: String,
            required: true,
        },
        releaseDate: {
            type: String,
            required: true,
        },
        summary: {
            type: String,
            required: true,
        },
        image: 
            {
                type: String
            },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    }
)

const LikedMovies = mongoose.model('LikedMovies', likedMoviesSchema);

module.exports = LikedMovies;
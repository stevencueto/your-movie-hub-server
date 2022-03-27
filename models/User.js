const mongoose = require('mongoose')
const Schema = mongoose.Schema



const userSchema = new Schema({
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
        favoriteMovies:[ 
            {
            type: Schema.Types.ObjectId,
            ref: 'LikedMovies',
            }
        ],
        playlist: [
            {
                type: String
            }
        ]
    }
)

const User = mongoose.model('User', userSchema);

module.exports = User;
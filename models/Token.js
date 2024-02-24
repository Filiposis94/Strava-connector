const mongoose = require('mongoose')

const TokenSchema = new mongoose.Schema({
    athleteId:{
        type:Number,
        required:[true, 'Please provide athlete ID'],
        unique:true
    },
    accessToken:{
        type:String,
        required:[true, 'Please provide access token']
    },
    refreshToken:{
        type:String,
        required:[true, 'Please provide refresh token']
    },
    expiresAt:{
        type:Number,
        required:[true, 'Please provide expiration']
    }
})

module.exports = mongoose.model('Token', TokenSchema)
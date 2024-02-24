const Token = require('../models/Token');
const axios = require('axios')
const {NotFoundError} = require('../errors')

const refreshTokenMiddleware = async(req, res, next)=>{
    const athleteId = req.params.id
    
    const tokenDB = await Token.findOne({athleteId})
    if(!tokenDB){
        throw new NotFoundError(`No athlete with id ${athleteId}`)
    }
    const currentDateEpoch = Math.floor(new Date().getTime()/1000)
    if(currentDateEpoch > tokenDB.expiresAt){
        const tokenUrl = `https://www.strava.com/oauth/token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&grant_type=refresh_token&refresh_token=${tokenDB.refreshToken}`
        // Refreshing on Strava API
        const {data} = await axios.post(tokenUrl)
        console.log(data);

        const tokenObject = {
            accessToken: data.access_token,
            refreshToken: data.refresh_token,
            expiresAt: data.expires_at
        }
        const updatedToken = await Token.findOneAndUpdate({athleteId},tokenObject)
    }
    next()
}


module.exports = refreshTokenMiddleware
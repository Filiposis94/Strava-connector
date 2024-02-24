const axios = require('axios')
const Token = require('../models/Token')

// Strava setting for authenticaiton of user
const redirectUri = 'https://www.szymanik.cz/strava.html';
const responseType = 'code';
const approvalPrompt = 'force';
const scope = 'activity:read';
const authUrl = `https://www.strava.com/oauth/authorize?client_id=${process.env.CLIENT_ID}&response_type=${responseType}&redirect_uri=${redirectUri}&approval_prompt=${approvalPrompt}&scope=${scope}`

// Sending auth url to FE
const getAuthUrl = (req,res)=>{
    res.status(200).json({authUrl})
}

// Exchanging authorization token from FE for access and refresh tokens and saving to DB
const exchangeToken = async(req,res)=>{
    const {authorizationCode} = req.body
    const tokenUrl = `https://www.strava.com/oauth/token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${authorizationCode}&grant_type=authorization_code`
    
    // Exchanging on Strava API
    const {data} = await axios.post(tokenUrl)
    console.log(data);

    const tokenObject = {
        athleteId: data.athlete.id,
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        expiresAt: data.expires_at
    }
    // CHECK IF ATHLETE IS IN DATBASE then just patch the other values
    const tokenDB = await Token.findOne({athleteId:tokenObject.athleteId})
    if(!tokenDB){
        const newToken = await Token.create(tokenObject)
        res.status(201).json({msg:`authorization completed for ${newToken.athleteId}`})
    } else {
        const updatedToken = await Token.findOneAndUpdate({athleteId:tokenObject.athleteId},tokenObject)
        res.status(201).json({msg:`authorization completed for ${updatedToken.athleteId}`})
    }
}


module.exports = {
    getAuthUrl,
    exchangeToken
}

const axios = require('axios');
const Token = require('../models/Token');


const getActivities = async(req, res)=>{
    const athleteId = req.params.id;
    const tokenDB = await Token.findOne({athleteId});
    // Make it dynamic from FE with queries later if needed
    const currentDateEpoch = Math.floor(new Date().getTime()/1000);
    const dateObject = new Date()
    const last30DateEpoch = Math.floor(dateObject.setDate(dateObject.getDate()-30)/1000)
    // console.log(last30DateEpoch);
 
    const activityUrl = `https://www.strava.com/api/v3/athlete/activities?before=${currentDateEpoch}&after=${last30DateEpoch}&page=1&per_page=5`

    const {data} = await axios.get(activityUrl,{
        headers:{'Authorization':'Bearer ' + tokenDB.accessToken}
    })

res.status(200).json({data})


}


module.exports = getActivities

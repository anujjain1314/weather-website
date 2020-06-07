const request = require('postman-request')

const geocode = (adress,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ adress + '.json?limit=1&access_token=pk.eyJ1IjoiYW51amphaW4xMzE0IiwiYSI6ImNrYjF5eXA2cTBjMGwyenBqYm1xOGFkcDcifQ.ZNBi7pNE4wuRro3wqGEaMA'

    request({url,json:true}, (error, response, body) => {
        if(error){
            callback('Unable to connect with location provider.',undefined)
        }else if(body.features.length===0){
            callback('No result found with current address',undefined)
        }else{
            callback(undefined,{
                longitude : body.features[0].center[0],
                latitude : body.features[0].center[1],
                location : body.features[0].place_name
            })
        }
        
    })
}

module.exports = geocode
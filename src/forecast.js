const request = require('postman-request')

const forecast = (latitide,longitude,callback) => {
    
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat='+latitide+'&lon='+longitude+'&appid=0dd79c8e30cae35a38de020408d51215&units=metric'
    
    request({ url:url, json:true }, (error, response, body) => {
        if(error){
            callback('Unable to connect with weather provider.',undefined)
        }else if(!body.main){
            callback('Invalid longitude or latitude property',undefined)
        }else{
            callback(undefined,{
                forecast: 'The current temperatue is '+ body.main.temp + ' and it feels like '+ body.main.feels_like +'.\nHumidiy: ' + body.main.humidity +'%'
            })
        }
        
    });
}


module.exports = forecast
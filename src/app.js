const express = require('express')
const path = require('path');
const hbs = require('hbs')
const geocode = require('./geocode')
const forecast = require('./forecast')

const app = express()
const port = process.env.PORT || 3000

// define paths for express config
const publicPathDir = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebar engine and views location
app.set('view engine', 'hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)


//setup static directory 
app.use(express.static(publicPathDir))


app.get('', (req, res) => {
    res.render('index',{
        title:'Weather App',
        name:'Anuj Jain'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title:'About me',
        name:'Anuj Jain'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title:'Help',
        name:'Anuj Jain',
        helpText:'This is help text'
    })
})


app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error:'Please provide the address'
        })
    }

    const address = req.query.address

    geocode(address, (error , {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error , weatherData) => {
            if(error){
                return res.send({
                    error
                })
            }
            return res.send({
                location,
                weatherData,
                address
            })
        })

    })
})

app.get('*', (req, res) => {
    res.render('error',{
        title:'404',
        name:'Anuj Jain',
        errorMessage : 'The page you are looking for is not available'
    })
})

app.listen(port,() => {
    console.log(`Example app listening at port :${port}`)
})
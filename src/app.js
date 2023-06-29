const express = require('express')
const path = require('path')
const hbs = require('hbs')


const app = express()
const port = process.env.PORT || 3000

// Define path for Express config
const staticDir = path.join(__dirname, '..', 'public')
const viewsPath = path.join(__dirname, '..', 'templates', 'views')
const partialsPath = path.join(__dirname, '..', 'templates', 'partials')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(staticDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Perry'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Perry'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Me',
        notice: '大家都要互相幫助',
        name: 'Perry'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide address term'
        })
    }
    geocode(req.query.address, (error, { latitude, longtitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(longtitude, latitude, (error, forecast_result) => {
            if (error) {
                return res.send({ error });
            }
            res.send({
                forecast: forecast_result,
                location: location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Help article not found',
        name: 'Perry'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Page not found',
        name: 'Perry'
    })
})
app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})
const request = require('request')
const forecast = (longtitude, latitude, callback) => {
    const weather_url = `http://api.weatherstack.com/current?access_key=e55cb8bafc3a5c57cae7888dfbb7d0d4&query=${latitude},${longtitude}`
    request({'url': weather_url, json:true}, (error, response) => {
        if (error) {
            if (error.body && error.body.info) {
                callback(error.body.info, undefined)
                return
            }
            callback('Unalbe to connect to weather service!', undefined)
            return;
        }
        const data = response.body
        const forecast = data.current.weather_descriptions[0]
        if (data.current == undefined) {
            callback('Unalble to search place, Please Try another place.')
            return;
        }
        callback(undefined, forecast)
    })
}

module.exports = forecast

const request = require('request')
const geocode = (address, callback) => {
    const geo_url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZWFzeXBpbmV4IiwiYSI6ImNsaWNzN2lpdjBnNnYzaHF2bGNrdGhseTIifQ.ldFtXeV-Qm2vEq6kCG3kAw`
    request({ url: geo_url, json: true }, (error, response) => {
        if (error) {
            callback('Unalbe to connect to weather service!', undefined)
            return
        }
        if (response.body.features.length == 0) {
            callback('Unable to find location. Try another search!', undefined)
            return
        }
        const data = response.body
        callback(undefined, {
            latitude: data.features[0].center[1],
            longtitude: data.features[0].center[0],
            location: data.features[0].place_name
        })
    })
}

module.exports = geocode
console.log('Client side javascript file is loaded!')

fetch('https://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    message1.textContent = 'Loading ...'
    const address = search.value
    if (!address)  {
        message1.textContent = 'You must give search value';
        return
    }
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZWFzeXBpbmV4IiwiYSI6ImNsaWNzN2lpdjBnNnYzaHF2bGNrdGhseTIifQ.ldFtXeV-Qm2vEq6kCG3kAw`).then(
    (response) => {
        response.json().then(data => {
            console.log('mapbox', data)
            if (data.error) {
                message1.textContent = data.error;
                return console.log(data.error)
            }
            if (data.features.length == 0) {
                message1.textContent = "Unable to find location. Try another seatch.";
                return
            }
            const location = data.features[0].place_name
            const latitude = data.features[0].center[1];
            const longtitude = data.features[0].center[0];
            const weather_url = `http://api.weatherstack.com/current?access_key=e55cb8bafc3a5c57cae7888dfbb7d0d4&query=${latitude},${longtitude}`
            fetch(weather_url).then((response) => {
                response.json().then(data => {
                    console.log('weatherstack', data)
                    if (data.error) {
                        message1.textContent = data.error.info;
                        return console.log(data.error.info)
                    }
                    const forecast = data.current.weather_descriptions[0]
                    message1.textContent = location
                    message2.textContent = forecast
                })
            })
        })
    }
)
})
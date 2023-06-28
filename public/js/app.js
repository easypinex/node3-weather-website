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
    message2.textContent = ''
    const address = search.value
    if (!address)  {
        message1.textContent = 'You must give search value';
        return
    }
    fetch(`/weather?address=${encodeURIComponent(address)}`).then(
    (response) => {
        response.json().then(data => {
            console.log('data', data)
            if (data.error) {
                message1.textContent = data.error;
                return console.log(data.error)
            }
            message1.textContent = data.location
            message2.textContent = data.forecast
        })
    }
)
})
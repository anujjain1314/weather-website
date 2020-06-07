console.log('Client side javascript file is here.')

const locationForm = document.querySelector('form')
const input = document.querySelector('input')

const mssz1 = document.querySelector('#mssz-1')
const mssz2 = document.querySelector('#mssz-2')


locationForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    
    mssz1.textContent = 'Loading....'
    mssz2.textContent = ''
    
    const location = input.value
    fetch('http://localhost:3000/weather?address='+location).then((response) =>{
        response.json().then((data) => {
            if (data.error){
                mssz1.textContent = data.error
            } else {
                mssz1.textContent = data.location 
                mssz2.textContent = data.weatherData.forecast
            }
        })
    })
})

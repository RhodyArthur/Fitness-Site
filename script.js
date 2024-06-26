// import { userData } from "./data"
// console.log(userData)

const dateEl = document.querySelector('.date') 
const weightCard = document.getElementById('weight')
const numCalories = document.getElementById('num-of-cal')
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const heightEl = document.getElementById('form-height')
const weightEl = document.getElementById('form-weight')
const formModal = document.querySelector('.form-modal')
const bmiBtn = document.querySelector('.bmi-btn')
const avatar = document.querySelector('.avatar')


// let counter = 0
// setInterval(()=>{
//     counter += 1;
//     numCalories.innerText = counter + "%"
// },20)



// get date of the day
const getDate = (days, months) => {
    const currentDate = new Date()
    const day = days[currentDate.getDay()]
    const month = months[currentDate.getMonth()]
    return `${day},  ${currentDate.getDate()} ${month}`
}

dateEl.innerHTML = getDate(daysOfWeek, monthNames)

// weightCard.addEventListener('click', ()=>{
//     formModal.classList.remove('hidden')
// })

// bmi calculation
bmiBtn.addEventListener('click', function(e){
    e.preventDefault()
    const height = heightEl.value
    const weight = weightEl.value
    const bmi = (weight / (height * height)).toFixed(2)
    console.log(bmi)
})
// close modal
document.querySelector('.modal-close-btn').addEventListener('click', function(){
    formModal.classList.add('hidden')

})
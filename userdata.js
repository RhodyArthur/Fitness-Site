// user details 
const fullnameEl = document.getElementById('fullname')
const ageEl = document.getElementById('age')
const weightEl = document.getElementById('data-weight')
const heightEL = document.getElementById('data-height')
const radioEl = document.querySelectorAll('input[name="gender"]')
const submitBtn = document.getElementById('submit-btn')
const userDataContainer = document.querySelector('.userdata-container')
const username = document.querySelector('.username')

// main page
const mainContainer = document.querySelector('.main-container')
const avatar = document.querySelector('.avatar')
const displayModal = document.querySelector('.modal')
const userDetails = document.querySelector('#user-details')
const weightCard = document.getElementById('weight')
const weightValue = document.getElementById('weight-value')
// bmi
const formModal = document.querySelector('.form-modal')
const bmiModal = document.getElementById('bmi-data')
const bmiBtn = document.querySelector('.bmi-btn')


// date section
const dateEl = document.querySelector('.date') 
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']


const data = []
submitBtn.addEventListener('click', function(e){
    e.preventDefault()

    let selectedGender = '';
    radioEl.forEach(function(radio) {
        if (radio.checked) {
            selectedGender = radio.value;
        }
    });
    data.push({
        fullname: fullnameEl.value,
        age: ageEl.value,
        weight: weightEl.value,
        height: heightEL.value,
        gender: selectedGender
    })
    userDataContainer.classList.add('hidden')
    mainContainer.classList.remove('hidden')
    username.textContent = `Hi ${fullnameEl.value}`
    weightValue.textContent = `${weightEl.value}kg`
})

// display user details when avatar is clicked
avatar.addEventListener('click', function(){
    let user = data[0]
    displayUserDetails(user)
    displayModal.classList.remove('hidden')
    console.log('clicked')
})

weightCard.addEventListener('click', ()=>{
    let user = data[0]
    console.log('clicked')
    displayBmiData(user)
    displayModal.classList.remove('hidden')
})

// get date of the day
const getDate = (days, months) => {
    const currentDate = new Date()
    const day = days[currentDate.getDay()]
    const month = months[currentDate.getMonth()]
    return `${day},  ${currentDate.getDate()} ${month}`
}

dateEl.innerHTML = getDate(daysOfWeek, monthNames)

function displayUserDetails(user){
    userDetails.innerHTML = `
                <p><strong>Name:</strong> ${user.fullname}</p>
                <p><strong>Age:</strong> ${user.age}</p>
                <p><strong>Weight:</strong> ${user.weight} kg</p>
                <p><strong>Height:</strong> ${user.height} cm</p>
                <p><strong>Gender:</strong> ${user.gender}</p>
        `
}

function displayBmiData(user){
    formModal.innerHTML = `      <p>Weight: ${user.weight}</p>
                    <p>Height: ${user.height}</p>
                    <ul>
                        <li>Underweight: BMI < 18.5</li>
                        <li>Normal weight: BMI 18.5 - 24.9</li>
                        <li>Overweight: BMI 25 - 29.9</li>
                        <li>Underweight: BMI >= 30</li>
                    </ul>

                    <button type="submit" class="bmi-btn">Calculate BMI</button>`
}


// close modal
document.querySelector('.modal-close-btn').addEventListener('click', function(){
    displayModal.style.display = 'none'

})
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
const stepModal = document.querySelector('.step-modal')
const userDetails = document.querySelector('#user-details')
const weightCard = document.getElementById('weight')
const weightValue = document.getElementById('weight-value')

// step and calories 
const stepCard = document.getElementById('step')
const stepValue = document.getElementById('step-value')
const targetCal = document.getElementById('target')
const burnedCal = document.getElementById('burned')
const remainingCal = document.getElementById('remaining')
const dailyStepEl = document.getElementById('daily-steps')
const targetCalEl = document.getElementById('target-cal')
const calBtn = document.getElementById('cal-btn')

// bmi
const formModal = document.querySelector('.form-modal')
const bmiData = document.getElementById('bmi-data')
const bmiResult = document.querySelector('.bmi-result')
const bmiInfo = document.querySelector('.bmi-info')



// date section
const dateEl = document.querySelector('.date') 
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']


const data = []
submitBtn.addEventListener('click', function(e){
    e.preventDefault()

    // do not accept empty fields
    if (fullnameEl.value === '' || ageEl.value === '' || weightEl.value === ''|| heightEL.value === '' ){
        alert('input fields are required')
        return
    }

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
    weightValue.innerHTML = `${weightEl.value}<span class="unit-value">kg</span>`
})

// display user details when avatar is clicked
avatar.addEventListener('click', function(){
    let user = data[0]
    displayUserDetails(user)
    displayModal.classList.remove('hidden')
})

// displays bmi data when weight is clicked
weightCard.addEventListener('click', ()=>{
    let user = data[0]
    displayBmiData(user)
    formModal.classList.remove('hidden')
})

function calculateCal(){
    const dailySteps = dailyStepEl.value
    const targetCalories = targetCalEl.value

    if (dailySteps === '' || targetCalories === ''){
        alert('Enter the values')
        return
    }

    stepValue.innerHTML = `${dailySteps}<span class="unit-value">steps</span`
    targetCal.innerHTML = `${targetCalories} <span class="unit-value">Kcal</span>`


    burnedCal.textContent = `${Math.floor(dailySteps * 0.1)} Kcal`
    if ((dailySteps * 0.1) > targetCalories){
        remainingCal.textContent = 0
    }
    else {
        remainingCal.innerHTML = parseFloat(targetCalories) - parseFloat(dailySteps * 0.1)
    }
}

// display form when steps is clicked
stepCard.addEventListener('click', function(){
    stepModal.classList.remove('hidden')
})

calBtn.addEventListener('click', calculateCal)

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
    bmiData.innerHTML = `
                <h2>BMI Details</h2>
                    <p>Weight: ${user.weight} kg</p>
                    <p>Height: ${user.height} cm</p>
                    <button type="submit" class="bmi-btn">Display BMI</button>
                    <p class="bmi-result"></p>
                    <p class="bmi-info"></p>
                    `

    document.querySelector('.bmi-btn').addEventListener('click', function(){
        let user = data[0]
        const weight = user.weight
        const height = user.height / 100
        const bmi = (weight / (height * height)).toFixed(2)

        document.querySelector('.bmi-result').textContent = `Your BMI result is  ${bmi}`

        if (bmi < 18.5){
            document.querySelector('.bmi-info').textContent = 'Underweight: Your BMI is less than 18.5'
        }else if (bmi >= 18.5 && bmi <= 24.9){
            document.querySelector('.bmi-info').textContent = 'Normal weight: Your BMI is between 18.5 and 24.9'
        }
        else if (bmi >= 25 && bmi <= 29.9){
            document.querySelector('.bmi-info').textContent = 'Overweight: Your BMI is between 25 and 29.9'
        }
        else if (bmi >= 30){
            document.querySelector('.bmi-info').textContent = 'Obese: Your BMI is above 30'
        }
        else {
            document.querySelector('.bmi-info').textContent = 'Invalid value'
        }
    })
}


// close modal
document.getElementById('modal-close-btn').addEventListener('click', function(){
    displayModal.style.display = 'none'
})

document.getElementById('form-close-btn').addEventListener('click', function(){
    formModal.style.display = 'none'
})
document.getElementById('step-close-btn').addEventListener('click', function(){
    stepModal.style.display = 'none'
})


// let counter = 0
// setInterval(()=>{
//     counter += 1;
//     numCalories.innerText = counter + "%"
// },20)

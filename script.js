// user details 
const fullnameEl = document.getElementById('fullname')
const ageEl = document.getElementById('age')
const weightEl = document.getElementById('data-weight')
const heightEL = document.getElementById('data-height')
const radioEl = document.querySelectorAll('input[name="gender"]')
const submitBtn = document.getElementById('submit-btn')
const userDataContainer = document.querySelector('.userdata-container')
const username = document.querySelector('.username')
const audioEL = document.getElementById('audio')
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

// distance covered
const distanceCard = document.getElementById('distance')
const distanceValue = document.getElementById('distance-value')

// bmi
const formModal = document.querySelector('.form-modal')
const bmiData = document.getElementById('bmi-data')
const bmiResult = document.querySelector('.bmi-result')
const bmiInfo = document.querySelector('.bmi-info')

// timer
const startTimerBtn = document.getElementById('start-timer')
const pauseTimerBtn = document.getElementById('pause-timer');
    const resumeTimerBtn = document.getElementById('resume-timer');
    const stopTimerBtn = document.getElementById('stop-timer');

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
   

    if (isNaN(dailySteps) || isNaN(targetCalories) || dailySteps <= 0 || targetCalories <= 0) {
        alert('Please enter valid values for daily steps and target calories.');
        return;
    }

    stepValue.innerHTML = `${dailySteps}<span class="unit-value">steps</span`
    targetCal.innerHTML = `${targetCalories} <span class="unit-value">Kcal</span>`
    const burnedCalories = dailySteps * 0.1
    const distance = (dailySteps * 0.0003048).toFixed(2)
    distanceValue.innerHTML = `${distance} <span class="unit-value">Km</span>`

    burnedCal.textContent = `${Math.floor(burnedCalories)} Kcal`
    if ((dailySteps * 0.1) > targetCalories){
        remainingCal.textContent = 0
    }
    else {
        remainingCal.innerHTML = `${Math.round(parseFloat(targetCalories) - parseFloat(burnedCalories))} <span class="unit-value">Kcal</span>`
    }

    // Update progress bar
    const progressPercent = burnedCalories / targetCalories;
    if (burnedCalories > targetCalories){
        document.getElementById('num-of-cal').textContent = '100%';
    }else{
        document.getElementById('num-of-cal').textContent = `${Math.round(progressPercent)}%`;
    }
    // document.getElementById('progressInner').style.width = `${progressPercent}%`;
}

// display form when steps is clicked
stepCard.addEventListener('click', function(){
    stepModal.classList.remove('hidden')
})

calBtn.addEventListener('click', function(){
    calculateCal()
    dailyStepEl.value = ''
    targetCalEl.value = ''
    
}
)

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
    displayModal.classList.toggle('hidden')
})

document.getElementById('form-close-btn').addEventListener('click', function(){
    formModal.classList.toggle('hidden')
})
document.getElementById('step-close-btn').addEventListener('click', function(){
    stepModal.classList.toggle('hidden')
})

let interval;
let timeRemaining;
let isPaused = false;

startTimerBtn.addEventListener('click', function(){
    startTimer();
    this.disabled = true;
    pauseTimerBtn.disabled = false;
    stopTimerBtn.disabled = false;
});

pauseTimerBtn.addEventListener('click', function () {
    pauseTimer();
    this.disabled = true;
    resumeTimerBtn.disabled = false;
});

resumeTimerBtn.addEventListener('click', function () {
    resumeTimer();
    this.disabled = true;
    pauseTimerBtn.disabled = false;
});

stopTimerBtn.addEventListener('click', function () {
    stopTimer();
    startTimerBtn.disabled = false;
    pauseTimerBtn.disabled = true;
    resumeTimerBtn.disabled = true;
    this.disabled = true;
});

audioEL.addEventListener('ended', function() {
    // Restart audio when it ends
    if (!isPaused) {
        this.currentTime = 0;
        this.play();
    }
})

// timer function
function startTimer() {
    const workInterval = parseInt(document.getElementById('work-interval').value);
    timeRemaining = workInterval;

    // Play sound when the timer starts
    audioEL.currentTime = 0;
    audioEL.play();

    interval = setInterval(() => {
        if (timeRemaining > 0) {
            timeRemaining--;
            updateTimer(timeRemaining);
        } else {
            clearInterval(interval);
            // Stop sound when timer reaches 0
            audioEL.pause();
            audioEL.currentTime = 0;
            startTimerBtn.disabled = false;
            pauseTimerBtn.disabled = true;
            resumeTimerBtn.disabled = true;
            stopTimerBtn.disabled = true;
        }
    }, 1000);
}

function pauseTimer() {
    isPaused = true;
    clearInterval(interval);
    audioEL.pause();
}

function resumeTimer() {
    isPaused = false;
    audioEL.play();
    interval = setInterval(() => {
        if (timeRemaining > 0) {
            timeRemaining--;
            updateTimer(timeRemaining);
        } else {
            clearInterval(interval);
            // Stop sound when timer reaches 0
            audioEL.pause();
            audioEL.currentTime = 0;
            startTimerBtn.disabled = false;
            pauseTimerBtn.disabled = true;
            resumeTimerBtn.disabled = true;
            stopTimerBtn.disabled = true;
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(interval);
    timeRemaining = 0;
    updateTimer(timeRemaining);
    audioEL.pause();
    audioEL.currentTime = 0;
}

function updateTimer(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    document.getElementById('timer').textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// let counter = 0
// setInterval(()=>{
//     counter += 1;
//     numCalories.innerText = counter + "%"
// },20)

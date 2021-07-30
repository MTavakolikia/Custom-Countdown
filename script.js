const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');
const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownElBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

const completeEl = document.getElementById('complete');
const completeElInfo= document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');
//Set Date Input Min with Today's Date
const Today =new Date().toISOString().split('T')[0];

let countdownTitle = '';
let countdownDate = '';
let countdownValue= new Date();
let countdownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

dateEl.setAttribute('min',Today);
// Populate Countdown / Complete UI
function updateDom(){
countdownActive=setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownValue - now;

    const days = Math.floor(distance/day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);

    // Hide input
    inputContainer.hidden=true;

    // If countdown has ended , show complete
    if(distance < 0){
        countdownEl.hidden=true;
        clearInterval(countdownActive);
        completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
        completeEl.hidden=false;
    }else{
        // 
        countdownElTitle.textContent=countdownTitle;
        timeElements[0].textContent=days;
        timeElements[1].textContent=hours;
        timeElements[2].textContent=minutes;
        timeElements[3].textContent=seconds;
        countdownEl.hidden=false;
        completeEl.hidden=true;
    }

    // Show Countdown



}, second);
}
// Take Values form Form Input
function updateCountdown(e){
    e.preventDefault();
    countdownTitle=e.srcElement[0].value;
    countdownDate=e.srcElement[1].value;
    savedCountdown = {
        title: countdownTitle,
        date: countdownDate
    };
    console.log(savedCountdown);
    localStorage.setItem('countdown', JSON.stringify(savedCountdown));
    // Check For Valid Date
    if(countdownDate === ''){
        alert('please select a date for the countdown.')
    }else{
    // Get number version of current Date, updateDom
    countdownValue=new Date(countdownDate).getTime();
    updateDom();
    }

}

// Reset All Values
function reset(){
    // Hide Countdowns , show Input
    countdownEl.hidden= true;
    completeEl.hidden=true;
    inputContainer.hidden = false;
    // Stop the countdown
    clearInterval(countdownActive);
    // Reset values
    countdownTitle='';
    countdownDate='';
    localStorage.removeItem('countdown');
}

function restorePreviousCountdown(){
    // Get countdown from localStorage if available
    if(localStorage.getItem('countdown')){
        inputContainer.hidden=true;
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));
        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDom();
    }
}

countdownForm.addEventListener('submit', updateCountdown);
countdownElBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);

restorePreviousCountdown();
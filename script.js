// Function to update the clock
function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear();
    const dateString = `${day}/${month}/${year}`;
    
    document.getElementById('time').textContent = timeString;
    document.getElementById('date').textContent = dateString;
}

setInterval(updateClock, 1000); // Update the clock every second
updateClock(); // Initial call to display the clock immediately

// Alarm setup
const alarmTimeInput = document.getElementById('alarm-time');
const setAlarmButton = document.getElementById('set-alarm');
const alarmMessage = document.getElementById('alarm-message');
let alarmTime = null;

setAlarmButton.addEventListener('click', () => {
    alarmTime = alarmTimeInput.value;
    alarmMessage.textContent = `Alarm set for ${alarmTime}`;
});

setInterval(() => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const currentTime = `${hours}:${minutes}`;
    
    if (alarmTime === currentTime) {
        alert('Alarm ringing!');
        alarmTime = null;
        alarmMessage.textContent = '';
    }
}, 1000);

// Stopwatch functionality
let stopwatchInterval;
let stopwatchTime = 0;
const stopwatchDisplay = document.getElementById('stopwatch');
const startStopwatchButton = document.getElementById('start-stopwatch');
const stopStopwatchButton = document.getElementById('stop-stopwatch');
const resetStopwatchButton = document.getElementById('reset-stopwatch');

startStopwatchButton.addEventListener('click', () => {
    if (!stopwatchInterval) {
        stopwatchInterval = setInterval(() => {
            stopwatchTime++;
            const hours = Math.floor(stopwatchTime / 3600).toString().padStart(2, '0');
            const minutes = Math.floor((stopwatchTime % 3600) / 60).toString().padStart(2, '0');
            const seconds = (stopwatchTime % 60).toString().padStart(2, '0');
            stopwatchDisplay.textContent = `${hours}:${minutes}:${seconds}`;
        }, 1000);
    }
});

stopStopwatchButton.addEventListener('click', () => {
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
});

resetStopwatchButton.addEventListener('click', () => {
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
    stopwatchTime = 0;
    stopwatchDisplay.textContent = '00:00:00';
});

// Variables for the calendar
const date = new Date();
let month = date.getMonth();
let year = date.getFullYear();

const monthYear = document.getElementById('month-year');
const datesContainer = document.getElementById('dates');

// Function to render the calendar
function renderCalendar(month, year) {
    const firstDay = new Date(year, month).getDay();
    const daysInMonth = 32 - new Date(year, month, 32).getDate();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    monthYear.textContent = `${monthNames[month]} ${year}`;
    
    datesContainer.innerHTML = '';
    for (let i = 0; i < firstDay; i++) {
        datesContainer.innerHTML += '<div></div>';
    }
    for (let i = 1; i <= daysInMonth; i++) {
        datesContainer.innerHTML += `<div>${i}</div>`;
    }
}

// Event listeners for the calendar navigation buttons
document.getElementById('prev').addEventListener('click', () => {
    month--;
    if (month < 0) {
        month = 11;
        year--;
    }
    renderCalendar(month, year);
});

document.getElementById('next').addEventListener('click', () => {
    month++;
    if (month > 11) {
        month = 0;
        year++;
    }
    renderCalendar(month, year);
});

// Initial call to render the calendar
renderCalendar(month, year);

// To-Do List functionality
const newTodoInput = document.getElementById('new-todo');
const addTodoButton = document.getElementById('add-todo');
const todoList = document.getElementById('todo-list');

addTodoButton.addEventListener('click', () => {
    const todoText = newTodoInput.value.trim();
    if (todoText !== '') {
        const li = document.createElement('li');
        const span = document.createElement('span');
        span.textContent = todoText;
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        
        editButton.addEventListener('click', () => {
            const newTodoText = prompt('Edit task:', span.textContent);
            if (newTodoText !== null && newTodoText.trim() !== '') {
                span.textContent = newTodoText.trim();
            }
        });
        
        deleteButton.addEventListener('click', () => {
            todoList.removeChild(li);
        });
        
        li.appendChild(span);
        li.appendChild(editButton);
        li.appendChild(deleteButton);
        todoList.appendChild(li);
        newTodoInput.value = '';
    }
});

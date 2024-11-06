// Grab form elements
const logForm = document.getElementById('logForm')
const dayOfWeek = document.getElementById('dayOfWeek')
const exerciseInput = document.getElementById('exercise')

// Load exercises on page load
window.onload = function() {
  loadExerciseLog()
}

// Handle form submission
logForm.addEventListener('submit', function(e) {
  e.preventDefault()

  const day = dayOfWeek.value
  const exercise = exerciseInput.value.trim()

  if (!day || !exercise) {
    alert('Please select a day and enter an exercise.')
    return
  }

  // Save exercise to localStorage
  saveExercise(day, exercise)

  // Update display
  addExerciseToDisplay(day, exercise)

  // Reset form
  logForm.reset()
})

// Save exercise to localStorage
function saveExercise(day, exercise) {
  let exerciseLog = JSON.parse(localStorage.getItem('exerciseLog')) || {}
  
  if (!exerciseLog[day]) {
    exerciseLog[day] = []
  }

  exerciseLog[day].push(exercise)
  localStorage.setItem('exerciseLog', JSON.stringify(exerciseLog))
}

// Load exercise log from localStorage
function loadExerciseLog() {
  const exerciseLog = JSON.parse(localStorage.getItem('exerciseLog')) || {}

  for (let day in exerciseLog) {
    exerciseLog[day].forEach(exercise => {
      addExerciseToDisplay(day, exercise)
    })
  }
}

// Add an exercise to the displayed list
function addExerciseToDisplay(day, exercise) {
  const dayElement = document.getElementById(day)
  const ul = dayElement.querySelector('ul')
  const li = document.createElement('li')
  li.textContent = exercise
  ul.appendChild(li)
}

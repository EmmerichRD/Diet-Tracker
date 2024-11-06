// Elements for form and meal log
const mealForm = document.getElementById('mealForm')
const mealType = document.getElementById('mealType')
const foodItemInput = document.getElementById('foodItem')
const caloriesInput = document.getElementById('calories')
const carbsInput = document.getElementById('carbs')
const fatsInput = document.getElementById('fats')
const proteinsInput = document.getElementById('proteins')

// Elements for water intake
const waterIntakeElement = document.getElementById('waterIntake')
let waterIntake = 0

// Daily totals
let dailyTotals = {
  calories: 0,
  carbs: 0,
  fats: 0,
  proteins: 0,
}

// Load existing log on page load
window.onload = function() {
  loadMealLog()
  loadWaterIntake()
}

// Add meal to log
mealForm.addEventListener('submit', function(e) {
  e.preventDefault()

  const meal = mealType.value
  const foodItem = foodItemInput.value.trim()
  const calories = parseInt(caloriesInput.value)
  const carbs = parseInt(carbsInput.value)
  const fats = parseInt(fatsInput.value)
  const proteins = parseInt(proteinsInput.value)

  if (!meal || !foodItem || isNaN(calories) || isNaN(carbs) || isNaN(fats) || isNaN(proteins)) {
    alert("Please fill out all fields.")
    return
  }

  // Save the food log entry
  saveMeal(meal, { foodItem, calories, carbs, fats, proteins })

  // Update meal section
  addMealToDisplay(meal, { foodItem, calories, carbs, fats, proteins })

  // Update daily totals
  updateDailyTotals(calories, carbs, fats, proteins)

  // Reset form
  mealForm.reset()
})

// Save meal to localStorage
function saveMeal(meal, foodData) {
  let mealLog = JSON.parse(localStorage.getItem('mealLog')) || {}
  
  if (!mealLog[meal]) {
    mealLog[meal] = []
  }

  mealLog[meal].push(foodData)
  localStorage.setItem('mealLog', JSON.stringify(mealLog))
}

// Load meal log from localStorage
function loadMealLog() {
  const mealLog = JSON.parse(localStorage.getItem('mealLog')) || {}

  for (let meal in mealLog) {
    mealLog[meal].forEach(foodData => {
      addMealToDisplay(meal, foodData)
      updateDailyTotals(foodData.calories, foodData.carbs, foodData.fats, foodData.proteins)
    })
  }
}

// Add meal to the displayed list
function addMealToDisplay(meal, foodData) {
  const mealSection = document.getElementById(meal)
  const ul = mealSection.querySelector('ul')
  const li = document.createElement('li')
  li.textContent = `${foodData.foodItem}: ${foodData.calories} kcal, ${foodData.carbs}g carbs, ${foodData.fats}g fats, ${foodData.proteins}g proteins`
  ul.appendChild(li)

  // Update meal total calories
  const totalCalories = mealSection.querySelector('.totalCalories')
  totalCalories.textContent = parseInt(totalCalories.textContent) + foodData.calories
}

// Update daily totals (calories, carbs, fats, proteins)
function updateDailyTotals(calories, carbs, fats, proteins) {
  dailyTotals.calories += calories
  dailyTotals.carbs += carbs
  dailyTotals.fats += fats
  dailyTotals.proteins += proteins

  document.getElementById('dailyCalories').textContent = dailyTotals.calories
  document.getElementById('dailyCarbs').textContent = dailyTotals.carbs
  document.getElementById('dailyFats').textContent = dailyTotals.fats
  document.getElementById('dailyProteins').textContent = dailyTotals.proteins
}

// Water intake tracker
document.getElementById('addWater').addEventListener('click', function() {
  waterIntake++
  updateWaterIntake()
  saveWaterIntake()
})

document.getElementById('resetWater').addEventListener('click', function() {
  waterIntake = 0
  updateWaterIntake()
  saveWaterIntake()
})

// Update water intake display
function updateWaterIntake() {
  waterIntakeElement.textContent = waterIntake
}

// Save water intake to localStorage
function saveWaterIntake() {
  localStorage.setItem('waterIntake', waterIntake)
}

// Load water intake from localStorage
function loadWaterIntake() {
  waterIntake = parseInt(localStorage.getItem('waterIntake')) || 0
  updateWaterIntake()
}

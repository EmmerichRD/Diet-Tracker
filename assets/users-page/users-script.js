// Grab elements
const profileForm = document.getElementById('profileForm');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const ageInput = document.getElementById('age');
const profileDisplay = document.getElementById('profileDisplay');
const displayUsername = document.getElementById('displayUsername');
const displayEmail = document.getElementById('displayEmail');
const displayAge = document.getElementById('displayAge');
const editProfileBtn = document.getElementById('editProfile');
const deleteProfileBtn = document.getElementById('deleteProfile');

// Load profile if it exists
window.onload = function() {
  loadProfile();
};

// Event listener for form submission (Create / Edit profile)
profileForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const username = usernameInput.value;
  const email = emailInput.value;
  const age = ageInput.value;

  // Save to localStorage
  const userProfile = { username, email, age };
  localStorage.setItem('userProfile', JSON.stringify(userProfile));

  // Display profile
  displayProfile(userProfile);
  toggleFormVisibility(false);
});

// Load the profile from localStorage
function loadProfile() {
  const savedProfile = localStorage.getItem('userProfile');
  if (savedProfile) {
    const userProfile = JSON.parse(savedProfile);
    displayProfile(userProfile);
    toggleFormVisibility(false);
  } else {
    toggleFormVisibility(true);
  }
}

// Display profile data in the HTML
function displayProfile(profile) {
  displayUsername.textContent = profile.username;
  displayEmail.textContent = profile.email;
  displayAge.textContent = profile.age;
}

// Show or hide the profile form
function toggleFormVisibility(showForm) {
  if (showForm) {
    document.getElementById('userForm').classList.remove('hidden');
    profileDisplay.classList.add('hidden');
  } else {
    document.getElementById('userForm').classList.add('hidden');
    profileDisplay.classList.remove('hidden');
  }
}

// Edit profile
editProfileBtn.addEventListener('click', function() {
  const savedProfile = JSON.parse(localStorage.getItem('userProfile'));
  if (savedProfile) {
    usernameInput.value = savedProfile.username;
    emailInput.value = savedProfile.email;
    ageInput.value = savedProfile.age;
  }
  toggleFormVisibility(true);
});

// Delete profile
deleteProfileBtn.addEventListener('click', function() {
  localStorage.removeItem('userProfile');
  toggleFormVisibility(true);
  profileForm.reset();
});

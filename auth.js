// Simulated backend database as an in-memory array
const usersDB = [];

/**
 * Display an inline authentication message.
 * @param {string} message - The message text.
 * @param {string} type - The type of message ('success' or 'error').
 */
function showAuthMessage(message, type) {
  const messageContainer = document.getElementById("auth-message");
  if (messageContainer) {
    messageContainer.textContent = message;
    // Set the alert classes (assumes you have CSS for .alert, .success, .error)
    messageContainer.className = "alert " + type;
    messageContainer.style.display = "block";
  }
}

/**
 * Handle signup form submission.
 * Validates the form, checks if passwords match, simulates a backend API call,
 * and stores the new user in the usersDB array.
 */
function handleSignup(e) {
  e.preventDefault();

  // Get input values
  const username = document.querySelector("#username").value.trim();
  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value;
  const confirmPassword = document.querySelector("#confirm-password").value;

  // Basic validation
  if (!username || !email || !password || !confirmPassword) {
    showAuthMessage("Please fill in all fields.", "error");
    return;
  }

  if (password !== confirmPassword) {
    console.error("Passwords do not match.");
    showAuthMessage("Passwords do not match.", "error");
    return;
  }

  // Simulate API call delay (e.g., network latency)

  // Check if a user with this email already exists
  const existingUser = usersDB.find((user) => user.email === email);
  if (existingUser) {
    console.error("An account with this email already exists.");
    showAuthMessage("An account with this email already exists.", "error");
    return;
  }

  // Create a new user object (In a real app, never store passwords in plain text)
  const newUser = { username, email, password };

  // "Store" the user in our simulated database
  usersDB.push(newUser);
  console.log("New user registered:", newUser);
  showAuthMessage("Signup successful!", "success");

  // Optionally, clear the form or proceed further
  e.target.reset();
}

/**
 * Handle login form submission.
 * Checks the entered username/email and password against the simulated database.
 */
function handleLogin(e) {
  e.preventDefault();

  // For login, the form input can be either username or email.
  const usernameOrEmail = document.querySelector("#username").value.trim();
  const password = document.querySelector("#password").value;

  if (!usernameOrEmail || !password) {
    showAuthMessage("Please enter both username/email and password.", "error");
    return;
  }

  // Find a matching user by username or email with the correct password
  const user = usersDB.find(
    (user) =>
      (user.username === usernameOrEmail || user.email === usernameOrEmail) &&
      user.password === password
  );

  if (user) {
    showAuthMessage("Login successful!", "success");
    console.log("User logged in:", user);
    // Optionally, proceed to a dashboard or clear the form
  } else {
    showAuthMessage("Invalid credentials. Please try again.", "error");
  }
}

/* 
  Attach the event listeners:
  - If a signup form exists (with class "signup__form"), attach the signup handler.
  - If a login form exists (with class "login__form"), attach the login handler.
*/
const signupForm = document.querySelector(".signup__form");
if (signupForm) {
  signupForm.addEventListener("submit", handleSignup);
}

const loginForm = document.querySelector(".login__form");
if (loginForm) {
  loginForm.addEventListener("submit", handleLogin);
}

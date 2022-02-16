const form = document.querySelector("form");
const inputs = document.querySelectorAll("input[type=text], input[type=password]");
const progressBar = document.querySelector(".progress-bar");
const passwordInput = document.getElementById("password");
const confirmInput = document.getElementById("confirm");
let pseudoOutput, emailOutput, passwordOutput, confirmOutput;
let passwordUpper, passwordLower, passwordDigit, passwordSpecial, passwordStrength;

// Function to displays a message with arguments : html input, message, and if the input is valid
const errorDisplay = function (tag, message, valid) {
  const container = document.querySelector("." + tag + "-container");
  const span = document.querySelector("." + tag + "-container > .alert");
  if (!valid) {
    container.classList.add("error");
    span.textContent = message;
  } else {
    container.classList.remove("error");
    span.textContent = message;
  }
};

// Function to test password strength
const testPasswordStrength = function () {
  passwordStrength = 0;
  let password = document.getElementById("password").value;
  if (password.match(/^(?=.*[A-Z])/)) { // Uppercase
    passwordUpper = 1;
  } else passwordUpper = 0;
  if (password.match(/^(?=.*[a-z])/)) { // Lowercase
    passwordLower = 1;
  } else passwordLower = 0;
  if (password.match(/^(?=.*[\d])/)) { // Digits
    passwordDigit = 1;
  } else passwordDigit = 0;
  if (password.match(/[^\s\w]|_/)) { // Special characters
    passwordSpecial = 1;
  } else passwordSpecial = 0;
  passwordStrength = (passwordUpper + passwordLower + passwordDigit + passwordSpecial);
  if (passwordInput.value.length < 8) {
    passwordStrength = 1;
  }
};

// Function to change the appearance of the progress bar depending on the password strength
const changeProgressBar = function () {
  switch (passwordStrength) {
    case 1:
      progressBar.classList.add("progress1");
      break;
    case 2:
      progressBar.classList.add("progress2");
      break;
    case 3:
      progressBar.classList.add("progress3");
      break;
    case 4:
      progressBar.classList.add("progress4");
      break;
  }
};

//Function to display the password progress-bar
passwordInput.addEventListener("input", function (e) {
  progressBar.classList = "progress-bar";
  if (e.target.value.length > 0) {
    progressBar.classList.add("progress-active");
  } else {
    progressBar.classList.remove("progress-active");
  }
});

// Function to check pseudo validity
const pseudoChecker = function (value) {
  if (value.length > 0 && (value.length < 3 || value.length > 20)) {
    errorDisplay("pseudo", "Must contain 3-20 caracters");
    pseudoOutput = null;
  } else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {
    errorDisplay("pseudo", "Must not contain special caracters");
    pseudoOutput = null;
  } else {
    errorDisplay("pseudo", "", true);
    pseudoOutput = value;
  }
};

// Function to check email validity
const emailChecker = function (value) {
  if (!value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
    errorDisplay("email", "Enter a valid email address");
    emailOutput = null;
  } else {
    errorDisplay("email", "", true);
    emailOutput = value;
  }
};

// Function to check password validity
const passwordChecker = function (value) {
  if (value.length > 0 && value.length < 8) {
    errorDisplay("password", "Must contain at least 8 characters");
    passwordOutput = null;
  } else if (value.length > 64) {
    errorDisplay("password", "Must not be longer than 64 characters");
    passwordOutput = null;
  } else {
    errorDisplay("password", "", true);
    passwordOutput = value;
  }
  if (confirmInput.value.length > 0) confirmChecker(confirmInput.value);
  console.log(confirmInput.value.length);
};

// Function to check that the password confirmation is identical to the password
const confirmChecker = function (value) {
  if (passwordInput.value !== value) {
    errorDisplay("confirm", "Password and confirmation are different");
    confirmOutput = false;
  } else {
    errorDisplay("confirm", "", true);
    confirmOutput = true;
  }
};

// Execute check functions when typing in an input
inputs.forEach((input) => {
  input.addEventListener("input", (e) => {

    switch (e.target.id) {
      case "pseudo":
        pseudoChecker(e.target.value);
        break;
      case "email":
        emailChecker(e.target.value);
        break;
      case "password":
        passwordChecker(e.target.value);
        testPasswordStrength();
        changeProgressBar();
        break;
      case "confirm":
        confirmChecker(e.target.value);
        break;
      default:
        null;
    }
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();


  // Sending form in an alert
  if (pseudoOutput && emailOutput && passwordOutput && confirmOutput) {
    const data = {
      pseudo: pseudoOutput,
      email: emailOutput,
      password: passwordOutput
    };
    alert("You have successfully subscribed to nothing" + "\r\n" + "Pseudo: " + data.pseudo + "\r\n" + "Email: " + data.email + "\r\n" + "Password: " + data.password);
    inputs.forEach((input) => input.value = "");

    pseudoOutput = null;
    emailOutput = null;
    passwordOutput = null;
    confirmOutput = null;
    progressBar.classList.remove("progress-active");
  }
});
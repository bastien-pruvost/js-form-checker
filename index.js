
const inputs = document.querySelectorAll("input[type=text], input[type=password]");
let pseudo, email, password, confirmPassword;


// Function to displays a message by choosing the html input, the message, and if the input is valid
const errorDisplay = function (tag, message, valid) {
  const Container = document.querySelector("." + tag + "-container");
  const span = document.querySelector("." + tag + "-container > .alert");
  if (!valid) {
    Container.classList.add("error");
    span.textContent = message;
  } else {
    Container.classList.remove("error");
    span.textContent = message;
  }
};

// Function to check pseudo validity
const pseudoChecker = function (value) {
  if (!value.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
    console.log("Not ok");
  };
};


const emailChecker = function (value) {
  if (value.length > 0 && (value.length < 3 || value.length > 20)) {
    errorDisplay("email", "Must contain 3-20 caracters");
    email = null;
  } else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {
    errorDisplay("email", "Must not contain special caracters");
    email = null;
  } else {
    errorDisplay("email", "", true);
    email = value;
  }
};
const passwordChecker = function (value) { };
const confirmChecker = function (value) { };


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
        break;
      case "confirm":
        confirmChecker(e.target.value);
        break;
      default:
        null;
    }
  });
});

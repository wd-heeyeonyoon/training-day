console.log("script.js loaded");
const form = document.getElementById("signup-form");
const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const userId = document.getElementById("userId");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");
const regions = document.getElementById("regions");
const newsletter = document.getElementById("newsletter");
const result = document.getElementById("result");

form.addEventListener("submit", (event) => {
  event.preventDefault(); // prevent the form from submitting and refreshing the page

  const isValid = validateInputs();
  if (isValid) {
    showResult();
  }
});

// get the values from the form
const getFormValues = () => {
  return {
    fnameValue: fname.value.trim(),
    lnameValue: lname.value.trim(),
    userIdValue: userId.value.trim(),
    emailValue: email.value.trim(),
    passwordValue: password.value.trim(),
    confirmPasswordValue: confirmPassword.value.trim(),
    regionValue: regions.value,
    newsletterValue: newsletter.checked,
  };
};

const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

const setError = (element, message) => {
  const inputContainer = element.parentElement;
  const errorDisplay = inputContainer.querySelector(".error");
  errorDisplay.innerText = message;
  inputContainer.classList.add("error");
  inputContainer.classList.remove("success");
};

const setSuccess = (element) => {
  const inputContainer = element.parentElement;
  const errorDisplay = inputContainer.querySelector(".error");
  errorDisplay.innerText = "";
  inputContainer.classList.add("success");
  inputContainer.classList.remove("error");
};

// validate the inputs
const validateInputs = () => {
  console.log("validateInputs");

  let isValid = true;

  const values = getFormValues();

  if (values.fnameValue === "") {
    setError(fname, "First name is required");
    isValid = false;
  } else {
    setSuccess(fname);
  }

  if (values.lnameValue === "") {
    setError(lname, "Last name is required");
    isValid = false;
  } else {
    setSuccess(lname);
  }

  if (values.userIdValue === "") {
    setError(userId, "ID is required");
    isValid = false;
  } else {
    setSuccess(userId);
  }

  if (values.emailValue === "") {
    setError(email, "Email is required");
    isValid = false;
  } else if (!isValidEmail(values.emailValue)) {
    setError(email, "Provide a valid email address");
    isValid = false;
  } else {
    setSuccess(email);
  }

  if (values.passwordValue === "") {
    setError(password, "Password is required");
    isValid = false;
  } else if (values.passwordValue.length < 8) {
    setError(password, "Password must be at least 8 characters.");
    isValid = false;
  } else if (!/[A-Z]/.test(values.passwordValue)) {
    setError(password, "Password must contain at least one uppercase letter.");
    isValid = false;
  } else if (!/[a-z]/.test(values.passwordValue)) {
    setError(password, "Password must contain at least one lowercase letter.");
    isValid = false;
  } else if (!/[0-9]/.test(values.passwordValue)) {
    setError(password, "Password must contain at least one number.");
    isValid = false;
  } else if (!/[!@#$%^&*]/.test(values.passwordValue)) {
    setError(password, "Password must contain at least one special character.");
    isValid = false;
  } else {
    setSuccess(password);
  }

  if (values.confirmPasswordValue === "") {
    setError(confirmPassword, "Confirm password is required");
    isValid = false;
  } else if (values.passwordValue !== values.confirmPasswordValue) {
    setError(confirmPassword, "Passwords do not match");
    isValid = false;
  } else {
    setSuccess(confirmPassword);
  }

  if (values.regionValue === "") {
    setError(regions, "Region is required");
    isValid = false;
  } else {
    setSuccess(regions);
  }

  return isValid;
};

const showResult = () => {
  const values = getFormValues();
  const newsletterText = values.newsletterValue
    ? "Subscribed to newsletter"
    : "Not subscribed to newsletter";

  result.innerHTML = `
  <h2>Result</h2>
  <p><strong>First name:</strong> ${values.fnameValue}</p>
  <p><strong>Last name:</strong> ${values.lnameValue}</p>
  <p><strong>ID:</strong> ${values.userIdValue}</p>
  <p><strong>Email:</strong> ${values.emailValue}</p>
  <p><strong>Password:</strong> ${values.passwordValue}</p>
  <p><strong>Confirm password:</strong> ${values.confirmPasswordValue}</p>
  <p><strong>Region:</strong> ${values.regionValue}</p>
  <p><strong>Newsletter:</strong> ${newsletterText}</p>
  `;
};

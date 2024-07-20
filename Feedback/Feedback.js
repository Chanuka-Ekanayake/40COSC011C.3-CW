//Initializing the values of inputs in the form
var userName = document.getElementById("userName");
var email = document.getElementById("userEmail");

var suggestion = document.getElementById("suggestions");
var additional = document.getElementById("additional");

var update = document.getElementById("updates");

var visit = document.getElementsByName("FirstTimeVisiting");
var informative = document.getElementsByName("informative");
var rate = document.getElementsByName("rate");
var recommend = document.getElementsByName("recommend");


var inputValues = [
  userName,
  email,
  suggestion,
  additional,
  update,
  visit,
  informative,
  rate,
  recommend,
];

//------ Validation ---------

//validate userName
//Check Null
function nullCheck(element) {
  return element === null || element === "";
}



function validateEmail(email) {
  return email.includes("@") && email.includes(".");
}



function setError(element, message) {
  var inputControl = element.parentElement;
  var errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = message;
  inputControl.classList.add("error");

}



function setSuccess(element) {
  var inputControl = element.parentElement;
  var errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = "";
  inputControl.classList.remove("error");
}




var emptyForm = true;
var validName = false;
var validEmail = false;



function validation() {

  for (var i = 0; i < 4; i++) {
    if (!nullCheck(inputValues[i].value)) {
      emptyForm = false;
      break;
    }
  }


  if (emptyForm) {
    for (var i = 0; i < 4; i++) {
      setError(inputValues[i], "Please fill the area");
    }
    return;

  } else {
    for (var i = 0; i < 4; i++) {
      setSuccess(inputValues[i]);
      emptyForm = false;

    }
  }


  if (nullCheck(userName.value)) {
    setError(userName, "Username is requiered");
  } else {
    setSuccess(userName)
    validName = true;
  }

  if (nullCheck(email.value)) {
    setError(email, "Email is required");
  } else if (!validateEmail(email.value)) {
    setError(email, "Invalid Email");
  } else {
    setSuccess(email);
    validEmail = true;
  }
}


userName.onblur = function () {
  if (nullCheck(userName.value)) {
    setError(userName, "Username is requiered");
  } else {
    setSuccess(userName)
  }
}

email.onblur = function () {
  if (nullCheck(email.value)) {
    setError(email, "Email is required");
  } else if (!validateEmail(email.value)) {
    setError(email, "Invalid Email");
  } else {
    setSuccess(email);
  }
}

suggestion.onfocus = function () {
  setSuccess(suggestion);
}

additional.onfocus = function () {
  setSuccess(additional);
}

userName.onfocus = function () {
  setSuccess(userName);
}

email.onfocus = function () {
  setSuccess(email);
}




document.getElementById('submitBtn').addEventListener("click", function (event) {
  event.preventDefault();
  validation();
  if (validName && validEmail) {
    document.feedback.submit();
    setTimeout(function () { window.location.href = "Feedback-Thankyou.html"; }, 2000);

  }
});

document.getElementById('prevBtn').addEventListener("click", function (event) {
  event.preventDefault();

  validation();
  console.log(emptyForm);
  console.log(validName);
  console.log(validEmail);


  if (validName && validEmail) {

    localStorage.setItem('previewData', JSON.stringify({
      name: userName.value,
      email: email.value,
      suggestion: suggestion.value,
      rate: document.querySelector('input[name="rate"]:checked').value,
      update: update.value,
      additional: additional.value,
      visit: visit.value,
      informative: informative.value,
      recommend: recommend.value
    }));

    window.location.href = "Feedback-Preview.html";

  } else {
    validation();
  }
});

const toggleBtn = document.querySelector(".toggle_btn");
const toggleBtnIcon = document.querySelector(".toggle_btn");
const dropDownMenu = document.querySelector(".dropdownMenu");

toggleBtn.onclick = function () {
  dropDownMenu.classList.toggle('open');
  const isOpen = dropDownMenu.classList.contains('open');
};


// Navigation bar animation
window.addEventListener("scroll", function () {
  var header = document.querySelector("header");
  header.classList.toggle("stickey", window.scrollY > 0);
})







var signInForm = document.querySelector('.login-form');
var logInEmail = document.querySelector('#logInEmail');
var logInPassword = document.querySelector('#logInPassword');
var errorObject = document.querySelector('.error-message p');
var users = [];

var errorMessages = {
    emptyInputs: 'All fields are required',
    logInEmail: 'User isn\'t exist',
    logInPassword: 'Password is incorrect'
}


if(localStorage.getItem('users')) {
    users = JSON.parse(localStorage.getItem('users'));
}


logInBtn.addEventListener('click', function (e) {
    e.preventDefault();
    logInUser();
});



function logInUser(){
    if(validateSignIn())
    {
        var user = getUserByEmail(logInEmail.value.toLowerCase());
        clearForm();
        hideObject(errorObject);
        console.log(user.name + ' is logged in');
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        window.location.href = 'home.html';
    }
}


function validateSignIn() {
    inputs = Array.from(signInForm.querySelectorAll('input'));
    if(checkEmpty(inputs)) {
        displayMessage(errorObject, errorMessages.emptyInputs);
        return false;
    }
    if(isEmailExist()) {
        if(isPasswordCorrect()) {
            return true;
        }
        displayMessage(errorObject, errorMessages.logInPassword);
        return false;
    }
    displayMessage(errorObject, errorMessages.logInEmail);
    return false;
}


function checkEmpty(inputs) {
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].value === '') {
            return true;
        }
    }
    return false;
}

function isEmailExist(){
    for (var i = 0; i < users.length; i++) {
        if (users[i].email === logInEmail.value.toLowerCase()) {
            return true;
        }
    }
    return false;
}

function isPasswordCorrect(){
    for (var i = 0; i < users.length; i++) {
        if (users[i].email === logInEmail.value.toLowerCase() && users[i].password === logInPassword.value) {
            return true;
        }
    }
    return false;

}


function displayMessage(object, message) {
    object.innerHTML = message;
    if (object.classList.contains('d-none')) {
        object.classList.remove('d-none');
        object.classList.add('d-block');
    }
}


function hideObject(object) {
    if (object.classList.contains('d-block')) {
        object.classList.remove('d-block');
        object.classList.add('d-none');
    }
}



function clearForm() {
    inputs = Array.from(signInForm.querySelectorAll('input'));
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = '';
    }
}


function getUserByEmail()
{
    for (var i = 0; i < users.length; i++) {
        if (users[i].email === logInEmail.value.toLowerCase()) {
            return users[i];
        }
    }
    return null;
}


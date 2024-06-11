var signUpForm = document.querySelector('.signup-form');
var signUpName = document.querySelector('#signUpName');
var signUpEmail = document.querySelector('#signUpEmail');
var signUpPassword = document.querySelector('#signUpPassword');
var signUpBtn = document.querySelector('#signUpBtn');
var errorObject = document.querySelector('.error-message p');
var successObject = document.querySelector('.success-message p');
var users = [];

var successMessage = 'Success';
var errorMessages = {
    emptyInputs: 'All fields are required',
    signUpName: 'Name must be at least 3 characters long',
    signUpEmail: 'Email must be valid',
    signUpPassword: 'Password must be at least 6 characters long'
}



if (localStorage.getItem('users')) {
    users = JSON.parse(localStorage.getItem('users'));
}



signUpBtn.addEventListener('click', function (e) {
    e.preventDefault();
    addUser();
});




function addUser() {
    
    if (validateSignUp()) 
        {
        var user = {
            name: signUpName.value,
            email: signUpEmail.value.toLowerCase(),
            password: signUpPassword.value
        }
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        clearForm();
    }
}



function validateSignUp() {
    inputs = Array.from(signUpForm.querySelectorAll('input'));
    if(checkEmpty(inputs)) {
        displayMessage(errorObject, errorMessages.emptyInputs);
        hideObject(successObject);
        return false;
    }
    regex = {
        signUpName: /^[a-zA-Z]{3,}$/,
        signUpEmail: /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/,
        signUpPassword: /^[a-zA-Z0-9]{6,}$/
    }
    for (var i = 0; i < inputs.length; i++) {
        if (!regex[inputs[i].id].test(inputs[i].value)) {
            displayMessage(errorObject, errorMessages[inputs[i].id]);
            hideObject(successObject);
            return false;
        }
    }
    displayMessage(successObject, successMessage);
    hideObject(errorObject);
    return true;
}


function checkEmpty(inputs) {
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].value === '') {
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
    inputs = Array.from(signUpForm.querySelectorAll('input'));
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = '';
    }
}




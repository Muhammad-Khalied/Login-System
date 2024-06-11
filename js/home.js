var nameField = document.querySelector('h1');
var user = [];
user = JSON.parse(localStorage.getItem('loggedInUser'));


nameField.innerHTML = 'Welcome ' + user.name;
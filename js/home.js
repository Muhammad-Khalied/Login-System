var nameField = document.querySelector('h1');
var user = [];
var logout = document.querySelector('#logout');

if (localStorage.getItem('loggedInUser'))
{
    user = JSON.parse(localStorage.getItem('loggedInUser'));
    nameField.innerHTML = 'Welcome ' + user.name;
}


logout.addEventListener('click', function (e) {
    e.preventDefault();
    localStorage.removeItem('loggedInUser');
    window.location.href = 'index.html';
});


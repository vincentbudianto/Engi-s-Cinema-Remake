let userCookie = (document.cookie.match(/^(?:.*;)?\s*userEngima\s*=\s*([^;]+)(?:.*)?$/)||[,null])[1];

if (userCookie != null) {
    window.location.replace('homepage.html');
}

let input = document.getElementById('password');

//To execute login button if enter key pressed on password input
input.addEventListener("keyup", function(event) {
    if (event.keyCode == 13) {
        event.preventDefault();
        document.getElementById("login-button").click();
    }
});

function login(e) {
    e.preventDefault();
    let getData = new FormData(document.forms.loginForm);
    let request = new XMLHttpRequest();
    request.open("POST", "php/login.php", true);
    request.send(getData);

    request.onload = function() {
        switch (request.response.substr(-3)) {
            case '200':
                location.reload();
                break;

            case '201':
                document.getElementById('error-msg').style.color = 'red';
                document.getElementById('error-msg').innerHTML = 'Login failed';
                break;

            case '301':
                document.getElementById('error-msg').style.color = 'red';
                document.getElementById('error-msg').innerHTML = 'Wrong password';
                break;

            case '302':
                document.getElementById('error-msg').style.color = 'red';
                document.getElementById('error-msg').innerHTML = 'Username/email is not registered';
                break;

            case '401':
                document.getElementById('error-msg').style.color = 'red';
                document.getElementById('error-msg').innerHTML = 'Username/email is empty';
                break;

            case '402':
                document.getElementById('error-msg').style.color = 'red';
                document.getElementById('error-msg').innerHTML = 'Password is empty';
                break;
        }
    };
}

document.getElementById('loginForm').addEventListener('submit', login);
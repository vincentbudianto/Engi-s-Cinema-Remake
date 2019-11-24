let userCookie = (document.cookie.match(/^(?:.*;)?\s*user\s*=\s*([^;]+)(?:.*)?$/)||[,null])[1];

if (userCookie != null) {
    window.location.replace('homepage.html');
}

function unameValidate() {
    let uname = document.getElementById('username-input').value;

    if (uname.length < 5 || uname.length > 16) {
        document.getElementById('username-input').style.borderColor = 'red';
        document.getElementById('username-input').style.borderWidth = '1.5px';
        document.getElementById('false-username-msg').style.color = 'red';
        document.getElementById('false-username-msg').innerHTML = 'Username must be between 5-16 in length';
    } else if (!/^[a-zA-Z0-9_]{5,16}$/.test(uname)) {
        document.getElementById('username-input').style.borderColor = 'red';
        document.getElementById('username-input').style.borderWidth = '1.5px';
        document.getElementById('false-username-msg').style.color = 'red';
        document.getElementById('false-username-msg').innerHTML = 'Username can only be combination of characters, numbers, or underscore';
    } else {
        let getData = new FormData(document.forms.registerForm);
        let request = new XMLHttpRequest();
        request.open("POST", "php/regValidation.php", true);
        request.send(getData);

        request.onload = function() {
            switch (request.response.substr(-3)) {
                case '401':
                    let unameInput = document.getElementById('username-input').value;
                    document.getElementById('username-input').style.borderColor = 'red';
                    document.getElementById('username-input').style.borderWidth = '1.5px';
                    document.getElementById('false-username-msg').style.color = 'red';
                    document.getElementById('false-username-msg').innerHTML = 'Username ' + unameInput + ' already exist! Please use another username.';
                    break;

                default :
                    document.getElementById('username-input').style.borderColor = 'green';
                    document.getElementById('username-input').style.borderWidth = '1.5px';
                    document.getElementById('false-username-msg').innerHTML = '';
                    break;
            }
        };
    }
}

function emailValidate() {
    let email = document.getElementById('email-input').value;

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        document.getElementById('email-input').style.borderColor = 'red';
        document.getElementById('email-input').style.borderWidth = '1.5px';
        document.getElementById('false-email-msg').style.color = 'red';
        document.getElementById('false-email-msg').innerHTML = 'Please input a correct email format';
    } else {
        let getData = new FormData(document.forms.registerForm);
        let request = new XMLHttpRequest();
        request.open("POST", "php/regValidation.php", true);
        request.send(getData);

        request.onload = function() {
            switch (request.response.substr(-3)) {
                case '402':
                    document.getElementById('email-input').style.borderColor = 'red';
                    document.getElementById('email-input').style.borderWidth = '1.5px';
                    document.getElementById('false-email-msg').style.color = 'red';
                    document.getElementById('false-email-msg').innerHTML = 'Email already existed';
                    break;

                default :
                    document.getElementById('email-input').style.borderColor = 'green';
                    document.getElementById('email-input').style.borderWidth = '1.5px';
                    document.getElementById('false-email-msg').innerHTML = '';
                    break;
            }
        };
    }
}

function phoneValidate() {
    let phone = document.getElementById('phone-input').value;

    if (phone.length < 9 || phone.length > 12) {
        document.getElementById('phone-input').style.borderColor = 'red';
        document.getElementById('phone-input').style.borderWidth = '1.5px';
        document.getElementById('false-phone-msg').style.color = 'red';
        document.getElementById('false-phone-msg').innerHTML = 'Phone number must be between 9-12 numbers';
    } else if (!Number(phone)) {
        document.getElementById('phone-input').style.borderColor = 'red';
        document.getElementById('phone-input').style.borderWidth = '1.5px';
        document.getElementById('false-phone-msg').style.color = 'red';
        document.getElementById('false-phone-msg').innerHTML = 'Phone number can only contain numbers';
    } else {
        let getData = new FormData(document.forms.registerForm);
        let request = new XMLHttpRequest();
        request.open("POST", "php/regValidation.php", true);
        request.send(getData);

        request.onload = function() {
            switch (request.response.substr(-3)) {
                case '403':
                    document.getElementById('phone-input').style.borderColor = 'red';
                    document.getElementById('phone-input').style.borderWidth = '1.5px';
                    document.getElementById('false-phone-msg').style.color = 'red';
                    document.getElementById('false-phone-msg').innerHTML = 'Phone number already existed';
                    break;

                default :
                    document.getElementById('phone-input').style.borderColor = 'green';
                    document.getElementById('phone-input').style.borderWidth = '1.5px';
                    document.getElementById('false-phone-msg').innerHTML = '';
                    break;
            }
        };
    }
}

function passValidate() {
    let pass = document.getElementById('password').value;

    if (pass.length < 6 || pass.length > 16) {
        document.getElementById('password').style.borderColor = 'red';
        document.getElementById('password').style.borderWidth = '1.5px';
        document.getElementById('false-password-msg').style.color = 'red';
        document.getElementById('false-password-msg').innerHTML = 'Password must be between 6-12 in length';
    } else {
        document.getElementById('password').style.borderColor = '#ccc';
        document.getElementById('password').style.borderWidth = '1px';
        document.getElementById('false-password-msg').innerHTML = '';
    }

    if (document.getElementById('password').value == document.getElementById('confirm-password').value) {
        document.getElementById('confirm-password').style.borderColor = 'green';
        document.getElementById('confirm-password').style.borderWidth = '1.5px';
    }
    else {
        document.getElementById('confirm-password').style.borderColor = 'red';
        document.getElementById('confirm-password').style.borderWidth = '1.5px';
    }
}

function accountNumberValidate() {
    let account = document.getElementById('accountNumber-input').value;

    if (account.length != 10) {
        document.getElementById('accountNumber-input').style.borderColor = 'red';
        document.getElementById('accountNumber-input').style.borderWidth = '1.5px';
        document.getElementById('false-accountNumber-msg').style.color = 'red';
        document.getElementById('false-accountNumber-msg').innerHTML = 'Account number must be 10 numbers long';
    } else if (!Number(account)) {
        document.getElementById('accountNumber-input').style.borderWidth = '1.5px';
        document.getElementById('accountNumber-input').style.borderColor = 'red';
        document.getElementById('false-accountNumber-msg').style.color = 'red';
        document.getElementById('false-accountNumber-msg').innerHTML = 'Account number can only contain numbers';
    } else {
        document.getElementById('accountNumber-input').style.borderColor = '#ccc';
        document.getElementById('accountNumber-input').style.borderWidth = '1px';
        document.getElementById('false-accountNumber-msg').innerHTML = '';
    }
}

function getFileName() {
    let filename = document.getElementById('browser-button').files[0].name;
    document.getElementById('profile-picture-name').value = filename;
}

function register(e) {
    let getData = new FormData(document.forms.registerForm);
    let request = new XMLHttpRequest();
    request.open("POST", "php/register.php", true);
    request.send(getData);

    request.onload = function() {
        switch (request.response.substr(-3)) {
            case '200':
                let registerRequest = new XMLHttpRequest();
                registerRequest.open("POST", "http://3.85.125.42:8080/web_service_bank_pro/services/Register?wsdl", true);
                registerRequest.setRequestHeader('Content-Type', 'text/xml;charset=utf-8');

                let accountNumber = document.getElementById('accountNumber-input').value;
                let customerName = document.getElementById('username-input').value;

                let xml =
                    `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services/">
                        <soapenv:Header/>
                        <soapenv:Body>
                            <ser:Register>
                                <account>` + accountNumber + `</account>
                                <name>` + customerName + `</name>
                            </ser:Register>
                        </soapenv:Body>
                    </soapenv:Envelope>`;

                registerRequest.send(xml);

                registerRequest.onload = function () {
                    let parser = new DOMParser();
                    let xmlResponse = parser.parseFromString(registerRequest.response, "text/xml");
                    let resultResponse = xmlResponse.getElementsByTagName("return")[0].innerHTML;

                    if (resultResponse === "200") {
                        window.location.replace('login.html');
                    }
                };

                break;

            case '201':
                document.getElementById('error-msg').style.color = 'red';
                document.getElementById('error-msg').innerHTML = 'Registration failed';
                break;

            case '301':
                document.getElementById('error-msg').style.color = 'red';
                document.getElementById('error-msg').innerHTML = 'Invalid username';
                break;

            case '302':
                document.getElementById('error-msg').style.color = 'red';
                document.getElementById('error-msg').innerHTML = 'Invalid phone number';
                break;

            case '303':
                document.getElementById('error-msg').style.color = 'red';
                document.getElementById('error-msg').innerHTML = 'Profile picture must not be be empty';
                break;

            case '304':
                document.getElementById('error-msg').style.color = 'red';
                document.getElementById('error-msg').innerHTML = 'File must not be more than 2 MB';
                break;

            case '305':
                document.getElementById('error-msg').style.color = 'red';
                document.getElementById('error-msg').innerHTML = 'Invalid file type';
                break;

            case '305':
                document.getElementById('error-msg').style.color = 'red';
                document.getElementById('error-msg').innerHTML = 'Invalid account number';
                break;

            case '501':
                document.getElementById('error-msg').style.color = 'red';
                document.getElementById('error-msg').innerHTML = 'Failed to upload profile picture';
                break;
        }
    };

    e.preventDefault();
}

document.getElementById('registerForm').addEventListener('submit', register);
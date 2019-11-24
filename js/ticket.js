function convertDateToFormat(e) {
    let day = e.split(' ')[1];
    let month = e.split(' ')[0];
    let year = e.split(' ')[2];

    switch (month) {
        case "January":
            month = '01';
            break;
        case "February":
            month = '02';
            break;
        case "March":
            month = '03';
            break;
        case "April":
            month = '04';
            break;
        case "May":
            month = '05';
            break;
        case "June":
            month = '06';
            break;
        case "July":
            month = '07';
            break;
        case "August":
            month = '08';
            break;
        case "September":
            month = '09';
            break;
        case "October":
            month = '10';
            break;
        case "November":
            month = '11';
            break;
        case "December":
            month = '12';
            break;
    }

    histDate = year + '-' + month + '-' + day;
    return histDate;
}

function renderTicketInfoContainer(movieID, e, movieDate, movieTime) {
    let ticketInfoContainer = document.getElementsByClassName('ticket-info-container')[0];

    let backIconContainer = document.createElement('div');
    backIconContainer.className = 'back-icon';

    let backIcon = document.createElement('img');
    let link = "location.href = 'detail.html?movie=" + movieID + "'";
    backIcon.src = "assets/back_icon.png";
    backIcon.setAttribute("onclick", link);

    backIconContainer.appendChild(backIcon);

    let ticketInfo = document.createElement('div');
    ticketInfo.className = 'ticket-info';

    let title = document.createElement('label');
    title.id = 'title';
    let original_title = document.createElement('label');
    original_title.id = 'original_title';

    if (e['title'] != e['original_title']) {
        title.innerHTML = e['title'];
        original_title.innerHTML = e['original_title'];
    }
    else {
        title.innerHTML = e['title'];
    }

    let date = document.createElement('label');
    date.id = 'schedule';
    date.innerHTML = movieDate + ' - ' + movieTime;

    ticketInfo.appendChild(title);
    ticketInfo.appendChild(original_title);
    ticketInfo.appendChild(date);

    let errorMsg = document.createElement('span');
    errorMsg.id = 'false-username-msg';
    errorMsg.className = 'input-message';

    ticketInfoContainer.appendChild(backIconContainer);
    ticketInfoContainer.appendChild(ticketInfo);
    ticketInfoContainer.appendChild(errorMsg);
}

function renderSeatSummary(e, movieDate, movieTime, seatNum, date) {
    let seatSummary = document.createElement('span');
    seatSummary.id = 'seat-summary';

    let title = document.createElement('span');
    title.id = 'summary-title';
    let original_title = document.createElement('span');
    original_title.id = 'summary-original_title';

    if (e['title'] != e['original_title']) {
        title.innerHTML = e['title'];
        original_title.innerHTML = e['original_title'];
    }
    else {
        title.innerHTML = e['title'];
    }

    let schedule = document.createElement('span');
    schedule.id = 'summary-schedule';
    schedule.innerHTML = movieDate + ' - ' + movieTime;

    let summarySeat = document.createElement('div');
    summarySeat.className = 'summary-seat';

    let seatText = document.createElement('span');
    seatText.id = 'seat-text';
    seatText.innerHTML = 'Seat';

    let numberText = document.createElement('span');
    numberText.id = 'number-text';
    numberText.innerHTML = '#' + seatNum;

    let priceText = document.createElement('span');
    priceText.id = 'price-text';

    if (date.getDay() == 0 || date.getDay() == 6) {
        priceText.innerHTML = 'Rp 50.000';
        document.getElementById('price-saved').value = 50000;
    } else if (date.getDay() == 5) {
        priceText.innerHTML = 'Rp 45.000';
        document.getElementById('price-saved').value = 45000;
    } else if (date.getDay() == 1) {
        priceText.innerHTML = 'Rp 35.000';
        document.getElementById('price-saved').value = 35000;
    } else {
        priceText.innerHTML = 'Rp 40.000';
        document.getElementById('price-saved').value = 40000;
    }

    summarySeat.appendChild(seatText);
    summarySeat.appendChild(numberText);
    summarySeat.appendChild(priceText);

    let summaryButton = document.createElement('div');
    summaryButton.className = 'summary-button';

    let buyButton = document.createElement('button');
    buyButton.id = 'buy-button';
    buyButton.setAttribute('onclick', 'payment()');
    buyButton.innerHTML = 'Buy Ticket';

    summaryButton.appendChild(buyButton);

    seatSummary.appendChild(title);
    seatSummary.appendChild(original_title);
    seatSummary.appendChild(schedule);
    seatSummary.appendChild(summarySeat);
    seatSummary.appendChild(summaryButton);

    return seatSummary;
}

function getSeatInfo() {
    let url = new URL(window.location.href);
    let movieID = new URLSearchParams(url.search).get("movie");
    let date = new URLSearchParams(url.search).get("date");
    let histDate = convertDateToFormat(date);
    let histTime = new URLSearchParams(url.search).get("time");

    let request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(request.responseText);

            if (response["status"] == 200) {
                let values = response.values;

                for (i = 0; i < values.length; i++) {
                    let seatID = "seat-" + values[i].seatNumber;
                    document.getElementById(seatID).setAttribute("value", 0);
                    document.getElementById(seatID).style.backgroundColor = '#cccccc';
                    document.getElementById(seatID).style.borderColor = '#8f8f8f';
                    document.getElementById(seatID).style.color = '#8f8f8f';
                }
            }
        }
    };

    request.open("GET", "http://18.207.202.246:3500/web_service_transactions/movie_id/" + movieID + "/date/" + histDate + "/time/" + histTime, false);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send();
}

function getMovie() {
    let url = new URL(window.location.href);
    let id = new URLSearchParams(url.search).get("movie");
    let date = new URLSearchParams(url.search).get("date");
    let time = new URLSearchParams(url.search).get("time");

    let data = "{}";

    let request = new XMLHttpRequest();
    request.withCredentials = false;

    request.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            let movie = JSON.parse(this.responseText);
            renderTicketInfoContainer(id, movie, date, time);
        }
    });

    request.open("GET", "https://api.themoviedb.org/3/movie/" + id + "?api_key=94f5e95d77b0120aa05ca9c7fdeb1df6");
    request.send(data);
}

function select(e) {
    if (document.getElementById("seat-saved").getAttribute("value") != 0) {
        let seatBefore = "seat-" + document.getElementById("seat-saved").value;
        document.getElementById(seatBefore).style.backgroundColor = 'white';
        document.getElementById(seatBefore).style.borderColor = '#12abde';
        document.getElementById(seatBefore).style.color = '#12abde';
    }

    if (e.getAttribute('value') == 1) {
        let url = new URL(window.location.href);
        let id = new URLSearchParams(url.search).get("movie");
        let scheduleDate = new URLSearchParams(url.search).get("date");
        let release_date = convertDateToFormat(scheduleDate).split('-');
        let date = new Date(release_date[0], release_date[1] - 1, release_date[2]);
        let time = new URLSearchParams(url.search).get("time");

        let seat = e.innerHTML;
        document.getElementById('seat-saved').value = seat;

        let seatID = "seat-" + seat;
        document.getElementById(seatID).value = 0;
        document.getElementById(seatID).style.backgroundColor = '#cccccc';
        document.getElementById(seatID).style.borderColor = '#8f8f8f';
        document.getElementById(seatID).style.color = '#8f8f8f';

        document.getElementById('seat-not-selected').style.display = 'none';
        document.getElementById('seat-selected').style.display = 'default';

        let data = "{}";

        let request = new XMLHttpRequest();
        request.withCredentials = false;

        request.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                let movie = JSON.parse(this.responseText);
                document.getElementById('seat-selected').replaceChild(renderSeatSummary(movie, scheduleDate, time, seat, date), document.getElementById('seat-summary'));
            }
        });

        request.open("GET", "https://api.themoviedb.org/3/movie/" + id + "?api_key=94f5e95d77b0120aa05ca9c7fdeb1df6");
        request.send(data);
    }
}

function payment() {
    let url = new URL(window.location.href);
    let movieID = new URLSearchParams(url.search).get("movie");
    let date = new URLSearchParams(url.search).get("date");
    let histDate = convertDateToFormat(date);
    let histTime = new URLSearchParams(url.search).get("time");
    let seat = document.getElementById('seat-saved').value;
    let price = document.getElementById('price-saved').value;

    let request = new XMLHttpRequest();
    request.open("POST", "php/user.php", true);
    request.send();

    request.onload = function () {
        let response = JSON.parse(request.response);
        let accountNumber = response.accountNumber;

        let virtualAccountRequest = new XMLHttpRequest;
        virtualAccountRequest.open("POST", "http://18.207.202.246:8080/web_service_bank_pro/services/GetVirtualNumber?wsdl", true);
        virtualAccountRequest.setRequestHeader('Content-Type', 'text/xml;charset=utf-8');

        let xml =
            `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services/">
                        <soapenv:Header/>
                        <soapenv:Body>
                            <ser:GetVirtualNumber>
                                <senderAccount>` + accountNumber + `</senderAccount>
                                <receiverAccount>1234567890</receiverAccount>
                            </ser:GetVirtualNumber>
                        </soapenv:Body>
                        </soapenv:Envelope>`;

        virtualAccountRequest.send(xml);

        virtualAccountRequest.onload = function () {
            let parser = new DOMParser();
            let xmlResponse = parser.parseFromString(virtualAccountRequest.response, "text/xml");
            let status = xmlResponse.getElementsByTagName("status")[0].innerHTML;

            if (status === "200") {
                let virtualNumber = xmlResponse.getElementsByTagName("virtualNumber")[0].innerHTML;
                let data = {
                    'user_id': response.userID,
                    'account_number': accountNumber,
                    'virtual_number': virtualNumber,
                    'movie_id': movieID,
                    'date': histDate,
                    'time': histTime,
                    'seat': seat,
                    'price': price,
                    'status': "Pending"
                };

                let xhr1 = new XMLHttpRequest();

                xhr1.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        let response = JSON.parse(xhr1.responseText);

                        if (response["status"] == 200) {
                            let transactionID = response.values.insertId;
                            let startTime = new Date().getTime();
                            let seatID = "seat-" + data.seat;
                            countdown(transactionID, startTime);

                            document.getElementById(seatID).setAttribute("value", 0);
                            document.getElementById(seatID).style.backgroundColor = '#cccccc';
                            document.getElementById(seatID).style.borderColor = '#8f8f8f';
                            document.getElementById(seatID).style.color = '#8f8f8f';
                            document.getElementById('virtual-account').innerHTML = virtualNumber;
                            document.getElementById('payment-modal').style.display = 'block';
                        } else {
                            document.getElementById('status').innerHTML = 'Booking failed!';
                            document.getElementById('status').style.color = "red";
                            document.getElementById('thanks').innerHTML = 'Please try again.';
                            document.getElementById('status-button').style.display = 'none';
                            document.getElementById('status-modal').style.display = 'block';
                        }
                    }
                };

                xhr1.open("POST", "http://18.207.202.246:3500/web_service_transactions", true);
                xhr1.setRequestHeader("Access-Control-Allow-Headers", "*");
                xhr1.setRequestHeader("Access-Control-Allow-Origin", "*");
                xhr1.setRequestHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
                xhr1.setRequestHeader("Content-type", "application/json");
                xhr1.send(JSON.stringify(data));
            }
        };
    };
}

function countdown(transactionID, startTime) {
    let endTime = new Date(startTime + 2 * 60000).getTime();

    let x = setInterval(function() {
        let now = new Date().getTime();
        let time = endTime - now;

        let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((time % (1000 * 60)) / 1000);

        document.getElementById('timer').innerHTML = ("0" + minutes).slice(-2) + ":" + ("0" + seconds).slice(-2);

        if (time <= 30000) {
            document.getElementById('timer').style.color = "red";
        }

        if (time < 0) {
            document.getElementById('timer').innerHTML = "00:00";
            clearInterval(x);
            closePayment(transactionID, startTime);
        }
    }, 1000);
}

function closePayment(transactionID, startTime) {
    let url = new URL(window.location.href);
    let movieID = new URLSearchParams(url.search).get("movie");
    let date = new URLSearchParams(url.search).get("date");
    let histDate = convertDateToFormat(date);
    let histTime = new URLSearchParams(url.search).get("time");
    let seat = document.getElementById('seat-saved').value;
    let price = document.getElementById('price-saved').value;
    let endTime = new Date(startTime + 2 * 60000).getTime();

    let request = new XMLHttpRequest();
    request.open("POST", "php/user.php", true);
    request.send();

    request.onload = function () {
        let response = JSON.parse(request.response);
        let accountNumber = response.accountNumber;
        let data = {
            'user_id': response.userID,
            'account_number': accountNumber,
            'movie_id': movieID,
            'date': histDate,
            'time': histTime,
            'seat': seat,
            'price': price
        };

        let checkTransactionRequest = new XMLHttpRequest;
        checkTransactionRequest.open("POST", "http://18.207.202.246:8080/web_service_bank_pro/services/CheckTransactions?wsdl", true);
        checkTransactionRequest.setRequestHeader('Content-Type', 'text/xml;charset=utf-8');

        let xml =
            `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services/">
                <soapenv:Header/>
                <soapenv:Body>
                    <ser:CheckTransactions>
                        <account>1234567890</account>
                        <type>kredit</type>
                        <amount>` + data.price + `</amount>
                        <startTime>` + startTime + `</startTime>
                        <endTime>` + endTime + `</endTime>
                    </ser:CheckTransactions>
                </soapenv:Body>
            </soapenv:Envelope>`;

        checkTransactionRequest.send(xml);

        checkTransactionRequest.onload = function () {
            let parser = new DOMParser();
            let xmlResponse = parser.parseFromString(checkTransactionRequest.response, "text/xml");
            let status = xmlResponse.getElementsByTagName("status")[0].innerHTML;

            if (status == 200) {
                transactionsFound(xmlResponse, accountNumber, transactionID, startTime);
            } else {
                transactionsNotFound(transactionID);
            }
        };
    };
}

function transactionsFound(response, accountNumber, transactionID, startTime) {
    let transactionTime = response.getElementsByTagName("transactionTime");
    let targetAccount = response.getElementsByTagName("targetAccount");
    let params = {
        'transaction_id': transactionID,
        'status': "Success"
    };
    let found = false;

    for (i = 0; i < targetAccount.length; i++) {
        if (targetAccount[i].innerHTML == accountNumber) {
            let time = new Date(transactionTime[i].innerHTML).getTime();

            if (time - startTime <= 120000) {
                found = true;

                let xhr = new XMLHttpRequest();

                xhr.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        document.getElementById('payment-modal').style.display = 'none';
                        document.getElementById('status').innerHTML = 'Payment Success!';
                        document.getElementById('thanks').innerHTML = 'Thank you for purchasing! You can view your purchase now.';
                        document.getElementById('status-button').style.display = 'block';
                        document.getElementById('status-modal').style.display = 'block';
                    }
                };

                xhr.open("PUT", "http://18.207.202.246:3500/web_service_transactions", true);
                xhr.setRequestHeader("Access-Control-Allow-Headers", "*");
                xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
                xhr.setRequestHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
                xhr.setRequestHeader("Content-type", "application/json");
                xhr.send(JSON.stringify(params));
            }
        }
    }

    if (!found) {
        transactionsNotFound(transactionID);
    }
}

function transactionsNotFound(transactionID) {
    let params = {
        'transaction_id': transactionID,
        'status': "Cancelled"
    };

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById('payment-modal').style.display = 'none';
            document.getElementById('status').innerHTML = 'Booking failed!';
            document.getElementById('status').style.color = "red";
            document.getElementById('thanks').innerHTML = 'Please try again.';
            document.getElementById('status-button').style.display = 'none';
            document.getElementById('status-modal').style.display = 'block';
        }
    };

    xhr.open("PUT", "http://18.207.202.246:3500/web_service_transactions", true);
    xhr.setRequestHeader("Access-Control-Allow-Headers", "*");
    xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhr.setRequestHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(params));
}

function closeStatus() {
    document.getElementById('status-modal').style.display = 'none';
}

function goToTransaction() {
    window.location.replace('transactions.html');
}

let paymentModal = document.getElementById('payment-modal');
let statusModal = document.getElementById('status-modal');

window.onclick = function(event) {
    if (event.target == statusModal) {
        statusModal.style.display = "none";
    }

    if (event.target == paymentModal) {
        paymentModal.style.display = "none";
    }
};
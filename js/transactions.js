function convertDate(e) {
    let tempDate = e.split('-');
    let month = tempDate[1];
    let day = tempDate[2];
    let year = tempDate[0];

    switch (month) {
        case '01':
            month = 'January';
            break;
        case '02':
            month = 'February';
            break;
        case '03':
            month = 'March';
            break;
        case '04':
            month = 'April';
            break;
        case '05':
            month = 'May';
            break;
        case '06':
            month = 'June';
            break;
        case '07':
            month = 'July';
            break;
        case '08':
            month = 'August';
            break;
        case '09':
            month = 'September';
            break;
        case '10':
            month = 'October';
            break;
        case '11':
            month = 'November';
            break;
        case '12':
            month = 'December';
            break;
    }

    if (day[0] == '0') {
        day = day.substr(-1);
    }

    let date = month + " " + day + " " + year;
    return date;
}

function renderGridItem(e, f) {
    let gridItem = document.createElement('div');
    gridItem.className = 'grid-item';

    let posterContent = document.createElement('div');
    posterContent.className = 'grid-content';

    let poster = document.createElement('div');
    poster.className = 'poster';

    let posterImage = document.createElement('img');

    if (f['poster_path'] == null) {
        posterImage.src = "assets/no_image.png";
        posterImage.style.height = "180px";
    } else {
        posterImage.src = "https://image.tmdb.org/t/p/w300_and_h450_bestv2" + f['poster_path'];
    }

    poster.appendChild(posterImage);
    posterContent.appendChild(poster);

    let infoContent = document.createElement('div');
    infoContent.className = 'grid-content';

    let title = document.createElement('label');
    title.className = 'title';
    let original_title = document.createElement('label');
    original_title.className = 'original_title';

    if (f['title'] != f['original_title']) {
        title.innerHTML = f['title'];
        original_title.innerHTML = f['original_title'];
    }
    else {
        title.innerHTML = f['title'];
    }

    let detailContent = document.createElement('div');
    detailContent.className = 'grid-info';

    let historyLeft = document.createElement('div');
    historyLeft.className = 'history-left';

    let schedule = document.createElement('div');
    schedule.className = 'schedule';

    let scheduleText = document.createElement('div');
    scheduleText.id = 'schedule-text';
    scheduleText.innerHTML = 'Schedule:';

    let scheduleTime = document.createElement('div');
    scheduleTime.id = 'schedule-time';
    let d = new Date(e.historyDate);
    historyDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    scheduleTime.innerHTML = convertDate(historyDate) + ' - ' + e.historyTime;

    schedule.appendChild(scheduleText);
    schedule.appendChild(scheduleTime);

    historyLeft.appendChild(schedule);

    if (e.userRate != null) {
        let userRating = document.createElement('div');
        userRating.className = 'user-rating';

        let ratingText = document.createElement('div');
        ratingText.id = 'rating-text';
        ratingText.innerHTML = 'Rating:';

        let ratingValueContainer = document.createElement('div');
        ratingValueContainer.id = 'rating-value-container';

        ratingValueContainer.innerHTML = e.userRate;

        let outTen = document.createElement('span');
        outTen.id = 'rating-out-10';
        outTen.innerHTML = ' /10';

        ratingValueContainer.appendChild(outTen);

        userRating.appendChild(ratingText);
        userRating.appendChild(ratingValueContainer);

        historyLeft.appendChild(userRating);
    }

    if (e.userReview != null) {
        let userReview = document.createElement('div');
        userReview.className = 'user-review';

        let reviewText = document.createElement('div');
        reviewText.id = 'review-text';
        reviewText.innerHTML = 'Review:';

        let userReviewContainer = document.createElement('div');
        userReviewContainer.id = 'user-review-container';

        let userReviewContent = document.createElement('div');
        userReviewContent.id = 'user-review-content';
        userReviewContent.innerHTML = e.userReview;

        userReviewContainer.appendChild(userReviewContent);

        userReview.appendChild(reviewText);
        userReview.appendChild(userReviewContainer);

        historyLeft.appendChild(userReview);
    }

    let historyRight = document.createElement('div');
    historyRight.className = 'history-right';

    let transactionID = document.createElement('input');
    transactionID.type = 'hidden';
    transactionID.id = 'transaction-id';
    transactionID.name = 'transaction-id';
    transactionID.value = e.transactionID;

    let transaction = document.createElement('div');
    transaction.className = 'transaction';

    let status = document.createElement('div');
    status.className = 'status';

    let transactionStatusText = document.createElement('span');
    transactionStatusText.id = 'transaction-status-text';
    transactionStatusText.innerHTML = 'Status: ';

    let transactionStatus = document.createElement('span');
    transactionStatus.id = 'transaction-status';
    transactionStatus.innerHTML = e.status;

    if (e.status === "Success") {
        transactionStatus.setAttribute('style', 'color: rgb(0,193,236)');
    } else if (e.status === "Cancelled") {
        transactionStatus.setAttribute('style', 'color: #ee2424');
    } else if (e.status === "Pending") {
        transactionStatus.setAttribute('style', 'color: #9a9a9a');
    }

    status.appendChild(transactionStatusText);
    status.appendChild(transactionStatus);

    let price = document.createElement('div');
    price.className = 'price';

    let priceText = document.createElement('span');
    priceText.id = 'price-text';
    priceText.innerHTML = 'Price:';

    let priceAmount = document.createElement('span');
    priceAmount.id = 'price-amount';
    priceAmount.innerHTML = e.price;

    price.appendChild(priceText);
    price.appendChild(priceAmount);

    let account = document.createElement('div');
    account.className = 'account';

    let virtualAccountText = document.createElement('span');
    virtualAccountText.id = 'virtual-account-text';
    virtualAccountText.innerHTML = 'Virtual Account:';

    let virtualAccount = document.createElement('span');
    virtualAccount.id = 'virtual-account';
    virtualAccount.innerHTML = e.virtualNumber;

    account.appendChild(virtualAccountText);
    account.appendChild(virtualAccount);

    transaction.appendChild(status);
    transaction.appendChild(price);
    transaction.appendChild(account);

    let reviewButton = document.createElement('div');
    reviewButton.className = 'review-button';

    let deleteReview = document.createElement('button');
    deleteReview.className = 'delete-review';
    deleteReview.innerHTML = 'Delete Review';
    deleteReview.setAttribute('onclick', 'delReview(this)');

    let editReview = document.createElement('button');
    editReview.className = 'edit-review';
    editReview.innerHTML = 'Edit Review';
    editReview.setAttribute('onclick', 'changeReview(this)');

    let addReview = document.createElement('button');
    addReview.className = 'add-review';
    addReview.innerHTML = 'Add Review';
    addReview.setAttribute('onclick', 'changeReview(this)');

    let date = historyDate + ' ' + e.historyTime + ':00';
    let showDate = new Date(date);
    let today = new Date();
    let temp = today.getFullYear() + '-' + (today.getMonth() + 1) +
        '-' + today.getDate() + ' ' + today.getHours() + ":" + today.getMinutes();
    let todayDate = new Date(temp);

    console.log("todayDate :", todayDate);
    console.log("showDate :", showDate);

    if (e.userReview == null) {
        addReview.setAttribute('style', 'display: default;');
        addReview.setAttribute('style', 'background-color: #12abde;');
        addReview.setAttribute('style', 'background-color: #12abde;');
        deleteReview.setAttribute('style', 'display: none;');
        editReview.setAttribute('style', 'display: none;');
    } else {
        addReview.setAttribute('style', 'display: none;');
        deleteReview.setAttribute('style', 'display: default;');
        deleteReview.setAttribute('style', 'background-color: #e31212;');
        editReview.setAttribute('style', 'display: default;');
        editReview.setAttribute('style', 'background-color: #35b056;');
    }

    if (e.status === "Pending" || e.status === "Cancelled" || todayDate < showDate) {
        addReview.setAttribute('style', 'display: none;');
        deleteReview.setAttribute('style', 'display: none;');
        editReview.setAttribute('style', 'display: none;');
    }

    reviewButton.appendChild(deleteReview);
    reviewButton.appendChild(editReview);
    reviewButton.appendChild(addReview);

    historyRight.appendChild(transaction);
    historyRight.appendChild(reviewButton);
    historyRight.appendChild(transactionID);

    detailContent.appendChild(historyLeft);
    detailContent.appendChild(historyRight);

    infoContent.appendChild(title);
    infoContent.appendChild(original_title);
    infoContent.appendChild(detailContent);

    gridItem.appendChild(posterContent);
    gridItem.appendChild(infoContent);

    return gridItem;
}

function renderHistory(e) {
    let response = e;
    let gridContainer = document.getElementsByClassName('grid-container')[0];

    if (e.status === "Pending") {
        let data = "{}";

        let xhr = new XMLHttpRequest();
        xhr.withCredentials = false;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                let movie = JSON.parse(this.responseText);
                gridContainer.appendChild(renderGridItem(response, movie));
            }
        });

        xhr.open("GET", "https://api.themoviedb.org/3/movie/" + e.movieID + "?api_key=94f5e95d77b0120aa05ca9c7fdeb1df6");

        xhr.send(data);
    }

    if (e.status === "Success") {
        let data = "{}";

        let xhr = new XMLHttpRequest();
        xhr.withCredentials = false;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                let movie = JSON.parse(this.responseText);
                gridContainer.appendChild(renderGridItem(response, movie));
            }
        });

        xhr.open("GET", "https://api.themoviedb.org/3/movie/" + e.movieID + "?api_key=94f5e95d77b0120aa05ca9c7fdeb1df6");

        xhr.send(data);
    }

    if (e.status === "Cancelled") {
        let data = "{}";

        let xhr = new XMLHttpRequest();
        xhr.withCredentials = false;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                let movie = JSON.parse(this.responseText);
                gridContainer.appendChild(renderGridItem(response, movie));
            }
        });

        xhr.open("GET", "https://api.themoviedb.org/3/movie/" + e.movieID + "?api_key=94f5e95d77b0120aa05ca9c7fdeb1df6");

        xhr.send(data);
    }
}

function checkTransactionsStatus(e) {
    let sort = [];

    for (i = 0; i < e.length; i++) {
        sort[sort.length] = "Pending";
    }

    for (j = 0; j < e.length; j++) {
        sort[sort.length] = "Success";
    }

    for (k = 0; k < e.length; k++) {
        sort[sort.length] = "Cancelled";
    }

    let valuesList = e;
    let res =[];

    for (l = 0; l < e.length; l++) {
        let values = e[l];
        let transactionID = e[l].transactionID;
        let price = e[l].price;
        let time = e[l].bookTime;
        let startTime = new Date(time).getTime();
        let endTime = new Date(startTime + 2 * 60000).getTime();

        let request = new XMLHttpRequest();
        request.open("POST", "php/user.php", true);
        request.send();

        request.onload = function () {
            let response = JSON.parse(request.response);
            let accountNumber = response.accountNumber;
            let checkTransactionRequest = new XMLHttpRequest;
            checkTransactionRequest.open("POST", "http://3.85.125.42:8080/web_service_bank_pro/services/CheckTransactions?wsdl", true);
            checkTransactionRequest.setRequestHeader('Content-Type', 'text/xml;charset=utf-8');

            let xml =
                `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services/">
                    <soapenv:Header/>
                    <soapenv:Body>
                        <ser:CheckTransactions>
                            <account>1234567890</account>
                            <type>kredit</type>
                            <amount>` + price + `</amount>
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
                    transactionsFound(xmlResponse, accountNumber, transactionID, startTime, values);
                } else {
                    transactionsNotFound(transactionID, startTime, values);
                }
            };
        };
    }

    sort.forEach(function(key) {
        let found = false;

        valuesList = valuesList.filter(function (value) {
            if (!found && value.status == key) {
                res.push(value);
                found = true;
                return false;
            } else {
                return true;
            }
        });
    });

    res.forEach(function(item) {
        renderHistory(item);
    });
}

function transactionsFound(response, accountNumber, transactionID, startTime, e) {
    let transactionTime = response.getElementsByTagName("transactionTime");
    let targetAccount = response.getElementsByTagName("targetAccount");
    let values = e;
    let params = {
        'transaction_id': transactionID,
        'status': "Success"
    };
    let found = false;

    for (i = 0; i < targetAccount.length; i++) {
        if (targetAccount[i].innerHTML == accountNumber) {
            let endTime = new Date(transactionTime[i].innerHTML).getTime();

            if (endTime - startTime <= 120000) {
                e.status = "Success";
                found = true;

                let xhr = new XMLHttpRequest();

                xhr.open("PUT", "http://3.85.125.42:3500/web_service_transactions", true);
                xhr.setRequestHeader("Access-Control-Allow-Headers", "*");
                xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
                xhr.setRequestHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
                xhr.setRequestHeader("Content-type", "application/json");
                xhr.send(JSON.stringify(params));
            }
        }
    }

    if (!found) {
        transactionsNotFound(transactionID, startTime, values);
    }
}

function transactionsNotFound(transactionID, startTime, e) {
    let endTime = new Date().getTime();
    let params = {
        'transaction_id': transactionID,
        'status': "Cancelled"
    };

    if (endTime - startTime > 120000) {
        e.status = "Cancelled";
        let xhr = new XMLHttpRequest();

        xhr.open("PUT", "http://3.85.125.42:3500/web_service_transactions", true);
        xhr.setRequestHeader("Access-Control-Allow-Headers", "*");
        xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
        xhr.setRequestHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(JSON.stringify(params));
    }
}

function getHistory() {
    let request = new XMLHttpRequest();
    request.open("POST", "php/user.php", true);
    request.send();

    request.onload = function () {
        let response = JSON.parse(request.response);
        let userID = response.userID;

        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let response = JSON.parse(xhr.responseText);

                if (response["status"] == 200) {
                    let values = response.values;
                    checkTransactionsStatus(values);
                }
            }
        };

        xhr.open("GET", "http://3.85.125.42:3500/web_service_transactions/user_id/" + userID, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send();
    };
}

function delReview(e) {
    let parent = e.parentNode.parentNode;
    let transactionID = parent.lastElementChild.value;

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(xhr.responseText);

            if (response["status"] == 200) {
                document.getElementById('text1').innerHTML = 'Review Deleted';
                document.getElementById('modal').style.display = 'block';
            } else {
                document.getElementById('text1').innerHTML = 'Failed to delete review';
                document.getElementById('text1').style.color = 'red';
                document.getElementById('text2').innerHTML = 'Please try again';
                document.getElementById('modal').style.display = 'block';
            }
        }
    };

    xhr.open("DELETE", "http://3.85.125.42:3500/web_service_transactions/transaction_id/" + transactionID, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send();
}

function changeReview(e) {
    let parent = e.parentNode.parentNode;
    let transactionID = parent.lastElementChild.value;
    let params = "id=" + transactionID;

    window.location.replace("review.html" + "?" + params);
}

let modal = document.getElementById('modal');

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
        location.reload();
    }
};
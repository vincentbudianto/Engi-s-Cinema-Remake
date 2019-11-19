function getRatingReview() {
    let url = new URL(window.location.href);
    let transaction_id = new URLSearchParams(url.search).get("id");

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(xhr.responseText)

            if (response["status"] == 200) {
                let values = response.values[0];
                let data = {};

                let request = new XMLHttpRequest();
                request.withCredentials = false;

                request.addEventListener("readystatechange", function () {
                    if (this.readyState === this.DONE) {
                        let movie = JSON.parse(this.responseText);

                        if (movie['title'] != movie['original_title']) {
                            document.getElementById('title').innerHTML = movie['title'];
                            document.getElementById('original_title').innerHTML = movie['original_title'];
                        }
                        else {
                            document.getElementById('title').innerHTML = movie['title'];
                        }


                        if (values.userRate != null) {
                            document.getElementById('rating-star').value = values.userRate;
                        }

                        if (values.userReview != null) {
                            document.getElementById('review-input').value = values.userReview;
                            document.getElementById('user-review-content').value = values.userReview;
                        }

                        reset();
                    }
                });

                request.open("GET", "https://api.themoviedb.org/3/movie/" + values.movieID + "?api_key=94f5e95d77b0120aa05ca9c7fdeb1df6");

                request.send(data);
            }
        }
    }

    xhr.open("GET", "http://localhost:3500/web_service_transactions/transaction_id/" + transaction_id, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send();
}

function changeImage(e) {
    let num = e.getAttribute('num');

    for (i = 0; i <= num; i++) {
        if (document.getElementById('star' + i).src.includes("star_icon.png")) {
        }
        else {
            document.getElementById('star' + i).src = "assets/star_icon_test.png";
        }
    }

    for (j = 9; j > num; j--) {
        document.getElementById('star' + j).src = "assets/star_icon_grey.png";
    }

    e.addEventListener('mouseout', reset)
}

function reset() {
    let num = document.getElementById('rating-star').value;

    for (i = 0; i <= num; i++) {
        document.getElementById('star' + i).src = "assets/star_icon.png";
    }

    for (j = 9; j >= num; j--) {
        document.getElementById('star' + j).src = "assets/star_icon_grey.png";
    }

    document.getElementById('user-review-content').value = document.getElementById('review-input').value;
}

function setRating(e) {
    let num = e.getAttribute('num');
    let ratingSrc = document.getElementById('star' + num).src;
    let ratingValue = Number(document.getElementById('rating-star').value);

    if (ratingSrc.includes("star_icon.png") && ((Number(num) + 1) == ratingValue)) {
        for (i = 0; i <= 9; i++) {
            document.getElementById('star' + i).src = "assets/star_icon_grey.png";
        }

        document.getElementById('rating-star').value = 0;
    } else {
        for (i = 0; i <= num; i++) {
            document.getElementById('star' + i).src = "assets/star_icon.png";
        }

        document.getElementById('rating-star').value = Number(num) + 1;
    }

    document.getElementById('user-review-content').value = document.getElementById('review-input').value;
}

function setReview() {
    document.getElementById('review-input').value = document.getElementById('user-review-content').value;
}

function addReview(e) {
    let url = new URL(window.location.href);
    let transaction_id = new URLSearchParams(url.search).get("id");

    let data = {
        'rating': document.getElementById('rating-star').value,
        'review': document.getElementById('review-input').value
    };

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(xhr.responseText);

            if (response["status"] == 200) {
                document.getElementById('success-modal').style.display = 'block';
            } else {
                document.getElementById('failed-modal').style.display = 'block';
            }
        }
    }

    xhr.open("PUT", "http://localhost:3500/web_service_transactions/transaction_id/" + transaction_id, false);
    xhr.setRequestHeader("Access-Control-Allow-Headers", "*");
    xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhr.setRequestHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(data));
}

function closeStatus() {
    document.getElementById('status-modal').style.display = 'none';
}

let successModal = document.getElementById('success-modal');
let failedModal = document.getElementById('failed-modal');

window.onclick = function (event) {
    if (event.target == successModal) {
        successModal.style.display = "none";
        window.location.replace('transactions.html');
    }

    if (event.target == failedModal) {
        failedModal.style.display = "none";
    }
}
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

function renderTop(e, rating) {
    let itemTop = document.getElementsByClassName("grid-item-top")[0];;

    let poster = document.createElement('div');
    poster.className = 'poster';

    let posterImage = document.createElement('img');

    if (e['poster_path'] == null) {
        posterImage.src = "assets/no_image.png";
    } else {
        posterImage.src = "https://image.tmdb.org/t/p/w300_and_h450_bestv2" + e['poster_path'];
    }

    poster.appendChild(posterImage);
    itemTop.appendChild(poster);

    let movieInfo = document.createElement('div');
    movieInfo.className = 'movie-info';

    let title = document.createElement('label');
    title.className = 'title';
    let original_title = document.createElement('label');
    original_title.className = 'original_title';

    if (e['title'] != e['original_title']) {
        title.innerHTML = e['title'];
        original_title.innerHTML = e['original_title'];
    }
    else {
        title.innerHTML = e['title'];
    }

    let genreDuration = document.createElement('label');
    genreDuration.className = 'genre-duration';

    if (typeof e['genres'] != "undefined" && e['genres'] != null && e['genres'].length != null && e['genres'].length > 0) {
        let genre = e['genres'][0]['name'];

        for (i = 1; i < e['genres'].length; i++) {
            genre += ", " + e['genres'][i]['name'];
        }

        genreDuration.innerHTML = genre;
    }

    let separator = document.createElement('label');

    let duration = document.createElement('label');
    duration.className = 'duration';

    if (e['runtime'] != null) {
        separator.innerHTML = ' | ';
        duration.innerHTML = e['runtime'] + ' mins';
    }

    genreDuration.appendChild(separator);
    genreDuration.appendChild(duration);

    let release = document.createElement('label');
    release.className = 'release';
    release.innerHTML = 'Release date: ';

    let date = document.createElement('span');
    date.className = 'date';

    if (e['release_date'] != "") {
        date.innerHTML = convertDate(e['release_date']);
    } else {
        date.innerHTML = "-";
    }
    release.appendChild(date);

    let ratingContainer = document.createElement('div');
    ratingContainer.className = 'rating-container';

    let starIconIMDB = document.createElement('img');
    starIconIMDB.src = "assets/star_icon.png";

    let imdbRating = document.createElement('label');
    imdbRating.className = 'rating';
    imdbRating.innerHTML = e['vote_average'] + " ";

    let outTenIMDB = document.createElement('span');
    outTenIMDB.className = 'out-ten';
    outTenIMDB.innerHTML = '/10 (IMBD Rating)';

    let starIconUser = document.createElement('img');
    starIconUser.src = "assets/star_icon.png";

    let userRating = document.createElement('label');
    userRating.className = 'rating';
    userRating.innerHTML = rating + " ";

    let outTenUser = document.createElement('span');
    outTenUser.className = 'out-ten';
    outTenUser.innerHTML = '/10 (User Rating)';

    imdbRating.appendChild(outTenIMDB);
    userRating.appendChild(outTenUser);
    ratingContainer.appendChild(starIconIMDB);
    ratingContainer.appendChild(imdbRating);
    ratingContainer.appendChild(starIconUser);
    ratingContainer.appendChild(userRating);

    let descContainer = document.createElement('div');
    descContainer.className = 'desc-container';

    let desc = document.createElement('p');
    desc.className = 'desc';
    desc.innerHTML = e['overview'];

    descContainer.appendChild(desc);

    movieInfo.appendChild(title);
    movieInfo.appendChild(original_title);
    movieInfo.appendChild(genreDuration);
    movieInfo.appendChild(release);
    movieInfo.appendChild(ratingContainer);
    movieInfo.appendChild(descContainer);

    itemTop.appendChild(movieInfo);
}

function renderScheduleItemContent(eDate, eTime, eSeat) {
    let scheduleItemContent = document.createElement('div');
    scheduleItemContent.className = 'schedule-item-content';

    let year = eDate.getFullYear();
    let month = ("0" + Number(eDate.getMonth() + 1)).slice(-2);
    let day = ("0" + eDate.getDate()).slice(-2);

    let date = document.createElement('div');
    date.className = 'schedule-item-date';
    date.innerHTML = convertDate([year, month, day].join('-'));

    let time = document.createElement('div');
    time.className = 'schedule-item-time';
    time.innerHTML = eTime;

    let seats = document.createElement('div');
    seats.className = 'schedule-item-seats';

    let seatsAvailable = document.createElement('span');
    seatsAvailable.className = 'seats-available';
    seatsAvailable.innerHTML = eSeat + ' seats';

    seats.appendChild(seatsAvailable);

    let status = document.createElement('div');
    status.className = 'schedule-item-status';

    let scheduleTime = eTime.split(':');
    let hour = scheduleTime[0];
    let minute = scheduleTime[1];

    let scheduleDate = new Date(eDate.getFullYear(), eDate.getMonth(), eDate.getDate(), hour, minute);
    let currDate = new Date();

    let available = document.createElement('label');
    available.className = 'available';
    if (scheduleDate >= currDate) {
        available.setAttribute('style', 'color: #12abde;');
        available.innerHTML = 'Book Now';
        status.setAttribute('onclick', 'book(this)');
    } else {
        available.setAttribute('style', 'color: #e31212;');
        available.innerHTML = 'Not Available';
    }

    let availableIcon = document.createElement('img');
    availableIcon.className = 'available-icon';
    if (scheduleDate >= currDate) {
        availableIcon.src = 'assets/next_icon.png';
    } else {
        availableIcon.src = 'assets/unavailable_icon.png';
    }

    status.appendChild(available);
    status.appendChild(availableIcon);

    scheduleItemContent.appendChild(date);
    scheduleItemContent.appendChild(time);
    scheduleItemContent.appendChild(seats);
    scheduleItemContent.appendChild(status);

    return scheduleItemContent;
}

function renderScheduleItem(eDate, eID) {
    let timeList1 = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
    let timeList2 = ["10:00", "13:00"];
    let scheduleItem = document.createElement('div');
    scheduleItem.className = 'schedule-item';

    for (i = 0; i < 5; i++) {
        let valid = false;
        let year = eDate.getFullYear();
        let month = ("0" + Number(eDate.getMonth() + 1)).slice(-2);
        let day = ("0" + eDate.getDate()).slice(-2);
        let histDate = [year, month, day].join('-');

        for (j = 0; j < timeList1.length; j++) {
            if (Number(eID + month + j) % Number(day) == 0) {
                valid = true;
                let time = timeList1[j];
                let xhr = new XMLHttpRequest();

                xhr.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        let response = JSON.parse(xhr.responseText);

                        if (response["status"] == 200) {
                            let values = response.values;
                            scheduleItem.append(renderScheduleItemContent(eDate, time, 40 - values.length));
                        }
                    }
                };

                xhr.open("GET", "http://localhost:3500/web_service_transactions/movie_id/" + eID + "/date/" + histDate + "/time/" + timeList1[j], false);
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhr.send();
            }
        }

        if (!valid) {
            for (k = 0; k < timeList2.length; k++) {
                let request = new XMLHttpRequest();

                request.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        let response = JSON.parse(request.responseText);

                        if (response["status"] == 200) {
                            let values = response.values;
                            scheduleItem.append(renderScheduleItemContent(eDate, timeList2[k], 40 - values.length));
                        }
                    }
                };

                request.open("GET", "http://localhost:3500/web_service_transactions/movie_id/" + eID + "/date/" + histDate + "/time/" + timeList2[k], false);
                request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                request.send();
            }
        }

        eDate.setDate(eDate.getDate() + 1);
    }

    return scheduleItem;
}

function renderScheduleContainer(eDate, eID) {
    let scheduleContainer = document.getElementsByClassName('schedule-container')[0];

    let schedule = document.createElement('div');
    schedule.className = 'schedule';

    let bottomTitle = document.createElement('label');
    bottomTitle.className = 'bottom-title';
    bottomTitle.innerHTML = 'Schedules';

    let scheduleContent = document.createElement('div');
    scheduleContent.className = 'schedule-content';

    let scheduleItemHeader = document.createElement('div');
    scheduleItemHeader.className = 'schedule-item-header';

    let date = document.createElement('div');
    date.className = 'schedule-title';
    date.innerHTML = 'Date';

    let time = document.createElement('div');
    time.className = 'schedule-title';
    time.innerHTML = 'Time';

    let seats = document.createElement('div');
    seats.className = 'schedule-title';
    seats.innerHTML = 'Available Seats';

    scheduleItemHeader.appendChild(date);
    scheduleItemHeader.appendChild(time);
    scheduleItemHeader.appendChild(seats);

    scheduleContent.appendChild(scheduleItemHeader);

    if (!isNaN(eDate.getTime())) {
        for (i = 0; i < 5; i++) {
            scheduleContent.appendChild(renderScheduleItem(eDate, eID));

        }
    }

    schedule.appendChild(bottomTitle);
    schedule.appendChild(scheduleContent);

    scheduleContainer.appendChild(schedule);
}

function renderReviewItem(e, f) {
    let reviewItem = document.createElement('div');
    reviewItem.className = 'review-item';

    let profile = document.createElement('div');
    profile.className ='profile';

    let profilePic = document.createElement('img');
    profilePic.className = 'profile-pic';
    profilePic.src = f.profilePicture;

    profile.appendChild(profilePic);

    let userReview = document.createElement('div');
    userReview.className = 'user-review';

    let uname = document.createElement('label');
    uname.className = 'uname';
    uname.innerHTML = f.username;

    let userRating = document.createElement('div');
    userRating.className = 'user-rating';

    let starIcon = document.createElement('img');
    starIcon.className = 'rating-star';
    starIcon.src = 'assets/star_icon.png';

    let ratingValueContainer = document.createElement('label');
    ratingValueContainer.className = 'rating-value-container';

    if (e.userRate != null) {
        ratingValueContainer.innerHTML = e.userRate;
    } else {
        ratingValueContainer.innerHTML = "0";
    }

    let outTen = document.createElement('span');
    outTen.className = 'rating-out-10';
    outTen.innerHTML = ' /10';

    ratingValueContainer.appendChild(outTen);

    userRating.appendChild(starIcon);
    userRating.appendChild(ratingValueContainer);

    let userReviewContainer = document.createElement('div');
    userReviewContainer.className = 'user-review-container';

    let userReviewContent = document.createElement('p');
    userReviewContent.className = 'user-review-content';
    userReviewContent.innerHTML = e.userReview;

    userReviewContainer.appendChild(userReviewContent);

    userReview.appendChild(uname);
    userReview.appendChild(userRating);
    userReview.appendChild(userReviewContainer);

    reviewItem.appendChild(profile);
    reviewItem.appendChild(userReview);

    return reviewItem;
}

function renderReviewContent(e) {
    let reviewContent = document.createElement('div');
    reviewContent.className = 'review-content';

    for (i = 0; i < e.length; i++) {
        let value = e[i];
        let params = "id=" + value.userID;
        let request = new XMLHttpRequest();
        request.open("GET", "php/userInfo.php" + "?" + params, true);
        request.send();

        request.onload = function () {
            if (value.userReview != null) {
                let user = JSON.parse(request.responseText);
                reviewContent.append(renderReviewItem(value, user));
            }
        };
    }

    return reviewContent;
}

function renderReviewContainer(e) {
    let reviewContainer = document.getElementsByClassName('review-container')[0];

    let review = document.createElement('div');
    review.className = 'review';

    let bottomTitle = document.createElement('label');
    bottomTitle.className = 'bottom-title';
    bottomTitle.innerHTML = 'Review';

    review.appendChild(bottomTitle);
    review.appendChild(e);

    reviewContainer.appendChild(review);
}

function renderPage(e) {
    let request1 = new XMLHttpRequest();

    request1.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(request1.responseText);

            if (response["status"] == 200) {
                let values = response.values;
                let sumRate = 0;
                let rating = 0;
                let count = 0;

                if (values.length > 0) {
                    for (i = 0; i < values.length; i++) {
                        if (values[i].userRate != null) {
                            sumRate += Number(values[i].userRate);
                            count++;
                        }
                    }

                    rating = sumRate / count;
                }

                renderTop(e, rating.toFixed(1));

                let release_date = e['release_date'].split('-');
                let date = new Date(release_date[0], release_date[1] - 1, release_date[2]);
                renderScheduleContainer(date, e['id']);

                let reviewContent = renderReviewContent(values);
                renderReviewContainer(reviewContent);
            }
        }
    };

    request1.open("GET", "http://localhost:3500/web_service_transactions/movie_id/" + e["id"], true);
    request1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request1.send();
}

function getMovie() {
    let url = new URL(window.location.href);
    let id = new URLSearchParams(url.search).get("movie");

    let data = "{}";

    let xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            let movie = JSON.parse(this.responseText);
            renderPage(movie);
        }
    });

    xhr.open("GET", "https://api.themoviedb.org/3/movie/" + id + "?api_key=94f5e95d77b0120aa05ca9c7fdeb1df6");

    xhr.send(data);
}

function book(e) {
    let url = new URL(window.location.href);
    let id = new URLSearchParams(url.search).get("movie");

    let parent = e.parentNode;
    children = parent.children;

    let date = children[0].innerHTML;
    let time = children[1].innerHTML;
    let seats = children[2].firstElementChild.innerHTML.split(" ")[0];
    let params = "movie=" + id + "&date=" + date + "&time=" + time + "&seats=" + seats;

    window.location.replace('ticket.html' + "?" + params);
}
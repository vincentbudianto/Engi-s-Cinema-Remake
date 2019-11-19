function getUsername() {
    let request = new XMLHttpRequest();
    request.open("POST", "php/user.php", true);
    request.send();

    request.onload = function() {
        let username = JSON.parse(request.responseText).username;
        document.getElementById('username').innerHTML = username;
    }
}

function getMovies() {
    let data = "{}";

    let xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            let data = JSON.parse(this.responseText);

            lastPage = data['total_pages'];

            for (i = 1; i <= lastPage; i++) {
                getData(i)
            }
        }
    });

    xhr.open("GET", "https://api.themoviedb.org/3/movie/now_playing?api_key=94f5e95d77b0120aa05ca9c7fdeb1df6");

    xhr.send(data);
}

function getData(page) {
    const today = new Date();
    let data = "{}";

    let xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            let movies = JSON.parse(this.responseText);

            for (i = 0; i < movies['results'].length; i++) {
                const date = new Date(movies['results'][i]['release_date']);
                const diffTime = Math.abs(today - date);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                if (diffDays <= 7) {
                    renderMovies(movies['results'][i]);
                }
            }
        }
    });

    xhr.open("GET", "https://api.themoviedb.org/3/movie/now_playing?page=" + page + "&api_key=94f5e95d77b0120aa05ca9c7fdeb1df6");

    xhr.send(data);
}

function renderMovies(e) {
    let container = document.getElementsByClassName("grid-container")[0];

    let item = document.createElement('div');
    item.className = 'grid-item';
    item.setAttribute('onclick', 'viewDetail(this)');

    let contentPoster = document.createElement('div');
    contentPoster.className = 'grid-content';

    let poster = document.createElement('div');
    poster.className = 'poster';

    let posterImage = document.createElement('img');

    if (e['poster_path'] == null) {
        posterImage.src = "assets/no_image.png";
    } else {
        posterImage.src = "https://image.tmdb.org/t/p/w300_and_h450_bestv2" + e['poster_path'];
    }

    poster.appendChild(posterImage);
    contentPoster.appendChild(poster);
    item.appendChild(contentPoster);

    let contentInfo = document.createElement('div');
    contentInfo.className = 'grid-content';

    let title = document.createElement('div');
    title.className = 'title';
    title.innerHTML = e['title'];

    let rating = document.createElement('div');
    rating.className = 'rating';

    let starIcon = document.createElement('img');
    starIcon.src = "assets/star_icon.png";

    let ratingValue = document.createElement('span');
    ratingValue.className = 'rating-value';
    ratingValue.innerHTML = e['vote_average'];

    rating.appendChild(starIcon);
    rating.appendChild(ratingValue);
    contentInfo.appendChild(title);
    contentInfo.appendChild(rating);

    item.appendChild(contentInfo);

    let target = document.createElement('input');
    target.type = 'hidden';
    target.className = 'target-movie';
    target.name = 'target-movie';
    target.value = e['id'];

    item.appendChild(target);
    container.appendChild(item);
}
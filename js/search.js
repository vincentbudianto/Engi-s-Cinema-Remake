function changeBackButton(e) {
    if (e == 0) {
        document.getElementById('back-button').style.color = '#a6a6a6';
        document.getElementById('back-button').style.borderColor = '#a6a6a6';
        document.getElementById('back-button').disabled = true;
    } else {
        document.getElementById('back-button').style.color = '#12abde';
        document.getElementById('back-button').style.borderColor = '#12abde';
        document.getElementById('back-button').disabled = false;
    }
}

function changeNextButton(e) {
    if (e == 0) {
        document.getElementById('next-button').style.color = '#a6a6a6';
        document.getElementById('next-button').style.borderColor = '#a6a6a6';
        document.getElementById('next-button').disabled = true;
    } else {
        document.getElementById('next-button').style.color = '#12abde';
        document.getElementById('next-button').style.borderColor = '#12abde';
        document.getElementById('next-button').disabled = false;
    }
}

function changePage(e) {
    let url = new URL(window.location.href);
    let input = new URLSearchParams(url.search).get("search");
    let currentPage = new URLSearchParams(url.search).get("page");

    if (currentPage == null) {
        currentPage = 1;
    }

    let destinationPage = e.getAttribute('num');

    if (currentPage != destinationPage) {
        if (destinationPage == 1) {
            changeBackButton(0);
        } else {
            changeBackButton(1);
        }

        let pages = document.getElementsByClassName('page-button');
        let totalPages = pages.length;
        for (i = 0; i < totalPages; i++) {
            pages[i].style.color = '#12abde';
            pages[i].style.borderColor = '#12abde';
        }

        if (destinationPage == totalPages) {
            changeNextButton(0);
        } else {
            changeNextButton(1);
        }

        let params1 = "search=" + input;
        let params2 = "page=" + destinationPage;
        window.location.replace('search.html' + "?" + params1 + "&" + params2);
    }
}

function onePage(e) {
    let url = new URL(window.location.href);
    let input = new URLSearchParams(url.search).get("search");
    let currentPage = new URLSearchParams(url.search).get("page");

    if (currentPage == null) {
        currentPage = 1;
    }

    let destinationPage = parseInt(currentPage, 10) + parseInt(e, 10);

    if (currentPage != destinationPage) {
        if (destinationPage == 1) {
            changeBackButton(0);
        } else {
            changeBackButton(1);
        }

        let pages = document.getElementsByClassName('page-button');
        let totalPages = pages.length;
        for (i = 0; i < totalPages; i++) {
            pages[i].style.color = '#12abde';
            pages[i].style.borderColor = '#12abde';
        }

        if (destinationPage == totalPages) {
            changeNextButton(0);
        } else {
            changeNextButton(1);
        }

        let params1 = "search=" + input;
        let params2 = "page=" + destinationPage;
        window.location.replace('search.html' + "?" + params1 + "&" + params2);
    }
}

function getSearchResult() {
    let url = new URL(window.location.href);
    let input = new URLSearchParams(url.search).get("search");
    let page = new URLSearchParams(url.search).get("page");

    if (page == null) {
        page = 1;
    }

    let data = "{}";

    let xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            getData(this.responseText, input);
        }
    });

    xhr.open("GET", "https://api.themoviedb.org/3/search/movie?page=" + page + "&query=" + input + "&api_key=94f5e95d77b0120aa05ca9c7fdeb1df6");

    xhr.send(data);
}

function getData(response, input) {
    let data = JSON.parse(response);

    document.getElementById("search-key").innerHTML = input;
    document.getElementById("search-result").innerHTML = data['results'].length;

    lastPage = data['total_pages'];

    if (data['page'] != lastPage) {
        for (i = 0; i < 20; i++) {
            renderMovies(data['results'][i]);
        }
    } else {
        for (i = 0; i < data['results'].length; i++) {
            renderMovies(data['results'][i]);
        }
    }

    renderPage(lastPage);

    document.getElementsByClassName('page-button')[data['page'] - 1].style.color = '#a6a6a6';
    document.getElementsByClassName('page-button')[data['page'] - 1].style.borderColor = '#a6a6a6';

    if (data['page'] == 1) {
        changeBackButton(0);
    } else {
        changeBackButton(1);
    }

    if (data['page'] == lastPage) {
        changeNextButton(0);
    } else {
        changeNextButton(1);
    }
}

function renderMovies(e) {
    let container = document.getElementsByClassName("grid-container")[0];

    let item = document.createElement('div');
    item.className = 'grid-item';

    let poster = document.createElement('div');
    poster.className = 'poster';

    let posterImage = document.createElement('img');
    posterImage.className = 'posterImage';

    if (e['poster_path'] == null) {
        posterImage.src = "assets/no_image.png";
        posterImage.style.height = "200px";
        posterImage.style.width = "133.33px";
    } else {
        posterImage.src = "https://image.tmdb.org/t/p/w300_and_h450_bestv2" + e['poster_path'];
    }

    posterImage.setAttribute('onclick', 'viewDetail2(this)');

    poster.appendChild(posterImage);
    item.appendChild(poster);

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

    title.setAttribute('onclick', 'viewDetail2(this)');

    let rating = document.createElement('div');
    rating.className = 'rating-container';

    let starIcon = document.createElement('img');
    starIcon.src = "assets/star_icon.png";

    let ratingValue = document.createElement('label');
    ratingValue.className = 'rating';
    ratingValue.innerHTML = e['vote_average'];

    rating.appendChild(starIcon);
    rating.appendChild(ratingValue);
    movieInfo.appendChild(title);
    movieInfo.appendChild(original_title);
    movieInfo.appendChild(rating);

    let description = document.createElement('div');
    description.className = 'desc-container';

    let desc = document.createElement('p');
    desc.className = 'desc';
    desc.innerHTML = e['overview'];

    description.appendChild(desc);
    movieInfo.appendChild(description);

    item.appendChild(movieInfo);

    let detail = document.createElement('div');
    detail.className = 'detail-container';
    detail.setAttribute('onclick', 'viewDetail1(this)');

    let view = document.createElement('label');
    view.className = 'view';
    view.innerHTML = 'View details';

    let detailIcon = document.createElement('img');
    detailIcon.className = 'detail-icon';
    detailIcon.src = "assets/next_icon.png";

    detail.appendChild(view);
    detail.appendChild(detailIcon);

    item.appendChild(detail);

    let target = document.createElement('input');
    target.type = 'hidden';
    target.className = 'target-movie';
    target.name = 'target-movie';
    target.value = e['id'];

    item.appendChild(target);
    container.appendChild(item);
}

function renderPage(last) {
    let container = document.getElementsByClassName("grid-container")[0];

    let item = document.createElement('div');
    item.className = 'page-number';

    let back = document.createElement('button');
    back.id = 'back-button';
    back.setAttribute('onclick', 'onePage(-1)');
    back.innerHTML = 'Back';

    item.appendChild(back);

    let firstPage = document.createElement('button');
    firstPage.className = 'page-button';
    firstPage.setAttribute('num', 1);
    firstPage.innerHTML = '1';
    firstPage.setAttribute('onclick', 'changePage(this)');

    item.appendChild(firstPage);

    let pages = document.createElement('span');
    pages.id = 'next-page';

    for (i = 2; i <= last; i++) {
        let page = document.createElement('button');
        page.className = 'page-button';
        page.setAttribute('num', i);
        page.innerHTML = i;
        page.setAttribute('onclick', 'changePage(this)');

        item.appendChild(page);
    }

    item.appendChild(pages);

    let next = document.createElement('button');
    next.id = 'next-button';
    next.setAttribute('onclick', 'onePage(1)');
    next.innerHTML = 'Next';

    item.appendChild(next);
    container.appendChild(item);
}
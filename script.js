const key = "33638059-daea2b56f228f384f5026eaa4";

let pictureList = document.querySelector('#picture')
let footerButtons = document.querySelector('#footerButtons')
const previous = document.querySelector('#previous');
const next = document.querySelector('#next');
let pictureCounter = 0;
let page = 1;

let response;
let json;
let hits;
let searchInput;
let search;
let colorInput;

async function searchPictures() {
    page = 1;
    searchInput = document.querySelector('#searchInput').value;
    search = searchInput.replace(/\s/g, '+');
    console.log('input text: ' + search);

    colorInput = document.querySelector('#colorList').value;
    if (colorInput == 'any color') {
        colorInput = '';
    }
    console.log(colorInput);

    nextPictures();
}

function previousPage() {
    page--;
    nextPictures();
}

async function nextPage() {

    page++;
    nextPictures();
}

async function nextPictures() {
    response = await fetch('https://pixabay.com/api/?key='
        + key + '&per_page=10&page=' + page +
        '&q=' + search +
        '&colors=' + colorInput
    );

    json = await response.json();

    hits = json.hits;

    var child = pictureList.firstElementChild;
    if (child != null) {

        while (child) {
            pictureList.removeChild(child);
            child = pictureList.lastElementChild;
        }
    }

    try {
        for (let i = 0; i < 10; i++) {

            let li = document.createElement('li');
            let img = document.createElement('img');
            img.src = hits[i].largeImageURL;
            img.alt = 'picture not found';
            li.appendChild(img);

            let span = document.createElement('span');
            span.innerText = hits[i].tags;
            li.appendChild(span);

            let p = document.createElement('p');
            p.innerText = 'Taken by: ' + hits[i].user;
            li.appendChild(p);

            pictureList.insertBefore(li, pictureList.firstChild);
        }
    }
    catch {
    }
    console.log(hits);
    console.log(json.totalHits);

    footerButtons.style.display = 'block';

    if (json.totalHits / 10 > page) {
        next.disabled = false;
    }
    else {
        next.disabled = true;
    }

    if (page == 1) {
        previous.disabled = true
    }
    else {
        previous.disabled = false;
    }
}


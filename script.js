const key = "33638059-daea2b56f228f384f5026eaa4";

let pictureList = document.querySelector('#picture')
let footerButtons = document.querySelector('#footerButtons')
let previous = document.querySelector('#previous');
let next = document.querySelector('#next');
let pictureCounter = 0;
let page = 1;

let response;
let json;
let hits;
let searchInput;
let search;
let colorInput;

async function getPictures() {
    page = 1;
    searchInput = document.querySelector('#searchInput').value;
    search = searchInput.replace(/\s/g, '+');
    console.log('input text: ' + search);

    colorInput = document.querySelector('#colorList').value;
    if (colorInput == 'any color') {
        colorInput = '';
    }
    console.log(colorInput);

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

            pictureList.insertAdjacentHTML('afterbegin', '<li><img src="' + hits[i].largeImageURL + '" alt="picture not found"> <span>' + hits[i].tags + '</span> <p>Taken by: ' + hits[i].user + '</p></li>');
        }
    }
    catch {
    }
    console.log(hits);
    console.log(json.totalHits);

    footerButtons.style.display = 'block';

    if(json.totalHits/10>= page){
        next.style.backgroundColor = '';
    }
    else{
        next.style.backgroundColor = 'gray';
    }


    if (page == 1) {
        previous.style.backgroundColor = 'gray';
    }
    else {
        previous.style.backgroundColor = '';
    }
}

function previousPage() {
    if (page == 1) {

    }
    else {
        var child = pictureList.firstElementChild;

        while (child) {
            pictureList.removeChild(child);
            child = pictureList.lastElementChild;
        }
        page--;
        nextPictures();
    }
}

async function nextPage() {
    if(json.totalHits/10 >= page){
        var child = pictureList.firstElementChild;
        
        while (child) {
            pictureList.removeChild(child);
            child = pictureList.lastElementChild;
        }
        page++;
        nextPictures();
    }
    else{
        
    }
}

async function nextPictures() {
    response = await fetch('https://pixabay.com/api/?key='
        + key + '&per_page=10&page=' + page +
        '&q=' + search +
        '&colors=' + colorInput
    );

    json = await response.json();

    hits = json.hits;
    try{
        for (let i = 0; i < 10; i++) {
            
            pictureList.insertAdjacentHTML('afterbegin', '<li><img src="' + hits[i].largeImageURL + '" alt="picture not found"> <span>' + hits[i].tags + '</span> <p>Taken by: ' + hits[i].user + '</p></li>');
        }
    }
    catch{
    }

    footerButtons.style.display = 'block';

    if(json.totalHits/10>= page){
        next.style.backgroundColor = '';
    }
    else{
        next.style.backgroundColor = 'gray';
    }

    if (page == 1) {
        previous.style.backgroundColor = 'gray';
    }
    else {
        previous.style.backgroundColor = '';
    }
}
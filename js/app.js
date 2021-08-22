`use strict`;

let imagesSection = document.getElementById('images');
let img1 = document.getElementById('img1');
let img2 = document.getElementById('img2');
let img3 = document.getElementById('img3');
let list = document.getElementById('list');
let results = document.getElementById('results');
let products = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg'];
let objArray = [];
let clicks = 0;
let clicksLimit = 5;
let randomArray1 = [];
let randomArray2 = [];
let users = [];
let signup = document.getElementById('signup');
let signIn = document.getElementById('signIn');

function CreateProduct(imgname, imgSrc, shown = 0, votes = 0) {

    this.imgname = imgname;
    this.imgSrc = imgSrc;
    this.shown = shown;
    this.votes = votes;
    objArray.push(this);
}

function getData() {
    if (localStorage.data) {
        let data = JSON.parse(localStorage.data);
        for (let i = 0; i < data.length; i++) {
            new CreateProduct(data[i].imgname, data[i].imgSrc, data[i].shown, data[i].votes)
        }
    } else {
        for (let i = 0; i < products.length; i++) {
            new CreateProduct(products[i].split('.')[0], products[i])
        }
    }
    if (localStorage.userdata) {
        let data = JSON.parse(localStorage.userdata);
        for (let i = 0; i < data.length; i++) {
            new CreateUser(data[i].userName, data[i].password)
        }
    }
}
getData();

function getRandom() {
    return Math.floor(Math.random() * (products.length - 1 - 0 + 1) + 0);
}

function render() {

    randomArray1 = [];
    while (randomArray1[0] === randomArray1[1] || randomArray1[0] === randomArray1[2] || randomArray1[1] === randomArray1[2] || randomArray1.some(item => randomArray2.includes(item))) {
        randomArray1 = [getRandom(), getRandom(), getRandom()];
    }

    img1.src = './img/' + products[randomArray1[0]];
    img2.src = './img/' + products[randomArray1[1]];
    img3.src = './img/' + products[randomArray1[2]];

    objArray[randomArray1[0]].shown++;
    objArray[randomArray1[1]].shown++;
    objArray[randomArray1[2]].shown++;

    localStorage.data = JSON.stringify(objArray);
}
render();

imagesSection.addEventListener('click', clickHandler);
function clickHandler(event) {
    event.preventDefault();
    if ((event.target.id === 'img1' || event.target.id === 'img2' || event.target.id === 'img3') && clicks < clicksLimit) {
        randomArray2 = randomArray1;
        clicks++;
        if (event.target.id === 'img1') { objArray[randomArray1[0]].votes++ };
        if (event.target.id === 'img2') { objArray[randomArray1[1]].votes++ };
        if (event.target.id === 'img3') { objArray[randomArray1[2]].votes++ };
        render();
    }
}
results.addEventListener('click', resultsHandler);

function resultsHandler() {
    if (clicks === clicksLimit) {
        for (let i = 0; i < objArray.length; i++) {
            let liElement = document.createElement('li');
            list.appendChild(liElement);
            liElement.textContent = `${objArray[i].imgname} was shown ${objArray[i].shown} times, and had ${objArray[i].votes} votes`;
        }
        results.removeEventListener('click', resultsHandler);
    }
}

function CreateUser(userName, password) {
    this.userName = userName;
    this.password = password;
    users.push(this);
}

signup.addEventListener('submit', signupHandler);
function signupHandler(event) {
    event.preventDefault();
    if(event.target.userName.value && event.target.password.value){
    let userName = event.target.userName.value;
    let password = event.target.password.value;
    new CreateUser(userName, password);
    localStorage.userdata = JSON.stringify(users);
    }else {alert('please enter valid user name and password')}
}

signIn.addEventListener('submit', signInHandler);
function signInHandler(event) {
    event.preventDefault();
    let x =0;
    for (let i=0; i < users.length; i++) {
        if (event.target.userName.value === users[i].userName && event.target.password.value === users[i].password) {
            alert('you are welcome');
            x=5;
        }
    }
    if (x === 0){alert('enter valid user name and password');}
}

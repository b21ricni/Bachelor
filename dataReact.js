// ==UserScript==
// @name         BachTestReact
// @namespace    http://tampermonkey.net/
// @version      2024-04-18
// @description  try to take over the world!
// @author       You
// @match        http://localhost:3000
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @require      https://raw.githubusercontent.com/eligrey/FileSaver.js/master/dist/FileSaver.min.js
// @require      https://raw.githubusercontent.com/HGustavs/ContextFreeLib/master/js/contextfreegrammar.js
// @require      https://raw.githubusercontent.com/LenaSYS/Random-Number-Generator/master/seededrandom.js
// ==/UserScript==
const testRun= "50";

var searchWords = [];
const runs = 50; //Change to required test runs
let current = 0;
const seed = 0;

let addToCart = 0; //Change to random number?
let word = ""; //Change to random word

let numbMax = 15;
let numbMin = 7;

function reset(){
    localStorage.setItem("current", current);
}

async function runScript() {
    if (!localStorage.getItem("current")){
        localStorage.setItem("current", current);
    } else {
        current = localStorage.getItem("current");
        console.log(current);
    }

    for (let i = current; i < runs; i++) {
        current = i;
        localStorage.setItem("current", i);
        await new Promise((resolve) => {
            setTimeout(async () => {
                generateWord();

                console.log(current);

                //Start Timer
                let start = performance.timeOrigin + performance.now();

                //Navigate to Product page
                await smallDelay();
                document.getElementById("btn-prod-page").click();

                await smallDelay();

                //Call search function and press enter
                inputSearchWord();
                console.log(word);
                document.getElementById("btn-search-prodpage").click();

                await smallDelay();

                //Add to cart function
                addProd();

                await smallDelay();

                //Navigate to Cart page
                document.getElementById("btn-cart-page").click();

                await bigDelay();
                //await testDelay();

                getCart();

                await smallDelay();
                //await testDelay();

                //End Timer
                let end = performance.timeOrigin + performance.now();
                let time = end - start;

                //Save to local storage
                let keyword = {};
                keyword.word = word;
                keyword.time = time;

                //Array with words
                if (localStorage.getItem("searchWords")){
                    searchWords = JSON.parse(localStorage.getItem("searchWords"));
                }

                searchWords.push(keyword);
                console.log(searchWords);
                localStorage.setItem("searchWords", JSON.stringify(searchWords));


                //If last run than store the data
                if (i >= runs - 1) {
                    localStorage.removeItem("current");
                    saveData();
                    return ;
                }

                await bigDelay();

                window.location.href = 'http://localhost:3000'; //React

                resolve(); //Next itteration allowed to run
            }, 800); //Wait 0.5 sec before running itteration
        });
    }
}

function generateWord(){

    //Generate seed
    Math.setSeed(seed + current++);

    //Generate word
    let random = Math.round(Math.random() * verb.length);
    word = verb[random];

    console.log("Word: " + word);
}

function addProd(){
    generateNumb();
    const btnIndex = document.getElementsByClassName("btn-add-product"); //Store add btns
    console.log(btnIndex);
    for (let i = 0; i <= addToCart; i++){
        if (i < btnIndex.length){
            btnIndex[i].click();
        }
    }
}

async function getCart(){
    const cartBtnIndex = document.getElementsByClassName("btn-remove-product");
    console.log(cartBtnIndex);

    for (let i = 0; i < cartBtnIndex.length; i++){
        cartBtnIndex[i].click();
    }
}

function generateNumb(){
    //Generate seed
    Math.setSeed(seed + current++);

    //Generate price
    addToCart = Math.floor(Math.random() * (numbMax - numbMin + 1) + numbMin);

    console.log("numb: " + addToCart);
}

function inputSearchWord() {
    const input = document.getElementById("searchInput");
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
    nativeInputValueSetter.call(input, word);
    const event = new Event('input', { bubbles: true });
    input.dispatchEvent(event);
}

//To have time seeing results and if inputs act accordingly
async function testDelay() {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 0.01sec
}

async function minorDelay() {
    await new Promise((resolve) => setTimeout(resolve, 10)); // Wait for 0.01sec
}

async function smallDelay() {
    await new Promise((resolve) => setTimeout(resolve, 50)); // Wait for 0.05sec
}

async function bigDelay() {
    await new Promise((resolve) => setTimeout(resolve, 150)); // Wait for 0.2sec
}

function saveData(){
    // Write data to local textfile
    var data = JSON.stringify(searchWords, null, "\t");
    var blob = new Blob([data], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "dataReact" + testRun + ".txt");

    localStorage.setItem("searchWords", []);
    //searchWords = [];
}



window.addEventListener('load', function(){
    runScript();
    //reset();
});
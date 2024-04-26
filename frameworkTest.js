// ==UserScript==
// @name         BachTest
// @namespace    http://tampermonkey.net/
// @version      2024-04-18
// @description  try to take over the world!
// @author       You
// @match        http://localhost:4200
// @match        http://localhost:3000
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @require      https://raw.githubusercontent.com/eligrey/FileSaver.js/master/dist/FileSaver.min.js
// ==/UserScript==

var searchWords = [];
const runs = 50; //Change to required test runs
let current = 0;

let addToCart = 5; //Change to random number?
let word = "Luck"; //Change to random word

async function runScript() {
    if (!localStorage.getItem("current")){
        localStorage.setItem("current", current);
    } else {
        current = localStorage.getItem("current");
    }

    for (let i = current; i < runs; i++) {
        localStorage.setItem("current", i);
        await new Promise((resolve) => {
            setTimeout(async () => {
                //Start Timer
                let start = performance.timeOrigin + performance.now();

                //Navigate to Product page
                await smallDelay();
                document.getElementById("btn-prod-page").click();

                await smallDelay();

                //Call search function and press enter
                inputSearchWord();
                document.getElementById("btn-search-prodpage").click();

                await smallDelay();

                //Add to cart function
                addProd();

                await smallDelay();

                //Navigate to Cart page
                document.getElementById("btn-cart-page").click();

                await bigDelay();

                getCart();

                await smallDelay();

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

                //window.location.href = 'http://localhost:4200'; //Angular
                window.location.href = 'http://localhost:3000'; //React

                resolve(); //Next itteration allowed to run
            }, 500); //Wait 0.5 sec before running itteration
        });
    }
}

function addProd(){
    const btnIndex = document.getElementsByClassName("btn-add-product"); //Store add btns
    console.log(btnIndex);
    for (let i = 0; i < addToCart && i < btnIndex.length; i++){
        btnIndex[i].click();
    }
}

function getCart(){
    const cartBtnIndex = document.getElementsByClassName("btn-remove-product");
    console.log(cartBtnIndex);
    for (let i = 0; i < addToCart && i < cartBtnIndex.length; i++){
        cartBtnIndex[i].click();
    }
}

function inputSearchWord() {
    const searchInput = document.getElementById("searchInput");
    searchInput.value = word;

    const inputEvent = new Event("input", { bubbles: true });
    searchInput.dispatchEvent(inputEvent); //Required to run test on angular
}

//To have time seeing results and if inputs act accordingly
async function minorDelay() {
    await new Promise((resolve) => setTimeout(resolve, 10)); // Wait for 0.01sec
}

async function smallDelay() {
    await new Promise((resolve) => setTimeout(resolve, 50)); // Wait for 0.05sec
}

async function bigDelay() {
    await new Promise((resolve) => setTimeout(resolve, 200)); // Wait for 0.2sec
}

function saveData(){
    // Write data to local textfile
    var data = JSON.stringify(searchWords, null, "\t");
    var blob = new Blob([data], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "data.txt");

    localStorage.setItem("searchWords", []);
    //searchWords = [];
}



window.addEventListener('load', function(){
    runScript();
});
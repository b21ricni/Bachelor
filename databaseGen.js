// ==UserScript==
// @name         DataGeneration
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

//Configs
const runs = 750; //Change to required test runs
let current = 0;
const seed = 0;

//Variables
let name = "";
let description = "";
let picture = "";
let price = "";

//Price settings
const priceMax = 9999;
const priceMin = 99;

//Picture settings
const picMax = 1000;
const picMin = 1;

//Description Settings
const descriptionMax = 2; //Max sentences
const descriptionMin = 1; //Min sentences

async function runScript() {
    for (let i = current; i < runs; i++) {
        await new Promise((resolve) => {
            setTimeout(async () => {
                if (i == runs) {
                    current = 0;
                    return ;
                } else {
                    current = i;
                    generateData();

                    await smallDelay();
                    inputs();

                    await bigDelay();
                    document.getElementById("btn-add").click();
                }
                resolve(); //Next itteration allowed to run
            }, 50); //Wait 0.5 sec before running itteration
        });
    }
}

//Functions Made into one function
function generateData(){
    generateName();
    generateDescription();
    generatePrice();
    generatePicture();
}

function inputs(){
    inputPicture();
    inputName();
    inputDescription();
    inputPrice();
}

//***************************************
//***********generat functions***********
//***************************************
function generateName(){
    //Generate seed
    Math.setSeed(seed + current++);

    //Generate name
    let random = Math.round(Math.random() * verb.length);
    let nounrandom = Math.round(Math.random() * noun.length);

    name = verb[random] + " " + noun[nounrandom];

    //console.log("name: " + name);
}

function generateDescription(){
    //Generate seed
    Math.setSeed(seed + current);

    //Generate name
    description=generate_sentence(0.5,0.5,0.5,0.5,null,null,null,null,null,null,null);

    //console.log("description: " + description);
}

function generatePrice(){
    //Generate seed
    Math.setSeed(seed + current);

    //Generate price
    price = Math.floor(Math.random() * (priceMax - priceMin + 1) + priceMin);

    //console.log("price: " + price);
}

function generatePicture(){
    //Generate seed
    Math.setSeed(seed + current);

    //Generate picture
    picture = Math.floor(Math.random() * (picMax - picMin + 1) + priceMin);

    //console.log("picture: " + picture);
}

//***************************************
//************Input functions************
//***************************************
function inputName() {
    const input = document.getElementById("nameInput");
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
    nativeInputValueSetter.call(input, name);
    const event = new Event('input', { bubbles: true });
    input.dispatchEvent(event);
}

function inputDescription() {
    const input = document.getElementById("descriptionInput");
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
    nativeInputValueSetter.call(input, description);
    const event = new Event('input', { bubbles: true });
    input.dispatchEvent(event);
}

function inputPicture() {
    const input = document.getElementById("pictureInput");
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
    nativeInputValueSetter.call(input, picture);
    const event = new Event('input', { bubbles: true });
    input.dispatchEvent(event);
}

function inputPrice() {
    const input = document.getElementById("priceInput");
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
    nativeInputValueSetter.call(input, price);
    const event = new Event('input', { bubbles: true });
    input.dispatchEvent(event);
}

//***************************************
//************Delay functions************
//***************************************
async function smallDelay() {
    await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for 0.05sec
}

async function bigDelay() {
    await new Promise((resolve) => setTimeout(resolve, 200)); // Wait for 0.2sec
}

window.addEventListener('load', function(){
    runScript();
});
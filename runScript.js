// ==UserScript==
// @name         BachTest
// @namespace    http://tampermonkey.net/
// @version      2024-04-18
// @description  try to take over the world!
// @author       You
// @match        http://localhost:4200/
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @require https://raw.githubusercontent.com/eligrey/FileSaver.js/master/dist/FileSaver.min.js
// @grant        GM_addStyle
// ==/UserScript==

var searchWords = [];
var word = "Luck";
var runs = 5;

async function runScript() {
    for (let i = 0; i < runs; i++) {
        await new Promise((resolve) => {
            setTimeout(async () => {
                let start = performance.timeOrigin + performance.now();

                document.getElementById("btn-prod-page").click();

                await waitForPageLoad();

                await inputSearchWord(); // Assuming inputSearchWord is an async function
                console.log("what da heck");
                document.getElementById("btn-search-prodpage").click();

                let end = performance.timeOrigin + performance.now();
                let time = end - start;

                // Save to local storage
                let keyword = {};
                keyword.word = word;
                keyword.time = time;

                // Array with words
                searchWords.push(keyword);
                console.log(searchWords);

                if (i === runs - 1) {
                    saveData();
                }

                await waitForPageLoad();

                document.getElementById("btn-home-page").click();

                await waitForPageLoad();

                resolve(); // Resolve the promise to proceed to the next iteration
            }, 1000);
        });
    }
}

function inputSearchWord() {
    const searchInput = document.getElementById("searchInput");
    searchInput.value = word;

    const inputEvent = new Event("input", { bubbles: true });
    searchInput.dispatchEvent(inputEvent);
}

async function waitForPageLoad() {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 2 seconds
}

function saveData(){
    localStorage.setItem("wordList", JSON.stringify(searchWords));

    // Write data to local textfile
    var data = JSON.stringify(searchWords, null, "\t");
    var blob = new Blob([data], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "data.txt");

    localStorage.setItem("wordList", []);
    searchWords = [];
}

window.addEventListener('load', function(){
    runScript();
});
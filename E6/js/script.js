/****************
Exercise 6


****************/

"use strict";

//Write text in the center while the page loads.
document.write('<p id="load">LOADING...</p>');

//Each paragraph on the page.
let paragraphs = [];


//Specifies a callback function to call once the whole window has loaded (works just like p5 setup()).
window.onload = () => {

    //Remove the loading text.
    $(`#load`).remove();

    //Gets each paragraph element.
    paragraphs = $(`p`);

    //Give each paragraph a page's description.
    paragraphs.each(function() {
        getWikipedia(this);
    });
}


/**
 * Fades an element in/out by shifting their opacity value.
 * @param {HTMLElement} element - Element to fade in/out.
 * @param {Number} target - The target opacity (0 for transparent, 1 for opaque).
 */
function fade(element, target, callback = () => {}) {

    //Before doing anything, check if the opacity is the same as the target.
    //If it is, end the function immediately.
    if(element.style[`opacity`] == target) 
    { 
        //Since the function is over, call the callback.
        callback();
        return; 
    }

    //Get a number value for the opacity.
    let opacity = Number(element.style[`opacity`]);

    //Check if the opacity value must go up or down.
    let targetIsLarger = target > opacity;

    //Move the opacity value towards 'target'.
    element.style[`opacity`] = opacity + (targetIsLarger ? 0.05 : -0.05);

    //Check if the opacity value is different from the target.
    if ((targetIsLarger && element.style[`opacity`] > target) || (!targetIsLarger && element.style[`opacity`] < target)) {
        //If it has, go back to it and stop fading.
        element.style[`opacity`] = `${target}`;

        //Since the function is over, call the callback.
        callback();
    }
    //Check if the target value has been overshot.
    else {
        //If it is, then call this function again next animation frame.
        requestAnimationFrame(() => {
            fade(element, target, callback);
        });
    }
}


/**
 * Fades the element out, modifies the inner HTML value while its invisible and then displays it again.
 * @param {HTMLElement} element - HTML element to change 
 */
function alterText(element) {
    //Make the element transparency drop to 0.
    fade(element, 0, () => {

        //Fade the element back in.
        fade(element, 1);
    });
}


/**
 * Returns a random element from an array.
 * @param {Array} array - Any type of array.
 * @returns A randomly picked element from the array.
 */
 function randomElem(array) { 
    return array[Math.floor(Math.random() * array.length)]; 
}


/**
 * Assigns a random wikipedia page's summary and assigns it to an element's text.
 */
function getWikipedia(element) {

    //Mark the text as loading.
    element.innerHTML = `Loading...`;

    //Create a new XHTML request.
    let request = new XMLHttpRequest();
    //Set a GET request to the wikipedia REST API.
    request.open('GET', "https://en.wikipedia.org/api/rest_v1/page/random/summary");

    //Set a callback for once the request has loaded.
    request.onload = () => {

        //Turn the response into a js object.
        let data = JSON.parse(request.response);

        //Add a 'censor' span around a random sentence.
        let content = addCensorSpan(data.extract);

        //If adding a span was successful, display the text.
        if(content) {
            //Give the page title, id and summary (with native html tags) to the element. 
            element.innerHTML = 
            `<h4>File: ${data.title}<br/>
                ID: ${data.pageid}</h4>
                ${content}<br/>`;
        }
        //If it wasn't get a new wikipedia page.
        else {
            log('Retrying...');
            //Get a new wikipedia page summary.
            getWikipedia(element); 
        }
    }

    //Send the XHTML request to the Wikipedia servers.
    request.send();
}


/**
 * Puts a span element of class 'censor' around a sentence of the given text.
 */
function addCensorSpan(text) {
    //Find each sequence with 1 or more characters that aren't 
    //sentence enders (., !, ?) followed by a sentence ender.
    let sentences = text.match(/[^\.\!\?]+[\.\!\?]/g);
    
    //Only try to manipulate the array if it exists.
    if(sentences) {
        //Get a random index in the sentences array.
        let randIndex = Math.floor(Math.random() * sentences.length);

        //Add a span element around the selected sentence.
        sentences[randIndex] = `<span class="censor">${sentences[randIndex]}</span>`;

        //Reset the text.
        text = '';

        //Reconstruct the text by adding each sentence back.
        for(let i = 0; i < sentences.length; i++) {
            text += sentences[i];
        }

        //Return the new text.
        return text;
    }
    //If there's no sentence array, return false.
    else return false;
}


/**
 * I'm tired of having to write 'console.log' in its entirety.
 * Prints all arguments to console.
 * @param {Any} arg - Arguments to print.
 */
 function log() {
    for(var args in arguments) { 
        console.log(arguments[args]);
    }
}
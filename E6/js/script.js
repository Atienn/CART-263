/****************
Exercise 6

The web app fetches summaries from random Wikipedia and marks specific passages the user must redact.
****************/

"use strict";

//Write text in the center while the page loads.
document.write('<p id="load">LOADING...</p>');


//Specifies a callback function to call once the whole window has loaded (works just like p5 setup()).
window.onload = () => {

    //Remove the loading text.
    $(`#load`).remove();

    //Gets each paragraph element.
    let paragraphs = $(`p`);

    //Give each paragraph a page's description.
    paragraphs.each(function() {
        getWikipedia(this);
    });

    //Give instructions to the users.
    alert('You need to redact information from critical documents.');
    alert('To make it easier for you, the specific passages have already been marked.');
    alert(`Don't question the nature of the documents.`)
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
            `<h4>File: <a href=${data.content_urls.desktop.page}>${data.title}</a><br/>
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

        //Add a span element around the selected sentence along with the events needed.
        sentences[randIndex] = `<span class="censor" onmouseover="dim();" onmouseout="light()" onclick="getNewPage();">
        ${sentences[randIndex]}</span>`;

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
    else{
        return false;
    }
}

//#region EVENTS

/** Gets a new wikipedia summary to display in the parent paragraph. */
function getNewPage() {
    getWikipedia(event.target.parentElement);
}
/** Light up the span background when the mouse leaves the element. */
function light() {
    $(event.target).css('background-color', '#4f4f4f')
}
/** Dim the span background when the mouse hovers over the element. */
function dim(){
    $(event.target).css('background-color', '#404040')
}

//#endregion


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
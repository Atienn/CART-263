/****************
Exercise 5

Displays a random haiku. Individual lines can be 'rerolled' by clicking on them.
****************/

"use strict";

//Write text in the center while the page loads.
document.write('<p id="load">LOADING...</p>');

//Header at the top of the page.
let header;
//The array of lines.
let lines = [];


//Specifies a callback function to call once the whole window has loaded (works just like p5 setup()).
window.onload = () => {

    //Remove the loading text.
    document.getElementById('load').remove();


    //Create a header element with class 'text' and id 'title'.
    header = document.createElement("h2");
    header.className = "text";
    header.id = "title";

    //Initialize the opacity value (default is "").
    header.style[`opacity`] = 1;
    
    //Call the fade function if clicked on. The target value will always be set
        //to the opposite of the current one. (0 -> 1 / 1 -> 0)
    header.addEventListener("click", (event) => {
        alterText(event.target);
    });

    //Default title.
    header.innerHTML = 'The loose haiku';
    //Add the title to the document.
    document.body.append(header);


    //Create three lines, add them to the body (breaking with each new line).
    for(let i = 0; i < 3; i++) {
        //Create a new paragraph element with class 'text' and with id matching line number.
        lines[i] = document.createElement("p");
        lines[i].className = "text";
        lines[i].id = `line${i+1}`

        //Initialize the opacity value (default is "").
        lines[i].style[`opacity`] = 1;

        //Call the fade function if clicked on. The target value will always be set
        //to the opposite of the current one. (0 -> 1 / 1 -> 0)
        lines[i].addEventListener("click", (event) => {
            alterText(event.target);
        });

        //Get a random line from the text object.
        lines[i].innerHTML = randomElem(text[lines[i].id]);
        //Add the paragraph element to the body.
        document.body.append(lines[i]);
    }
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
        //When that's done, set the text of the element to a random element of the appropriate array.
        element.innerHTML = randomElem(text[element.id]);
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
 * I'm tired of having to write 'console.log' in its entirety.
 * Prints all arguments to console.
 * @param {Any} arg - Arguments to print.
 */
function log() {
    for(var args in arguments) { 
        console.log(arguments[args]);
    }
}
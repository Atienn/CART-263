/****************
Exercise 5

In development.
****************/

"use strict";

//Write text in the center while the page loads.
document.write('<p id="load">LOADING...</p>');

//The array of lines.
let lines = [];

//Specifies a callback function to call once the whole window has loaded (works just like p5 setup()).
window.onload = () => {

    //Remove the loading text.
    document.getElementById('load').remove();

    //Create three lines, add them to the body (breaking with each new line).
    for(let i = 0; i < 3; i++) {
        //Create a new paragraph element with set opacity of 1 (default is "").
        lines[i] = document.createElement("p");
        lines[i].style[`opacity`] = 1;

        //Write text.
        lines[i].innerHTML = i;

        //Call the fade function if clicked on. The target value will always be set
        //to the opposite of the current one. (0 -> 1 / 1 -> 0)
        lines[i].addEventListener("click", (event) => {
            fade(event.target, (event.target.style[`opacity`] == "1") ? 0 : 1);
        });

        //Add the paragraph element to the body.
        document.body.append(lines[i]);
    }
}

/**
 * Fades an element in/out by shifting their opacity value.
 * @param {HTMLElement} element - Element to fade in/out.
 * @param {Number} target - The target opacity (0 for transparent, 1 for opaque).
 * @param {Number} rate - (Optional) The rate at which to move the element's opacity towards 'target'.
 */
function fade(element, target, rate = 0.05) {

    //Before doing anything, check if the opacity is the same as the target.
    //If it is, end the function immediately.
    if(element.style[`opacity`] == target) { log('equals'); return; }

    //Get a number value for the opacity.
    let opacity = Number(element.style[`opacity`]);

    //Check if the opacity value must go up or down.
    let targetIsLarger = target > Number(element.style[`opacity`]);

    //Move the opacity value towards 'target'.
    element.style[`opacity`] = opacity + (targetIsLarger ? rate : -rate);

    //Check if the target value has been overshot.
    if ((targetIsLarger && opacity > target) || (!targetIsLarger && opacity < target)) {
        //If it has, go back to it and stop fading.
        element.style[`opacity`] = target.toString();
    }
    //Check if the opacity value is different from the target.
    else {
        //If it is, then call this function again next animation frame.
        requestAnimationFrame(() => {
            fade(element, target);
        });
    }
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
 * @param {Any} arg - Arguments to print.
 */
function log() {
    for(var args in arguments) { 
        console.log(arguments[args]);
    }
}
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
    document.getElementById('load').remove();


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
 * I'm tired of having to write 'console.log' in its entirety.
 * Prints all arguments to console.
 * @param {Any} arg - Arguments to print.
 */
function log() {
    for(var args in arguments) { 
        console.log(arguments[args]);
    }
}
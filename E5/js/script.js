/****************
Exercise 5

In development.
****************/

"use strict";


/**
 * Fades an element in/out by shifting their opacity value.
 * @param {HTMLElement} element - Element to fade in/out.
 * @param {Number} target - The target opacity (0 for transparent, 1 for opaque).
 * @param {Number} rate - (Optional) The rate at which to move the element's opacity towards 'target'.
 */
function fade(element, target, rate = 0.05) {

    //Check if the opacity value must go up or down.
    let targetIsLarger = element.style[`opacity`] > target;

    //Move the opacity value towards 'target'.
    element.style[`opacity`] += (targetIsLarger ? rate : -rate);

    //Check if the target value has been overshot.
    if ((targetIsLarger && element[`opacity`] >= target) || (!targetIsLarger && element[`opacity`] <= target)) {
        //If it has, go back to it and stop fading.
        element[`opacity`] = target;
    }
    //Check if the opacity value is different from the target.
    else if (element[`opacity`] != target) {
        //If it is, then call this function again next animation frame.
        requestAnimationFrame(() => {
            fade(element, opacity);
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
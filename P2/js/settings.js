"use strict";


/** Overrides current user data (if any) with an empty user list. */
function resetSettings()
{
    settings = {

        //Tracks the pixel density of the canvas.
        //Lower numbers means a blurrier image, but faster performance.
        //To avoid floating point error, we use interger numbers and divide by 10 afterwards.
        density: 0,

        //Tracks the master volume of the game.
        //To avoid floating point error, we use interger numbers and divide by 10 afterwards.
        volume: 1,

        //User input.
        input: {
            //Movement
            up: 39,         // UP ARROW
            down: 40,       // DOWN ARROW
            left: 37,       // LEFT ARROW
            right: 39,      // RIGHT ARROW

            //Actions
            jump: 32,       // SPACE
            dash: 90,       // Z
            restart: 82     // R
        }
    }

    saveSettings();
}


/**
 * 
 */
function saveSettings() {
    localStorage.setItem(`P1:Settings`, JSON.stringify(settings));
}


/**
 * 
 */
function modifyInput(action, keyCode) {
    settings.input[action] = keyCode;
}
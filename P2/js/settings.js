"use strict";

/** Overrides current user data (if any) with an empty user list. */
function resetSettings()
{
    settings = {

        //Tracks the pixel density of the canvas.
        //Lower numbers means a blurrier image, but faster performance.
        //To avoid floating point error, we use interger numbers and divide by 10 afterwards.
        density: 20,

        //Tracks the master volume of the game.
        //To avoid floating point error, we use interger numbers and divide by 10 afterwards.
        volume: 1,

        //User input.
        input: {
            //Movement
            up: 38,         // UP ARROW
            down: 40,       // DOWN ARROW
            left: 37,       // LEFT ARROW
            right: 39,      // RIGHT ARROW

            //Actions
            jump: 32,       // SPACE
            dash: 90,       // Z
            restart: 82,    // R
        },

        //Name of user input.
        inputName: {
            //Movement
            up: "ArrowUp",
            down: "ArrowDown",
            left: "ArrowLeft",
            right: "ArrowRight",

            //Actions
            jump: "Space",
            dash: "KeyZ",
            restart: "KeyR"
        }
    }

    settingsHandler.saveSettings();
}


let settingsHandler = {
    
    saveSettings() {
        localStorage.setItem(`P1:Settings`, JSON.stringify(settings));
    },

    densityUp() {
        //If the density is below 3.0, add 0.1.
        if(settings.density < 30)
        {
            //Add 1 to the density counter.
            settings.density++;
            //Apply the change, dividing by 10 to only add 0.1.
            pixelDensity(settings.density / 10);

            //Redraw the background to avoid an annoying white flash.
            background(hueChange, 100, 85);
        }
    },

    densityDown() {
        //If the density is above 0.1, subtract 0.1.
        if(settings.density > 1)
        {
            //Remove 1 from the density counter.
            settings.density--;
            //Apply the change, dividing by 10 to only remove 0.1.
            pixelDensity(settings.density / 10);

            //Redraw the background to avoid an annoying white flash.
            background(hueChange, 100, 85);
        }
    },

    volumeUp() {
        //If the volume is below 1.0, add 0.1.
        if(settings.volume < 10)
        {
            //Add 1 to the volume counter.
            settings.volume++;
            //Apply the change, dividing by 10 to only add 0.1.
            masterVolume(settings.volume / 10);
        }
    },

    volumeDown() {
        //If the volume is above 0.0, remove 0.1.
        if(settings.volume > 0)
        {
            //Remove 1 from the volume counter.
            settings.volume--;
            //Apply the change, dividing by 10 to only remove 0.1.
            masterVolume(settings.volume / 10);
        }
    },

    modifyInput(action, keyCode, keyName) {
        settings.input[action] = keyCode;
        settings.inputName[action] = keyName;
    }
}

//Callback before window unload.
//While the page is unloading (in the process of moving to a new one) the anonymous function is called.
//Saves settings browser storage (some browsers might choose not to execute this, though).
window.onbeforeunload = () => {
    //Only save settngs they aren't undefined.
    if (!(typeof settings == "undefined")) {
      saveSettings();
    }
};
/****************
CLEANER
Étienne Racine

Built off template-p5-project.
****************/
"use strict"


//HTML elements.
let sideRight;
let centerArea;
let canvas;
let output;

//
let currentTimeout = "";

//For debugging.
let currentTag; 

//Represents all of the possible image tags.
let tags;

/**
 * 
 */
 function preload() { 
    tags = loadJSON("assets/data/tags.json", () => { tags.length = Object.keys(tags).length; }); 
}

function setup()
{
    //Get the reference of HTML elements.
    centerArea = document.getElementById("center");
    sideRight = document.getElementById("right");
    output = document.getElementById("output");
    
    //Create canvas and make it fit within the center area.
    canvas = createCanvas(centerArea.clientWidth, centerArea.clientHeight);
    canvas.parent(centerArea);

    //Setup imageHandler.js
    imageSetup();
    //Setup game object.
    game.setup();

    //Only attempt to start annyang if it is present.
    if(annyang)
    {
        //Makes annyang call 'userCall' with parameter command when it recognizes speech.
        annyang.addCommands({ '*command': game.userCall });
        //Stars listening for voice input.
        annyang.start();
    }
}


 /**
 * Draws a new image onto the canvas without modifying its aspect ratio.
 * Ensures that no part of the image gets cropped.
 * @param {Image} img The image to display.
 */
function displayImage(img)
{
    //Draws a light grey background over the last canvas frame.
    background(220);

    //The following calculates which dimension of the image can be set to match the 
    //canvas' width/height without overflow (the 'limiting' dimension).

    //In both cases the image is drawn from the center, and the non-limiting dimension is scaled 
    //by the same amount the limiting one is as to conserve the image's aspect ratio.
    
    //If the width is the limiting dimension, then set it to match the canvas' (as large as possible).
    if((img.width - width) * img.height > (img.height - height) * img.width)
    { image(img, width/2, height/2, width, img.height * (width/img.width)); }
    //Otherwise, set the height to match the canvas'.
    else { image(img, width/2, height/2, img.width * (height/img.height), height); }
}


/**
 * Displays text at the bottom of the screen for a set amount of time. 
 * @param {String} text The string of text to display.
 * @param {Number} duration (Optional) The amount of time (in ms) to display for.
 */
function displayText(text, duration = 3000)
{
    //Cancel any ongoing timeout to clear the text as not to have them take action
    //on the new text we're about to write.
    clearTimeout(currentTimeout);

    //Wrtite the text at the bottom of the screen.
    output.innerHTML = text;

    //Set a timeout to clear the text and record its ID to potentially cancel it.
    currentTimeout = setTimeout(() => { output.innerHTML = ""; }, duration)
}


/**
 * Resizes the canvas and redraws its content.
 * Is called automatically when the window is resized.
 */
function windowResized()
{
    //Make the canvas match its parent width.
    resizeCanvas(centerArea.clientWidth, centerArea.clientHeight);

    //Redraw what was on canvas if an image was being displayed.
    //Doesn't work, even if it
    if(currentImage) { displayImage(currentImage); }
}
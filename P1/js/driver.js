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

function preload()
{
    imgTags = loadJSON("assets/data/tags.json", () => { imgTags.length = Object.keys(imgTags).length; });
}

function setup()
{
    //Only attempt to start annyang if it is present.
    if(annyang)
    {
        //Makes annyang call 'userCall' with parameter command when it recognizes speech.
        annyang.addCommands({ '*command': userCall });
        //Stars listening for voice input.
        annyang.start();
    }

    //Get the reference of HTML elements.
    centerArea = document.getElementById("center");
    sideRight = document.getElementById("right");
    output = document.getElementById("output");
    

    //Create canvas and make it fit within the center area.
    canvas = createCanvas(centerArea.clientWidth, centerArea.clientHeight);
    canvas.parent(centerArea);

    //Draw images from the center.
    imageMode(CENTER);
    
    //Set the text style.
    textSize(25);
    textStyle(BOLD);
    textAlign(CENTER);
    textFont('Courier New');


    //Create an html holder for the image, but prevent it from rendering.
    imgHolder = document.createElement('img');
    imgHolder.style = "visibility: hidden;"


    //Loading an image after assigning it a new source is asynchronous.
    imgHolder.onload = () => 
    {
        //Display the image on the canvas.
        currentImage = select("img");
        displayImage(currentImage);

        //Now that the image has loaded, let other requests happen.
        imgLoading = false;
    }

    //Include the image in the html body. 
    //(It doesn't matter too much where it will be, since it's invisible).
    document.body.appendChild(imgHolder);
}

/** @returns {String} A random tag from the imgTags array. */
function randomTag() { return randomElem(randomElem(imgTags)); }


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
 * Returns a random element from an array.
 * @param {Array} arr - Any type of array.
 * @returns A randomly picked element from the array.
 */
function randomElem(arr) { return arr[Math.floor(Math.random() * arr.length)]; }


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
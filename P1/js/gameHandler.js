"use strict";

let tags;
let tagsToCensor = [];
let userScore = 0;
let shouldDelete;


/**
 * 
 */
function preload() { 
    tags = loadJSON("assets/data/tags.json", () => { tags.length = Object.keys(tags).length; }); 
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
 * 
 */
function newImagePrompt() {
    
    let imageTag;

    //Bias the chances of getting certain image tags as to make the experience more intersting.
    if(Math.random() > 0.5)
    {
        //25% of the time, choose an image that needs to be deleted. 
        if(Math.random() > 0.5)
        {
            imageTag = randomElem(tagsToCensor);
            shouldDelete = true;
        }
        //25% of the time, display an image not to be deleted.
        else
        {
            imageTag = randomElem(tags.abstract);
            shouldDelete = false;
        }
    }
    //50% of the time, choose an image that might (unlikely, with all possible choices) need to be deleted.
    else 
    {
        //Pick a random tag from the whole concrete list.
        imageTag = randomElem(tags.concrete); 
    
        //Assume that the image shouldn't be deleted.
        shouldDelete = false;

        //Correct the assumption if the tag matches one of the list to be censored.
        tagsToCensor.forEach(element => {
            if(imageTag == element) { shouldDelete = true; }
        });
    }

    //
    getNewImage(imageTag);
}


/**
 * Is called automatically by annyang when hearing speech.
 * @param {String} command 
 */
function userCall(command) {
    if(command.toLowerCase().includes("delete"))
    {
        verifyVerdict(true);
        displayText('Deleting...', 1250);
        newImagePrompt();
    }
    else if(command.toLowerCase().includes("ignore"))
    {
        verifyVerdict(false);
        displayText('Ignored.', 1250);
        newImagePrompt();
    }
    else
    { displayText(`Unknown command: '${command}'`); }
}


/**
 * 
 * @param {boolean} didDelete - If the user chose to delete the image.
 */
function verifyVerdict(didDelete) {
    if(didDelete == shouldDelete) { userScore++; }
}
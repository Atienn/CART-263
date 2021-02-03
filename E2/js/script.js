"use strict";

/*
  Exercise 2 - ...
  
.
*/

let guess = ``;
let predicate = ``;
let adjective = ``;
let object = ``;
let sentenceGen = ``;

let canGuess = false;
let correct;

let speechVoice;
let speechPitch;

let predicateList = 
[
    `am a`,
    `want to be a`,
    `feel like a`,
    `resemble a`,
    `smell like a`,
    `am thinking about a`,
    `am watching a`,
    `dreamed of a`,
    `want a`,
    `am going to buy a`,
    `own a`,
    `will turn you into a`
];

let adjectiveList = 
[
    `real`,
    `fake`,
    `white`,
    `heavy`,
    `dirty`,
    `clean`,
    `burning`,
    `wet`,
    `silly`,
    `wide`,
    `toy`,
    `plastic`,
    `fragile`,
    `fancy`,
    `huge`,
    `fine`
];

let objectList = 
[
    `goose`,
    `duck`,
    `carrot`,
    `mushroom`,
    `smart car`,
    `truck`,
    `air vent`,
    `ruler`,
    `fork`,
    `hammer`,
    `power drill`,
    `shoe`,
    `shirt`,
    `keyboard`,
    `cellphone`,
    `radiator`,
    `table`,
    `snowman`
];

let voices = 
[
    "UK English Female",
    "UK English Male",
    "US English Female",
    "US English Male",
    "Australian Female",
    "Australian Male",
    "Hindi Female",
    "Hindi Male",
    "Bangla India Male",
    "Chinese (Hong Kong) Female",
    //"Chinese Taiwan Female"
];




function setup() 
{
    createCanvas(windowWidth, windowHeight);

    if (annyang) 
    {
        let commands = { '*heardSpeech': hearGuess };

        annyang.addCommands(commands);
        annyang.start();
    }

    //Default text settings.
    fill(200);
    textSize(45);
    textStyle(BOLD);
    textAlign(LEFT, TOP);

    background(0);
    text(`Are you a ROBOT?`, 25, 25);
    text(`Repeat the given prompt to prove you're human.`, 25, 100);
    text(`Click anywhere to start.`, 25, 400);
}


/**
 * Is called 60 times per second.
 */
function draw() 
{
}

function hearGuess(heardSpeech)
{
    if(canGuess)
    {
        canGuess = false;
        correct = true;
        guess = heardSpeech.substring(0,1).toUpperCase() + heardSpeech.substring(1).toLowerCase();
    
        background(0);
        fill(200);
        text(`RESULTS`, 25, 25);
    
        text(`INPUT:`, 50, 125);
        text(`${guess}.`, 450, 125);


        text(`ANSWER`, 50, 235);

        text(`SUBJECT:`, 75, 300);
        guessIncludes(`I`, 0);
        text(`I`, 450, 300);
    
        fill(200);
        text(`PREDICATE:`, 75, 350);
        guessIncludes(predicate, 1);
        text(predicate, 450, 350);
    
        fill(200);
        text(`ADJECTIVE:`, 75, 400);
        guessIncludes(adjective, 2);
        text(adjective, 450, 400);
    
        fill(200);
        text(`OBJECT:`, 75, 450);
        guessIncludes(object, 3);
        text(object, 450, 450);

        fill(200);
        text(`You are ` + (correct ? `HUMAN`:`a ROBOT`) + `.\nClick to try again.`, 25, 600);
    }

}


function guessIncludes(string)
{
    if(guess.includes(string.replace(`am `, ``))) 
    { 
        fill(0, 255, 0); 
    }
    else 
    { 
        fill(255, 0, 0);
        correct = false; 
    }
}

function mousePressed()
{
    if(!canGuess)
    {
        background(0);
        fill(200);
        text(`Listen closely.`, 25, 25)
    
        predicate = predicateList[randomInt(predicateList.length)];
        adjective = adjectiveList[randomInt(adjectiveList.length)];
        object = objectList[randomInt(objectList.length)];

        responsiveVoice.speak(`I ${predicate} ${adjective} ${object}`, voices[randomInt(voices.length)], { pitch: Math.random()*0.5 + 0.75, onend: speechEnd });
    }
}

function speechEnd()
{
    canGuess = true;

    background(0);
    fill(200);
    text(`Repeat the given prompt.\n\n`,25, 25);
    textSize(30);
    text(`You can write your answer in the console in the format:   answer("YOUR_ANSWER");   if you don't want to use a microphone.\n\nThe console can be opened with: Ctrl+Shift+I`, 25, 150, 750, 500);
    textSize(45);

}

function answer(string)
{
    annyang.trigger(string);
}

/**
 * Returns a random integer higher or equal to 0 and less than 'max'.
 * @param {Number} limit The randomized number's maximal limit (exclusive).
 * @returns {Number} Randomized integer within the boundaries.
 */
function randomInt(limit)
{
    return Math.floor(Math.random() * limit);
}

console.log = function() {}
console.clear();


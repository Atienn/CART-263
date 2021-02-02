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

let voice;
let pitch;

let predicateList = 
[
    `am a`,
    `want to be a`,
    `feel like a`,
    `ressemble a`,
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
    `grey`,
    `heavy`,
    `dirty`,
    `clean`,
    `burning`,
    `wet`,
    `silly`,
    `wide`,
    `toy`,
    `plastic`,
    `wooden`,
    `fragile`,
    `fancy`,
    `cute`,
    `fine`
];

let objectList = 
[
    `goose`,
    `duck`,
    `carrot`,
    `celery`,
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
    "Chinese Taiwan Female"
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
    textSize(50);
    textStyle(BOLD);
    textAlign(LEFT, CENTER);

    background(0);
}


/**
 * Is called 60 times per second.
 */
function draw() 
{

}

function hearGuess(heardSpeech)
{
    background(0);
    console.warn(heardSpeech);
    guess = heardSpeech;

    fill(200);
    text(`SUBJECT:`, 50, 200);
    guessIncludes(`I`);
    text(`I`, 400, 200);


    fill(200);
    text(`PREDICATE:`, 50, 250);
    guessIncludes(predicate);
    text(predicate, 400, 250);


    fill(200);
    text(`ADJECTIVE:`, 50, 300);
    guessIncludes(adjective);
    text(adjective, 400, 300);


    fill(200);
    text(`OBJECT:`, 50, 350);
    guessIncludes(object);
    text(object, 400, 350);
}

function guessIncludes(string)
{
    if(guess.includes(string)) { fill(0, 255, 0); }
    else { fill(255, 0, 0); }
}

function mousePressed()
{
    background(0);

    predicate = predicateList[randomInt(predicateList.length)];
    adjective = adjectiveList[randomInt(adjectiveList.length)];
    object = objectList[randomInt(objectList.length)];
    
    sentenceGen = `I ${predicate} ${adjective} ${object}`;

    voice = voices[randomInt(voices.length)];
    pitch = Math.random() + 0.5;

    console.warn(`VOICE: ${voice}, PITCH: ${pitch.toFixed(2)}, SENTENCE: ${sentenceGen}.`);

    responsiveVoice.speak(sentenceGen, voice, pitch);
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


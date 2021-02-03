"use strict";

/*
  Exercise 2 - Are you a ROBOT?
   
  Program where the user must repeat a sentence said out loud to prove they are human.
  Is meant to not be fair at times.
*/

//The user's guess.
let guess = ``;

//The generated sentence's predicate.
let predicate = ``;
//The generated sentence's adjective.
let adjective = ``;
//The generated sentence's object.
let object = ``;

//Tracks if the user is allowed to guess.
let canGuess = false;
//Tracks if the user's guess is correct.
let correct;


//The list of predicates to choose from to create a sentence.
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
    `don't need a`,
    `am going to buy a`,
    `own a`,
    `will turn you into a`
];

//The list of adjectives to choose from to create a sentence.
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
    `toy`,
    `plastic`,
    `fragile`,
    `fancy`,
    `silly`,
    `large`,
    `huge`,
    `fine`
];

//The list of objects to choose from to create a sentence.
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

//The list of voices that can be used by the speech synthesizer that are still understandable (somewhat) in english.
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
];



/**
 * Starts annyang and p5.js canvas. Sets up default text values. Displays initial frame.
 * Is called once on startup.
 */
function setup() 
{
    //Only attempt to start annyang if it is present.
    if(annyang) 
    {
        //Makes annyang call 'guessAnswer()' with parameter 'heard' when it recognizes speech.
        annyang.addCommands({ '*heard': guessAnswer });
        //Stars listening for voice input.
        annyang.start();
    }

    //Generate a canvas to match the window size.
    createCanvas(windowWidth, windowHeight);

    //Set deault text settings to be: light grey, large, bold and aligned from the top-left corner.
    fill(200);
    textSize(45);
    textStyle(BOLD);
    textAlign(LEFT, TOP);

    //Draw a black background.
    background(0);

    //Display instructions at the top left corner of the screen.
    text(`Are you a ROBOT?`, 25, 25);
    text(`Repeat the given prompt to prove you're human.`, 25, 100);
    //Display more text farther down.
    text(`Click anywhere to start.`, 25, 400);
}


/**
 * Verifies the user's guess against the answer and displays which parts are correct if the sentence has been spoken.
 * Is called automatically by annyang if it recognizes speech or if prompted by the user via the console.
 * @param {String} heard - The speech interpreted by annyang or the user's text entered in the console.
 */
function guessAnswer(heard)
{
    //Only allow the user's guess to be processed if they heard the sentence.
    if(canGuess)
    {
        //Signals that the user has guessed. Prevents them from doing so twice.
        canGuess = false;
        //Assume that the user's guess is correct.
        correct = true;

        //Save the guess in lowercase as to ignore case-sensitivity when comparing strings.
        guess = heard.toLowerCase();
    

        //Render over the last frame. Black background.
        background(0);

        //Write grey text in the top left corner.
        fill(200);
        text(`RESULTS`, 25, 25);
    
        //Write the user's guess in sentence case (only first letter is capitalized) farther down.
        text(`INPUT:`, 50, 125);
        text(`${guess.substring(0,1).toUpperCase() + guess.substring(1)}.`, 450, 125);


        //Write the answer further down.
        text(`ANSWER`, 50, 235);

        //Write the sentence's subject (always "I") in green/red depending if the user guessed correctly.
        text(`SUBJECT:`, 75, 300);
        guessIncludes(`i `);
        text(`I`, 450, 300);
    
        //Write the sentence's predicate in green/red depending if the user guessed correctly.
        fill(200);
        text(`PREDICATE:`, 75, 350);
        guessIncludes(predicate);
        text(predicate, 450, 350);
    
        //Write the sentence's adjective in green/red depending if the user guessed correctly.
        fill(200);
        text(`ADJECTIVE:`, 75, 400);
        guessIncludes(adjective);
        text(adjective, 450, 400);
    
        //Write the sentence's object in green/red depending if the user guessed correctly.
        fill(200);
        text(`OBJECT:`, 75, 450);
        guessIncludes(object);
        text(object, 450, 450);

        //Tells the user they are a robot if they've gotten a part of the answer wrong. Otherwise, tell them they are human.
        //This meant not to be fair at times.
        fill(200);
        text(`You are ` + (correct ? `HUMAN`:`a ROBOT`) + `.\nClick to try again.`, 25, 600);
    }

}

/**
 * Checks if the user's guess includes the given string. 
 * Sets the text's color to green if the guess includes the string and to red if it doesn't.
 * @param {String} string - The string to verify the guess agaisnt. 
 */
function guessIncludes(string)
{
    //Ignores the "am" part of certain predicates as annyang often picks up "I'm" instead of "I am".
    if(guess.includes(string.replace(`am `, ``))) 
    {
        //Sets text to green if the string is found.
        fill(0, 255, 0); 
    }
    else 
    { 
        //Sets the text to red if it isn't.
        fill(255, 0, 0);
        //Correct the assumption that the user's guess was correct.
        correct = false; 
    }
}

/**
 * Generates a new sentence and speaks it out loud if the preivous one has received a guess.
 * Is called whenever a mouse button is pressed on the canvas.
 */
function mousePressed()
{
    //Only allow next sentence to be generated and play if the previous one has received a guess and a sentence isn't being spoken. 
    if(!canGuess && !responsiveVoice.isPlaying())
    {
        //Render over the last frame. Black background.
        background(0);

        //Write light grey text in the top left corner of the screen.
        fill(200);
        text(`Listen closely.`, 25, 25)
    
        //Randomly choose each part of the new sentence from the given lists. 
        predicate = predicateList[randomInt(predicateList.length)];
        adjective = adjectiveList[randomInt(adjectiveList.length)];
        object = objectList[randomInt(objectList.length)];

        //Speak the new sentence out loud with a random voice and pitch.
        //Calls 'speechEnd()' when done speaking.
        responsiveVoice.speak(`I ${predicate} ${adjective} ${object}`, voices[randomInt(voices.length)], { pitch: Math.random()*0.5 + 0.75, onend: speechEnd });
    }
}


/**
 * Instructs the user to respond and allows their guess to be processed.
 * Is called when the voice synthesized is done saying the sentence. 
 */
function speechEnd()
{
    //Allow the user's speech/text input to be processed.
    canGuess = true;

    //Render over the last frame. Black backgound.
    background(0);

    //Write light grey text in the top left of the screen.
    fill(200);
    text(`Repeat the given prompt.\n\n`,25, 25);
    //Write smaller text farther down. Keep it all within a 750 by 500 pixel box.
    textSize(30);
    text(`You can write your answer in the console in the format:   answer("YOUR_ANSWER");   if you don't want to use a microphone.\n\nThe console can be opened with: Ctrl+Shift+I`, 25, 150, 750, 500);
    
    //Revert to the original text size.
    textSize(45);
}


/**
 * Allows the user to type what they would've said with a microphone directly into the console.
 * Is called by the user via the console.
 * @param {String} string - The user's guess to the spoken sentence.
 */
function answer(string) { annyang.trigger(string); }


/**
 * Returns a random integer higher or equal to 0 and less than 'max'.
 * Is called whenever a new sentence is generated.
 * @param {Number} limit The randomized number's maximal limit (exclusive).
 * @returns {Number} Randomized integer within the boundaries.
 */
function randomInt(limit) { return Math.floor(Math.random() * limit); }


/**
 * Adjusts the size of what's displayed to match the window.
 * Is automatically called if the window is resized at any point.
 */
function windowResized() { resizeCanvas(windowWidth, windowHeight); }


//Overrides the console.log function to prevent responsiveVoice from displaying the sentence to guess in the console.
console.log = function() {}
//Clears the console on startup.
console.clear();


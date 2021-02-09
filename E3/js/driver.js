/*
  Exercise 3
  
*/

let userProfile = 
{
  username: ``,
  password: ``
}

let userInput = ``;

/**
 * This function is called and completed before others start.
 */
function preload()
{

}

/**
 * Is called once on startup.
 */
function setup()
{
    createCanvas(windowWidth, windowHeight);
    background(0);
    fill(200);
    textSize(50);
    textAlign(CENTER, CENTER);
}


/**
 * Is called once per frame.
 */
function draw()
{
    background(0);
    text(userInput, width/2, height/2);
}


/**
 * Adds the pressed key to the user input if it is a letter.
 * Is called when the user types a key (ignores function keys like Shift and Control).
 */
function keyTyped()
{
  //Makes the key's string uppercase to simplify verification.
  key = key.toUpperCase();

  //Checks if the pressed key contains a character between A and Z.
  //Since function keys are ignored, only letter keys should be able to be added.
  if(/[A-Z]/.test(key)) { userInput += key; }
}

/**
 * Clears user input if the backspace key is pressed.
 * Is called whenever the user is types a key on their keyboard.
 */
function keyPressed() 
{
    if (keyCode === BACKSPACE) { userInput = ``; }
}
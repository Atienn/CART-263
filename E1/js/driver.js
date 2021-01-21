/*
  Exercise 2 - Shopping Spree
  
  Rudimentary game where the player must click on items of a certain category when prompted.
  Something something consumerism, whatever.
*/

"use strict"


//Tracks if the user has clicked their mouse on the specific frame it's called on.
let mouseClick = false;

//The height of the screen where items can bounce around. Accounts for the message bar at the bottom of the screen.
let reducedHeight;

//The time in frames remaining for the wanted type and message at the bottom of the screen to update.
//Used most of the time as a time pressure for the player to find a wanted item.
let timer;

//The type of the currently desired item. 
//Value of -1 is used when the player isn't fetching items.
let wantedType;
//Text displayed at the bottom of the screen telling the player what to do.
let objectiveText;

//Contains 3 images in a sub-array for each item type.
let images = [[],[],[],[]];


/**
 * Loads all images required for the game.
 * This function is called and completed before any other.
 */
function preload()
{
    images[0][0] = loadImage('assets/images/clot1.png');
    images[0][1] = loadImage('assets/images/clot2.png');
    images[0][2] = loadImage('assets/images/clot3.png');

    images[1][0] = loadImage('assets/images/food1.png');
    images[1][1] = loadImage('assets/images/food2.png');
    images[1][2] = loadImage('assets/images/food3.png');

    images[2][0] = loadImage('assets/images/furn1.png');
    images[2][1] = loadImage('assets/images/furn2.png');
    images[2][2] = loadImage('assets/images/furn3.png');

    images[3][0] = loadImage('assets/images/tech1.png');
    images[3][1] = loadImage('assets/images/tech2.png');
    images[3][2] = loadImage('assets/images/tech3.png');
}


/**
 * 
 * Is called once on startup.
 */
function setup()
{
    //
    createCanvas(windowWidth, windowHeight);
    reducedHeight = windowHeight - 25;
    background(175);

    imageMode(CENTER);

    strokeWeight(25);
    strokeCap(SQUARE);

    textAlign(CENTER,CENTER);
    textSize(20);
    fill(255);

    //Create 25 objects with random position, velocity directions and types.
    for(let i = 0; i < 25; i++)
    {
        Item.current[i] = Item.Random();
    }

    //As we're displaying a non-fetching message, set the wanted type to -1.
    wantedType = -1;
    objectiveText = 'Help me on my shopping spree! Click the items on the screen when I ask for them.'
    
    //Give extended time for the player to read the objective without time pressure.
    timer = 300;
}

/**
 * 
 * Is called 60 times per second.
 */
function draw()
{
    //If the
    if(mouseClick)
    {
        for(let i = Item.current.length - 1; i >= 0; i--)
        {
            if(Item.current[i].isMouseNear() && Item.current[i].isCorrectType())
            {
                //This prevents all objects from getting the same type trough extreme luck.

                //Create a new item with a type different than the one that was selected.
                Item.current[i] = Item.Random(Item.current);
                
                //Switch to a different desired type and reset the timer.
                switchType();
                timer = 180;

                //Since a valid item was found, checking any further isn't required.
                break;
            }
        }
    }

    //Now that any logic is done, assume that the user won't click next frame.
    //Will be corrected by 'mousePressed' if the user does click.
    mouseClick = false;



    if(timer <= 0) 
    {

        if(wantedType < 0)
        {
            switchType();
        }
        //
        else
        {
            wantedType = -1;

            objectiveText = 'CAN I GET YOUR ATTENTION PLEASE?';
        }

        //Reset the timer to 180, no matter the new objective.
        timer = 180;
    }
    //Decrease the timer.
    else { timer--; }


    //Draw grey background.
    background(175);

    //Update all items on screen.
    for(let i = 0; i < Item.current.length; i++)
    {
        Item.current[i].move();
        Item.current[i].display();
    }

    //Draw a black bar at the bottom of the screen.
    stroke(0);
    line(0, reducedHeight + 13, width, reducedHeight + 13);

    //Draw a green bar with length representing the timer over the black one.
    stroke(0,175,0);
    line(0, reducedHeight + 13,(timer / 180) * width, reducedHeight + 13);

    //Write over both bars what is the next item to click.
    noStroke();
    text(objectiveText, 0.5 * width, reducedHeight + 14);
}


/**
 * Only sets 'mouseClick' to true on the frame the user clicks their mouse.
 * This is very useful since it prevents any double input and the condition
 * can be checked with a global variable.
 */
function mousePressed() { mouseClick = true; }


/**
 * Sets the wanted type to a different one that is present on the screen.
 */
function switchType()
{
    //Tracks the new type to be selected. 
    //Prevents against re-selecting the same type.
    let newType;

    //Get the type of a random item on screen.
    do { newType = Item.current[randomInt(Item.current.length)].type; }
    //Keep re-rolling until we get a different type than the last.
    while(newType == wantedType);

    //Set the new type.
    wantedType = newType;

    //Update the text at the bottom of the screen.
    switch(wantedType)
    {
        case 0: objectiveText = `I need a new piece of CLOTHING.`;          break;
        case 1: objectiveText = `I'm hungry. Can you get me some FOOD?`;   break;
        case 2: objectiveText = `I want some new FURNITURE.`;              break;
        case 3: objectiveText = `I am looking for a new ELECTRONIC item.`; break;
    }
}


/**
 * Returns a random integer higher or equal to 0 and less than 'max'.
 * @param {*} max The returned number's maximal limit (exclusive).
 */
function randomInt(max)
{
    return Math.floor(Math.random() * max);
}


/**
 * Adjusts the size of what's displayed to match the window.
 * Is automatically called if the window is resized at any point.
 */
function windowResized()
{
    //Resizes the canvas with the values of the window
    resizeCanvas(windowWidth, windowHeight);
    //Recalculate the screen height used for items.
    reducedHeight = windowHeight - 25;
}
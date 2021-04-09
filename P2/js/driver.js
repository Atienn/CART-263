/* **************
PROJECT VECTOR
Étienne Racine

Built off template-p5-project. The program is a platformer game with a focus on speed.
The goal is to navigate pre-made levels in the shortest amount of time possible.

All music used is royalty-free.
************** */

//#region Structure

//Tracks which state the game is in.
let state;

//Tracks the user's desired settings (inputs, volume, etc).
let settings;


let mouse = {
    //Tracks if the user has clicked their mouse for the specific frame it's referred on.
    click: false,
    //The mouse's position on screen.
    pos: Vector2D.Zero(),

    /** Draws a custom '+' cursor at the mouse position that 'beats' with the music. */
    display() {
        rect(this.pos.x, this.pos.y, 10 + ampCurrent * 10, 1 + ampCurrent);
        rect(this.pos.x, this.pos.y, 1 + ampCurrent, 10 + ampCurrent * 10);
    }
}

//#endregion

//#region Display

//Tracks if the window was in focus last frame.
let wasFocused = true;

//Holds a hue value (0-359) that varies with time. 
//Starts at 140 so that the 'MenuState' setup will set it to 230 (blue).
let hueChange = 140;

//Holds the music currently playing.
let currentMusic;

//#endregion

//#region  Music

//Holds the music played in levels.
let gameMusic;

//Holds the music played in the menu.
let menuMusic;

//Holds the name of all music used.
let musicNames = ['AIRGLOW - Blueshift','INTL.CMD - Sunset City']

//Holds the index of the currently playing music in the 'musicNames' array.
let currentMusicIndex;

//Tracks how much to offset the camera's view from the player's position.
let camOffset = new Vector2D(0,0);

//Is used to measure the level of multiple frequecies as 'music' plays out.
let freqAnalyzer;
//Holds the level of each frequency measured for the current frame.
let freqsCurrent = 0;

//Is used to meansure the amplitude level as 'music' plays out.
let ampAnalyzer;
//Holds the amplitude level measured for the current frame.
let ampCurrent = 0;

//#endregion

//Disables p5 friendly errors and possibly leads to a performance boost.
p5.disableFriendlyErrors = true;


/**
 * Loads the music.
 * This function is called and completed before any other.
 */
function preload()
{
    //Since loading a sound file is asynchronous, placing it in 'preload()' prevents the program from continuing until it's done.
    menuMusic = loadSound('assets/sounds/AIRGLOW - Blueshift.mp3')
    gameMusic = loadSound('assets/sounds/INTL.CMD - Sunset City.mp3');

    //Get locally stored settings data if any is available.
    settings = JSON.parse(localStorage.getItem(`P1:Settings`));
    //If said data doesn't exist yet, create a new settings object with default values.
    if(!settings) { resetSettings(); }
}

/**
 * Prepares the canvas/background and modifies general settings.
 * Is called once on startup.
 */
function setup() 
{
    //Create the canvas and set the background color
    createCanvas(windowWidth, windowHeight);

    //#region Display Settings
  
    noCursor(); //Hides the cursor as a custom one provided.
    colorMode(HSB); //HSB is useful as the saturation and brightness can be modified independently of hue.

    //Makes the default fill bright white, disable stroke and make line caps square.
    fill(100);
    noStroke();
    strokeCap(SQUARE);

    //Sets shapes to be drawn from the center.
    ellipseMode(RADIUS);
    rectMode(RADIUS);

    //Set the default text to be small and aligned from the left-center.
    textSize(20);
    textAlign(LEFT, CENTER);

    //#endregion

    //#region Audio Settings

    //
    masterVolume(settings.volume / 10);

    //Give the current track an abstract sound file so that analyzers can connect to it and to
    //allow it to be stopped and switched to something else when calling the first 'state.setup()'.
    currentMusic = new p5.SoundFile();

    //Creates a FFT object with large smoothing and 128 output frequencies.
    //Here, smoothing means that the returned level of frequecies will rise and fall slower, appearing smoother.
    freqAnalyzer = new p5.FFT(0.75, 128);

    //Create an Amplitude object with little smoothing.
    ampAnalyzer = new p5.Amplitude();
    ampAnalyzer.smooth(0.1);

    //Allows the music to start.
    userStartAudio();

    //#endregion

    //Set the starting game state.
    state = MenuState;

    //Set density.    
    pixelDensity(settings.density / 10);


    //Call the state's setup before its behaviour.
    state.setup();
}


/**
 * Calls the current game state's update function and draw the cursor.
 */
function draw() 
{        
    //Don't update if the window is not in focus.
    if(focused)
    {
        //Set the new position of the mouse.
        mouse.pos.Set(mouseX, mouseY);

        //Measure the level of amplitude and send it to the amplitude variable.
        ampCurrent = ampAnalyzer.getLevel();
        //Measures the level of frequencies and sends them to the frequency array.
        freqsCurrent = freqAnalyzer.analyze();

        //Call the game state's update function.
        state.update();

        //Now that all logic is done for this frame, assume that the user won't click next frame.
        mouse.click = false;


        //Since 'playing' is defined as false and needs to be set to false for the player to return to menu,
        //by only checking for it, we can have behaviour happen both on 'MenuState' and 'PlayingState' pause.
        
        //Either on menu or on pause, display the name and artist of the currently playing music on the bottom-right.
        if(!PlayingState.playing)
        {
            push(); //We don't want to keep the following text settings.

            textAlign(RIGHT, CENTER); //Align text to the right-center.
            textSize(15); //Reduce the text size.
            text(`Currently Playing:\n${musicNames[currentMusicIndex]}`, width - 5, height - 20); //Give credit to the artist.

            pop(); //Revert to the previous text settings.
        }

        //Draw the cursor.
        mouse.display();

        //If the window wasn't focused last frame, then the cursor was enabled. Disables it. 
        if(!wasFocused)
        {
            //Consider the window as now being in focus.
            wasFocused = true;
            //Disable the cursor.
            noCursor();
        }
    }
    //If the window was in focus last frame, enable the cursor and display a message.
    else if(wasFocused)
    {
        //Consider the window as not being in focus anymore.
        wasFocused = false;

        //Enable the cursor.
        cursor();

        //Draw a semi-transparent black background over the previous frame.
        background(0,0,0,0.75);
        
        
        //OUT OF FOCUS MESSAGE

        push(); //We don't want to keep the following drawing settings.

        textSize(75); //Increase the text size.
        textAlign(CENTER, CENTER); //Align the text from the center.
        
        text('OUT OF FOCUS\nCLICK TO RESUME', width/2, height/2); //Display the message.
    
        pop(); //Revert to previous drawing settings.
    }
}


/**
 * Is called when the user types a key (ignores function keys like Shift and Control).
 * Calls the current state's key typed event.
 */
//function keyTyped() { state.keyType(); }

/**
 * Is called whenever the user is types a key on their keyboard.
 * Calls the current state's key pressed event.
 */
//function keyPressed() { state.keyPress(); }


/**
 * Adjusts the size of what's displayed to match the window.
 * Is automatically called if the window is resized at any point.
 */
function windowResized()
{
//Resizes the canvas with the values of the window
resizeCanvas(windowWidth, windowHeight);
}


/** Safely switches to a new state by calling it's setup function first. */
function switchState(newState)
{
    state = newState;
    newState.setup();
}


/**
 * Only sets 'cursor.click' to true on the frame the user clicks their mouse.
 * This is very useful since it prevents any double input and the condition
 * can be checked with a global variable.
 */
function mousePressed() { mouse.click = true; }


/**
 * Shifts 'current' towards 'target' at a rate of 'change' making sure not to go over it.
 * Is called twice per draw().
 * @param {Number} current - the current value.
 * @param {Number} target - the target value.
 * @param {Number} change - the rate at which 'current' moves to 'target'.
 */
function moveTowards(current, target, change)
{
    let isBigger;   //Tracks if the input is larger than the target.

    //If the input is larger than the target, than set 'isBigger' appropriately and remove 'change' from 'current'.
    if(current > target) 
    {   
        isBigger = true;
        //Remove 'change' from current, disregarding if it's positive or not.
        current -= Math.abs(change); 
    }
    //If the input is smaller than the target, than set 'isBigger' appropriately and add 'change' to 'current'.
    else if (current < target) 
    { 
        isBigger = false;
        //Add 'change' to current, disregarding if it's positive or not.
        current +=  Math.abs(change); 
    }

    //Corrects the values of 'current' if it moved past 'target'.
    //If 'target' was bigger and now isn't, then we've passed it.
    //If 'target' was smaller and now isn't, then we've passed it.
    if((isBigger && current < target) || (!isBigger && current > target))
    {
        //Corrects the value of 'current' (we wanted to stop at 'target').
        current = target;
    }

    //Return the modified value.
    return current;
}


/**
 * Ups the value of 'hueChange' by the specified amount making sure to
 * keep it within its 0-360 range.
 * 
 * @param {Number} value - The amount to add to 'hueChange'.
 */
function changeHue(value)
{
    //Increase the hue by the specified amount
    hueChange += value;

    //If the hue is over its max value (360), remove 360 to make it loop around.
    if(hueChange >= 360) { hueChange -= 360; }
}


/** Function specifying doing nothing. */
function none() { }


/**
 * Quits the page, either by sending them somewhere 
 * in thier history, or by closing the page.
 */
 function quit() {

    //Force saving settings before exiting.
    saveSettings();

    //Try to send the user to the previous page in their history.
    window.history.back();

    //If the user is still on the page, then there were no last page to go to.
    //Send the user to the next page in their history.
    window.history.forward();

    //Again, if the user is still on the page, then there were no page to go to.
    //Close the window or tab.
    window.close();
}
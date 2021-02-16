/*
  Exercise 3 - Quicktype
  
  Basic game where the user must type as many letters displayed on screen as possible.
  Saves player score and name locally. 
*/

"use strict";

//The game's state.
let state;


/**
 * Creates canvas, sets basic settings and gets local data (if any).
 * Is called once on startup.
 */
function setup()
{
    //Create a window-sized black canvas.
    createCanvas(windowWidth, windowHeight);
    
    //Slow framerate. The game has no animation so this just 
    //lightens the computational load at basically no cost.
    frameRate(30);

    //Make recatangles drawn from the center (applies for all game states).
    rectMode(CENTER);

    //Start the game in the leaderboard state.
    switchState(menu);
}


/**
 * Is called once per frame.
 * Calls the current state's update.
 */
function draw() { state.update(); }


/**
 * Is called whenever the user is types a key on their keyboard.
 * Calls the current state's key pressed event.
 */
function keyPressed() { state.keyPress(); }


/**
 * Adjusts the size of what's displayed to match the window.
 * Is automatically called if the window is resized at any point.
 */
function windowResized()
{
    //Resizes the canvas with the dimensions of the window.
    resizeCanvas(windowWidth, windowHeight);
}


/** Safely switches to a new state by calling it's setup function first. */
function switchState(newState)
{
    state = newState;
    newState.setup();
}


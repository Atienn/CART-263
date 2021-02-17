/*
  Exercise 4 - 
  
  Basic game where the user must type as many letters displayed on screen as possible.
  Saves player score and name locally. 
*/

"use strict";

//The game's state.
let state;
//The video feed output.
let video;
//The hands detected on screen, if any.
let hands;


/**
 * Creates canvas, sets basic settings and gets local data (if any).
 * Is called once on startup.
 */
function setup()
{
    //Create a window-sized black canvas.
    createCanvas(1280, 720);
    
    //Slow framerate. The game has no animation so this just 
    //lightens the computational load at basically no cost.
    frameRate(30);

    //Make recatangles drawn from the center (applies for all game states).
    rectMode(CENTER);

    //Start in the loading state.
    switchState(loading);

    
    video = createCapture({ video: { mandatory: { minWidth: width, maxWidth: width, minHeight: height, maxHeight: height }, optional: [{ maxFrameRate: 30 }] }, audio: false });
    video.hide();
        
    handpose = ml5.handpose(video, { flipHorizontal: true }, () => { switchState(menu); });

    //Ask handpose to predict the position of hands on screen and send the result to 'hands'.
    handpose.on(`predict`, (results) => { hands = results; });
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


/** Safely switches to a new state by calling it's setup function first. */
function switchState(newState)
{
    state = newState;
    newState.setup();
}

/**
 * 
 */
function drawVideo()
{
    push(); //Don't keep the inverted scale.

    //Draw the image from the right side of the canvas.
    translate(width, 0);
    //Flip the image vertically to match the predicted positions.
    scale(-1.0, 1.0);
    //Draw the video feed of the camera.
    image(video, 0, 0, width, height);

    pop(); //Reverts to the previous style.
}

/**
 * Draws the user's hand if handpose recognizes it.
 * Is called once per frame in all non-loading states.
*/
function drawHand()
{
    //Only act if a hand is detected.
    if (hands.length > 0) 
    {
        //Draw each of the hand's fingers.
        drawFinger(hands[0].annotations.thumb);
        drawFinger(hands[0].annotations.indexFinger);
        drawFinger(hands[0].annotations.middleFinger);
        drawFinger(hands[0].annotations.ringFinger);
        drawFinger(hands[0].annotations.pinky);
    }
}

/**
 * Draws a specified finger using it's provided positions.
 * @param {Object} finger The finger to draw.
 */
function drawFinger(finger)
{
    //Each finger has 4 positions.
    for(let i = 0; i < 3; i++)
    {
        //Draw a line between each joint.
        line(finger[i][0], finger[i][1], finger[i+1][0], finger[i+1][1]);
        
        //Draw a circle at each joint.
        circle(finger[i][0], finger[i][1], 15);
    }
}
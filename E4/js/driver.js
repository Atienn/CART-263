/*
  Exercise 4 - Bubble Popper Plus
  
  Basic game where the user can use thier hand with a camera to 'pop' bubbles on screen.
*/

"use strict";

//The game's state.
let state;
//The video feed output.
let video;
//The hands detected on screen, if any.
let hands;
//The user's highest score.
let highScore = 0;


/**
 * Creates canvas, sets basic settings and gets local data (if any).
 * Is called once on startup.
 */
function setup()
{
    //Create a large canvas.
    createCanvas(1280, 720);
    //Lower framereate to lighten the computational load.
    frameRate(30);
    //Make recatangles drawn from the center (applies for all game states).
    rectMode(CENTER);
    ellipseMode(CENTER);


    //Start in the loading state and call its setup.
    state = loading;
    loading.setup();


    //Try to start recording. Force the captured video resolution to match the canvas'.
    video = createCapture({ video: { mandatory: { minWidth: width, maxWidth: width, minHeight: height, maxHeight: height }, optional: [{ maxFrameRate: 30 }] }, audio: false });
    //Hide the auto-generated display. The video will be used in the canvas directly.
    video.hide();

    //Load handpose, but flip its output horisontally to make it a mirror of reality.
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


/** Safely switches to a new state by calling quit and setup functions first. */
function switchState(newState)
{
    state.quit();
    state = newState;
    newState.setup();
}

/**
 * Draw the next frame from the captured video but invert it vertically to 
 * make it act as a mirror rather than a direct representation.
 * (If the user moves thier hand left, it shouldn't move right on screen.)
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

        //Draw a larger node at the wrist (it's not included in any finger.)
        circle(hands[0].landmarks[0][0], hands[0].landmarks[0][1], 20);

        //Draw a new smaller circle over every node. 
        //Gives tips to fingers and stylises all other nodes.
        hands[0].landmarks.forEach(node => { circle(node[0], node[1], 5);});
    }
}

/**
 * Draws a specified finger using it's provided positions.
 * @param {Object} finger The finger to draw.
 */
function drawFinger(finger)
{
    //Create a link to the wrist.
    line(finger[0][0], finger[0][1], hands[0].landmarks[0][0], hands[0].landmarks[0][1]);

    //Each finger has 4 positions.
    for(let i = 0; i < 3; i++)
    {
        //Draw a line between each joint.
        line(finger[i][0], finger[i][1], finger[i+1][0], finger[i+1][1]);
        
        //Draw a circle at each joint.
        circle(finger[i][0], finger[i][1], 15);
    }
}
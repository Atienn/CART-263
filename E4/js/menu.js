"use strict";

/** Displays instructions and score. */
let menu =
{
    /** Sets up display settings and resets game values. */
    setup()
    {
        //Make text bold and aligned from the center.
        textStyle(BOLD);
        textAlign(CENTER, CENTER);

        //Enable stroke and removes its caps.
        strokeWeight(10);
        strokeCap(SQUARE);

        //Makes text and shapes grey.
        fill(100);
        //Gives an thin white outline to text and shape.
        strokeWeight(3);
        stroke(250);
    },


    /** Displays the letter the user must type as well as the time remaining. */
    update() 
    {
        //Draws the next captured video frame.
        drawVideo();
        //Draw the finger joints & links if a hand is detected.
        drawHand();

        //Instructions at the top of the screen.
        textSize(50);
        text('Bubble Popper Plus', width/2, 35);
        textSize(35);
        text(`The hand detector works best well-lit situations.\nPress SPACE to start.`, width/2, 150);
        text(`Highest score: ${hScore}.`, width/2, height - 35);
    },

    /** Moves to the game state. */
    keyPress() 
    {
        if(keyCode == 32) { switchState(game); }
    },

    /** Do nothing, used by other state(s). */
    quit() { }
}
"use strict";

/** Displays video, instructions and score. */
let menu =
{
    /** Sets up display settings. */
    setup()
    {
        //Make text bold and aligned from the center.
        textStyle(BOLD);
        textAlign(CENTER, CENTER);

        //Makes text and shapes grey.
        fill(100);
        //Gives an thin white outline to text and shape.
        strokeWeight(3);
        stroke(250);
    },


    /** Displays captured video, hand recognition and text on screen. */
    update() 
    {
        //Draws the next captured video frame.
        drawVideo();
        //Draw the finger joints & links if a hand is detected.
        drawHand();

        //Title and instructions at the top of the screen.
        textSize(50);
        text('Bubble Popper Plus', width/2, 35);
        textSize(35);
        text(`Show your hand to the camera!\n(Works best in well-lit rooms)`, width/2, 150);
        text('Press SPACE to start.', width/2, 250);

        //Score at the bottom of the screen.
        text(`Highest score: ${highScore}.`, width/2, height - 35);
    },

    /** Moves to the game state if SPACE is pressed. */
    keyPress() 
    {
        if(keyCode == 32) { switchState(game); }
    },

    /** Do nothing, used by other state(s). */
    quit() { }
}
"use strict";

/** Displays letters the user must type to increase thier score. */
let game =
{
    //The game's timer.
    timer: 0,
    //The user's current score.
    score: 0,

    bubbles: {},

    /** Sets up display settings and resets game values. */
    setup() 
    {
        //Make text bold and aligned from the center.
        textStyle(BOLD);
        textAlign(CENTER, CENTER);

        //Enable stroke and removes its caps.
        strokeWeight(10);
        strokeCap(SQUARE);

        //Reset score, first letter and timer.
        this.score = 0;
        this.timer = 300;
    },


    /** Displays the letter the user must type as well as the time remaining. */
    update() 
    {
        //Black background.
        background(0);
        
        //Disables stroke for the following text.
        noStroke();

        //Instructions at the top of the screen.
        textSize(50);
        text('Pop as many bubbles as you can!', width/2, 35);
        textSize(35);
        text(`Current score: ${this.score}.`, width/2, 100);

        //Display the [...] in the center.
        textSize(200);
        circle();

        //Display the remaining time as a line at the bottom of the screen.
        stroke(150);
        line(0, height - 5, (this.timer / 300) * width, height - 5);

        //Ticks the timer down if it's not over.
        if(this.timer > 0) { this.timer--; }
        //Otherwise, switch to the next state where the user can enter thier name.
        else { switchState(); }
    },

    /** Skips the game phase. Used for debug/testing. */
    keyPress() 
    {
        if(keyCode == BACKSPACE) { switchState(menu); }
    },

    /** Gives a new character from A to Z to the 'letter' variable that is different from the last. */
    newBubble()
    {

    }
}
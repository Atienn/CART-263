"use strict";

/** Displays bubbles the user must pop to increase thier score. */
let game =
{
    //The game's timer.
    gameTimer: 0,

    //The user's current score.
    score: 0,

    /** Sets up display settings and resets game values. */
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

        //Re-generate the bubble array.
        Bubble.resetCurrent();

        //Reset score, first letter and timer.
        this.score = 0;
        this.gameTimer = 300;
    },


    /** Displays bubbles the user must pop to increase thier score. */
    update() 
    {
        //Draws the next captured video frame.
        drawVideo();
        //Draw the finger joints & links if a hand is detected.
        drawHand();

        //Instructions at the top of the screen.
        textSize(50);
        text('Pop as many bubbles as you can!', width/2, 35);
        //Score at the bottom of the screen.
        textSize(35);
        text(`Score: ${this.score}.`, width/2, height - 35);

        //Display the remaining time as a line at the bottom of the screen.
        line(0, height - 5, (this.gameTimer / 300) * width, height - 5);

        //Checks if the bubbles have been popped.
        Bubble.checkAll();
        //Move and display all bubbles.
        Bubble.updateAll();

        //Ticks the timer down if it's not over.
        if(this.gameTimer > 0) { this.gameTimer--; }
        //Otherwise, go back to the menu.
        else { switchState(menu); }
    },

    /** Skips the game phase. Used for debug/testing. */
    keyPress() 
    {
        if(keyCode == BACKSPACE) { switchState(menu); }
    },

    /** Frees memeory and saves the high score. */
    quit()
    {
        //Free up the memory used by the bubble array.
        Bubble.current = [];

        //Save the score if it is the highest one achieved.
        if(this.score > highScore) { highScore = this.score; }
    }
}
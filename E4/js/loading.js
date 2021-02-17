"use strict";

/** Displays letters the user must type to increase thier score. */
let loading =
{
    impatientText: false,

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

        //
        this.impatientText = false;
    },


    /** Displays the letter the user must type as well as the time remaining. */
    update() 
    {
        //Black background.
        background(0);
        
        //Instructions at the top of the screen.
        textSize(50);
        text('Loading...', width/2, height/2);

        //NO >:(
        if(this.impatientText) 
        {
            textSize(35); 
            text(`Hold on! It's not done yet!`, width/2, height/2 + 75);
        }
    },

    /** Tells the user to stop. */
    keyPress() 
    {
        this.impatientText = true;
    },

    /** Do nothing, used by other state(s). */
    quit() { }
}
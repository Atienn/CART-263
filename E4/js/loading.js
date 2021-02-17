"use strict";

/** Displays a basic loading screen. */
let loading =
{
    impatientText: false,

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

        //Tracks if the user has tried pressing a button on the loading screen.
        this.impatientText = false;
    },


    /** Displays the letter the user must type as well as the time remaining. */
    update() 
    {
        //Black background.
        background(0);
        
        //Print a loading sign in the middle of the screen.
        textSize(50);
        text('Loading...', width/2, height/2);

        //Add a bit of interactivity.
        if(this.impatientText) 
        {
            textSize(35); 
            text(`Hold on! It's not done yet!`, width/2, height/2 + 75);
        }
    },

    /** Tells the user to keep waiting. */
    keyPress() 
    {
        this.impatientText = true;
    },

    /** Do nothing, used by other state(s). */
    quit() { }
}
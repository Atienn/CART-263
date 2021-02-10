"use strict";

/** Displays letters the user must type to increase thier score. */
let game =
{
    //The letter the user must match.
    letter: '',
    //The last letter displayed. Used to avoid showing the same letter twice in a row.
    lastLetter: '',
    //The game's timer.
    timer: 0,
    //The user's current score.
    score: 0,

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
        this.newLetter();
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
        text('Type as many letters as you can!', width/2, 35);
        textSize(35);
        text(`Current score: ${this.score}.`, width/2, 100);

        //Display the letter to type in the center.
        textSize(200);
        text(this.letter, width/2, height/2);

        //Display the remaining time as a line at the bottom of the screen.
        stroke(150);
        line(0, height - 5, (this.timer / 300) * width, height - 5);

        //Ticks the timer down if it's not over.
        if(this.timer > 0) { this.timer--; }
        //Otherwise, switch to the next state where the user can enter thier name.
        else { switchState(logUser); }
    },

    /** Checks if the typed key matches the displayed letter. */
    keyType() 
    {
        //If the key matches, increase score and generate a new letter.
        if(key.toUpperCase() === this.letter)
        {
            this.score++;
            this.lastLetter = this.letter;
            this.newLetter();
        }
    },

    /** Skips the game phase. Used for debug/testing. */
    keyPress() 
    {
        if(keyCode === BACKSPACE) { this.timer = 0; }
    },

    /** Gives a new character from A to Z to the 'letter' variable that is different from the last. */
    newLetter()
    {
        do { this.letter = String.fromCharCode(Math.floor(Math.random() * 26 + 65)); }
        //If the new letter matches the old one, pick again.
        while (this.letter === this.lastLetter);
    }
}
"use strict";

let logUser =
{
    input: '',

    setup() 
    {
        textStyle(BOLD);
        textAlign(CENTER, CENTER);

        noStroke();
    
        this.input = '';
    },

    update() 
    {
        background(0);

        textSize(50);
        text('Enter a name to save your score! (3 letters)', width/2, 35);

        textSize(35);
        text(`Your score: ${game.score}.`, width/2, 100);

        textSize(100);
        text(this.input, width/2, height/2);
    },

    /**
     * Adds the pressed key to the user input if it is a letter. 
     */
    keyType() 
    {
   
        if(this.input.length < 3)
        {
            //Makes the key's string uppercase to simplify verification.
            key = key.toUpperCase();

            //Checks if the pressed key contains a character between A and Z.
            //Since function keys are ignored, only letter keys should be able to be added.
            if(/[A-Z]/.test(key)) { this.input += key; }
        }
    },

    /**
     * Clears user input if the backspace key is pressed.
     */
    keyPress() 
    {
        if (keyCode === BACKSPACE) { this.input = ``; }
        else if (keyCode === ENTER && this.input.length === 3) 
        { 
            addNewUser(this.input, game.score); 
            switchState(leaderboard);
        }
    }
}
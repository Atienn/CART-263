"use strict";

/** State where the user can save thier score locally with a 3-letter name. */
let logUser =
{
    //Tracks the user's letter inputs.
    input: '',
    takenNameMsg: '',

    /** Sets display settings. */
    setup() 
    {
        //Set text to be bold and aligned from the center.
        textStyle(BOLD);
        textAlign(CENTER, CENTER);

        //Disable stroke since there's only text in this state.
        noStroke();
    
        //Resets the input.
        this.input = '';
        this.takenNameMsg = '';
    },

    /** Displays instructions as well as the user's current input. */
    update() 
    {
        //Black background.
        background(0);

        //Instructions at the top of the screen.
        textSize(50);
        text('Enter a name to save your score! (3 letters)', width/2, 35);
        textSize(35);
        text(`Your score: ${game.score}.`, width/2, 100);

        //Will display text at the bottom of the screen if the
        //user tries to enter a name that is already taken.
        text(this.takenNameMsg, width/2, 700);

        //Display the user's input in the center.
        textSize(100);
        text(this.input, width/2, height/2);
    },

    /** Adds the pressed key to the user input if it is a letter. */
    keyType() 
    {
        //Don't allow input larger than 3 letters.
        if(this.input.length < 3)
        {
            //Makes the key's string uppercase to simplify verification.
            key = key.toUpperCase();

            //Checks if the pressed key contains a character between A and Z.
            //Since function keys are ignored, only single-character keys 
            //(like 'A', '3' or '\') should be getting tested here.
            if(/[A-Z]/.test(key)) { this.input += key; }
        }
    },

    /**
     * Clears user input if the backspace key is pressed.
     * Try to add the user if enter is pressed.
     */
    keyPress() 
    {
        //Reset input.
        if (keyCode === BACKSPACE) { this.input = ``; }
        
        //Only allow names of 3 characters.
        else if (keyCode === ENTER && this.input.length === 3) 
        {
            //If the user's name isn't taken, switch back to the leaderboard state.
            if(addNewUser(this.input, game.score)) { switchState(leaderboard); }
            //If the name is taken, notify the user.
            else { this.takenNameMsg = `The name '${this.input}' is already taken.`; }
        }
    }
}
"use strict";

let game = 
{
    /** The number of 'turns' (images ignored/deleted) the user has gone through. */
    turnCount: 0,
    /** The number of images the user correctly deleted/ignored. */
    score: 0,
    /** Track if the current image displayed should be ignored/deleted. (true: should delete, false: should ignore) */
    shouldDelete: undefined,
    /** The tags defining images that should be deleted. */
    tagsToCensor: [],

    /**
     * 
     */
    setup()
    { 
        //Greet the user and give a 'tutorial'.
        alert("Welcome back, cleaner.");
        alert("There's more work to do.");
        alert("Just as a reminder: your task here is to filter out content.");
        alert("Use the buttons or voice commands, whichever you prefer.");
        while(!confirm("Are you ready to start?")) { alert("..."); }
        this.start();
    },

    /**
     * 
     */
    start() {
        //Reset the turn amount.
        this.loopCount = 0;
        //Reset the score.
        this.score = 0;
        //Clear the array of tags to censor. 
        this.tagsToCensor = [];

        //Get a new random number (between 4 and 7) for the amount of tags.
        let count = Math.ceil(Math.random() * 4 + 3);
        //Define a temporary variable to aid in tag selection.
        let tempTag;



        //Select 'count' different tags to censor.
        for(let i = 0; i < count; i++) {

            //Select a tag that is not already part of the array.
            do { 
                tempTag = randomElem(tags.concrete); 
            }
            while(this.tagsToCensor.includes(tempTag));

            //Add the selected tag to the array.
            this.tagsToCensor[i] = tempTag;
        }

        let list = "\n";
        this.tagsToCensor.forEach(tag => {
            list += `\n - ${tag}`;
        });
        alert('Delete any image that contains or depicts any of the following.' + list);

        //Start the first prompt.
        this.nextPrompt();
    },


    /**
     * 
     */
    nextPrompt() {
        
        //If the user has gone through 20 turns, then end the game (and end this method).
        if(this.turnCount > 23) {
            this.end();
            return;
        }
        //Otherwise, increase the number of turns.
        this.turnCount++;

        let imageTag;
    
        //Bias the chances of getting certain image tags as to make the experience more intersting.
        if(Math.random() > 0.5)
        {
            //25% of the time, choose an image that needs to be deleted. 
            if(Math.random() > 0.5)
            {
                imageTag = randomElem(this.tagsToCensor);
                this.shouldDelete = true;
            }
            //25% of the time, display an image not to be deleted.
            else
            {
                imageTag = randomElem(tags.abstract);
                this.shouldDelete = false;
            }
        }
        //50% of the time, choose an image that might (unlikely, with all possible choices) need to be deleted.
        else 
        {
            //Pick a random tag from the whole concrete tag list.
            imageTag = randomElem(tags.concrete); 
            //Check if the tag matches one of the list to be censored.
            this.shouldDelete = this.tagsToCensor.includes(imageTag);
        }
    
        //
        getNewImage(imageTag);
    },

    end(){
        //Draw light grey background over the last frame.
        background(220);
        
        //Display end messages.
        alert("Alright, that's enough for now.");
        alert(`You have a rating of ${(this.score*4).toFixed(1)}%`);

        //
        if(confirm("Do you want to continue?"))
        {

        }
    },


    /**
     * Is called automatically by annyang when hearing speech.
     * @param {String} command - What the user said.
     */
    userCall(command) {
        //If the command includes 'delete', take it as a delete command.
        if(command.toLowerCase().includes("delete")){
            this.verifyVerdict(true);
            displayText('Deleting...', 1250);
            this.nextPrompt();
        }
        //Otherwise, if the command includes ignore, take it as an ignore command.
        else if(command.toLowerCase().includes("ignore")){
            this.verifyVerdict(false);
            displayText('Ignored.', 1250);
            this.nextPrompt();
        }
        //Otherwise, display a fake error message.
        else { 
            displayText(`Unrecognized command: '${command}'`); 
        }
    },


    /**
     * Verifies if the user's action (ignore/delete) was correct.
     * @param {boolean} didDelete - If the user chose to delete the image.
     */
    verifyVerdict(didDelete) {
        if(didDelete == this.shouldDelete) { this.score++; }
    }
}


/**
 * Returns a random element from an array.
 * @param {Array} array - Any type of array.
 * @returns A randomly picked element from the array.
 */
 function randomElem(array) { 
    return array[Math.floor(Math.random() * array.length)]; 
}

/**
 * Game state where the player can navigate levels.
 */
let GameState =
{
    //Tracks if the game is paused or not.
    playing: false,

    //Tracks if the player has cleared the level.
    cleared: false,

    //Tracks how long the player takes to complete a level.
    timer: 0,

    //Tracks if the player has restarted recently.
    //Dims the background.
    dim: 0,

    /**
     * Sets the player to the start of the level.
     */
    //De-structure the level object into its components.
    setup({ platformArr, entityArr, track, trackName }) {
        
        music.setTrack(track, trackName);

        Platform.currG = platformArr.g;
        Platform.currC = platformArr.c;
        Platform.currL = platformArr.l;
        Platform.currR = platformArr.r;

        //
        Entity.current = entityArr;

        //Send 'hueChange' a quarter further into the spectrum.
        changeHue(90);

        //Pause the game, resets the player's position, velocity, dash, state
        //and reset switches.
        this.restart();
    },


    /**
     * Computes physics, registers inputs and renders each frame.
     * Is called once per 'draw()' when playing.
     */
    update() {

        //If the game is unpaused, then do boundary checks, player input/movement.
        if (this.playing) {
            //Check if the player is within a trigger box and potentially trigger an effect.
            //TriggerBox.isWithinBound(Player.pos, TriggerBox.allL1);

            //Check if the player is overlapping an entity and potentially trigger its onOverlap function.
            Entity.checkAll(Player, Entity.current);

            //Update the player's position and react to inputs.
            Player.behaviour();

            //Ups the timer by 1.
            this.timer++

            //If ESCAPE is pressed, switch to the paused state.
            if (keyIsDown(27)) {
                //Pause the game.
                this.playing = false;
            }
        }

        //Regardless of pause, if R is pressed, make the player restart the level.
        if (keyIsDown(settings.input.restart)) {
            //Make the player restart.
            this.restart();
        }


        //#region Rendering


        //BACKGROUND

        //Ups the value of 'hueChange' by 0.1 (twice as much as in the menu state).
        changeHue(0.1);

        //Draw a background whose color changes with time and that briefly gets dimmer with if the player is teleported.
        background(hueChange, 100, 60 - this.dim);

        //If the background dim is over 0, lower it by 1.
        if (this.dim > 0) { this.dim--; }


        //TRIGGER BOXES
        //Display all trigger boxes.
        //TriggerBox.displayAll(TriggerBox.allL1);

        //Store the current settings.
        push();

        //Translates the platfroms to be drawn from the player's perspective.
        //Should be moved outside of this function as to only be called once per draw() (for both platforms & entities).
        translate((width/2) - Player.pos.x - camOffset.x, (height/1.5) - Player.pos.y - camOffset.y);

        //ENTITIES
        //Display all entities.
        Entity.displayAll(Entity.current);

        //PLATFORMS
        //Display all platforms.
        Platform.displayAll();

        //Revert the translate.
        pop();

        //PLAYER
        Player.display();


        //TIMER
        //Display how many frames it has been since the player started in the top-left corner.
        text('TIME: ' + this.timer.toLocaleString(undefined, { minimumIntegerDigits: 5, useGrouping: false }), 5, 15);


        //PAUSE MENU

        //If not in the game state, then draw a transparent background over the frame with text.
        if (!this.playing) {
            //Draw a semi-transparent black background.
            background(0, 0, 10, 0.4);

            //Sets the drawing settings to write text.

            push(); //We don't want to keep these drawing settings.
            strokeWeight(5); //Gives a thick outline to text.
            stroke(0, 0, 0); //Set the outline's color to darker grey.

            textSize(120); //Makes the text larger for either of the following message.


            //If the level was cleared, display a different message than in regular pause.

            //After clearing the level, display time taken to complete.
            if (this.cleared) {
                text('CLEARED', 40, 100); //Display that the level was cleared.

                textSize(60); //Reduce the text size.
                text(`You took ${this.timer} frames to complete the level.`, 50, 300); //Display the time it took to clear.
                text('Press ENTER to return to menu.\nPress R to try again.', 50, 650); //Display instructions to quit/resume at the bottom.
            }
            //On regular pause, display controls and objective.
            else {
                text('PAUSED', 40, 100); //Display that the game is paused at the top.

                textSize(60); //Reduce the text size.

                text('CONTROLS', 50, 240); //Display a header in the middle-left.
                text('OBJECTIVE', 800, 240); //Display another header in the middle-right.
                text('Press ENTER to return to menu.\nPress any other key to resume.', 50, 660); //Display instructions to quit/resume at the bottom.

                textSize(40); //Reduce the text size again.

                text('- ARROW KEYS to move.\n- SPACE to jump.\n- Z to dash.\n- R to retry.\n- ESCAPE to pause.', 75, 405); //Display controls in the middle-left.
                text('- Activate all switches.\n- Reach the end.', 875, 335); //Display objectives in the middle-right.
            }
            pop(); //Revert to the previous text drawing settings.

            //Display current track.
            music.displayCurrTrack();


            //Do the following after rendering because otherwise unpausing will result in a frame
            //of delay between removal of the pause overlay and player input being recorded.

            //Unpause the game or quit to menu if a key that isn't ESCAPE is pressed.
            if (keyIsPressed) {
                //If ENTER is pressed, quit to menu.
                if (keyCode === 13) {
                    //Calls the 'MenuState' setup and switch the state to it.
                    switchState(MenuState);
                }
                //If the key isn't ESCAPE or R and the level wasn't cleared, unpause the game.
                //The first two prevent the paused menu from opening/closing itself over and over if ESCAPE/R are held down.
                else if (keyCode != 27 && keyCode != settings.input.restart && !this.cleared) {
                    //Set the playing state to true.
                    this.playing = true;
                }
            }
        }
        //#endregion
    },

    /**
     * Sends the player back to their initial position, removes their velocity, gives them
     * their dash back, resets the timer and switches.
     * Called if the player presses 'ESCAPE'.
     */
    restart() {
        //Reset all switches.
        //Switch.reset(TriggerBox.S1);

        //If there are any switches, since we just reset them, 
        //the goal will be disabled with them.
        //this.tryActivateGoal();

        //Pause the game.
        this.playing = false;

        //Reverts the cleared state if it's true.
        this.cleared = false;

        //Reset the timer to 0.
        this.timer = 0;

        //TEST LEVEL POSITION
        Player.pos.x = 1250;
        Player.pos.y = 800;

        /* LEVEL 1 POSITION
        //Sets the player to their initial position (150, 1500).
        Player.pos.x = 125;
        Player.pos.y = 1575;
        */


        //Don't carry over any previous velocity.
        Player.vel.x = 0;
        Player.vel.y = 0;

        //Give the player their dash back if they didn't have it.
        Player.dash = true;
        Player.dashTimer = 0;

        //Allow the player to jump as soon as they start, even if they are mid-air.
        Player.lastState = 1;
        Player.lastStateTimer = 5;
    },

    /*
    tryActivateGoal() {
        //Tracks if the goal should activate or not.
        //Assume that all switches are active.
        let value = true;

        //For each switch in the array, check if it is active. If it isn't, don't let the goal activate.
        for (let i = 0; i < TriggerBox.S1.length; i++) {
            //If the switch is inactive then the goal should stay inactive as well.
            if (!TriggerBox.S1[i].e.active) {
                //Prevent the goal from activating.
                value = false;

                //If one switch is inactive, then checking for more won't change anything.
                break;
            }
        }
        //Activate the goal if all switches are active. Keep it inactive otherwise.
        TriggerBox.G1.e.active = value;
    }
    */
}
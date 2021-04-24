"use strict";

/**
 * Menu state of the program where the user can choose to quit, adjust settings or start playing.
 */
let MenuState = 
{
    //Menu music.
    track: undefined,
    trackName: "AIRGLOW - Blueshift",

    //Tracks what text should be displayed to ???
    contextualText: "",

    //Tracks if the settings panel is active.
    settingsPanel: false,

    //
    menuButtons: [],
    settingsButtons: [],

    /**
     * Switch to the menu music, disables the settings panel and switches the state.
     */
    setup()
    {
        music.setTrack(this.track, this.trackName);

        //
        this.menuButtons = [
            new StateEntity(new Vector2D(297.5, 375), 300, 50, StateEntity.menuButton, StateEntity.rectCheckHold, this.playSelect, 'PLAY'),
            new StateEntity(new Vector2D(297.5, 500), 300, 50, StateEntity.menuButton, StateEntity.rectCheckHold, this.settingSelect, 'SETTINGS'),
            new StateEntity(new Vector2D(297.5, 625), 300, 50, StateEntity.menuButton, StateEntity.rectCheckHold, this.quitSelect, 'QUIT')
        ];

        this.settingsButtons = [
            new StateEntity(new Vector2D(1265, 635), 70, 15, StateEntity.textButton, StateEntity.rectCheckHold, this.rebindSelect, 'REBIND'),
            new StateEntity(new Vector2D(1270, 482.5), 20, 15, StateEntity.arrowButton, StateEntity.rectCheckHold, this.densityUpSelect, true),
            new StateEntity(new Vector2D(1320, 482.5), 20, 15, StateEntity.arrowButton, StateEntity.rectCheckHold, this.densityDownSelect, false),
            new StateEntity(new Vector2D(1270, 557.5), 20, 15, StateEntity.arrowButton, StateEntity.rectCheckHold, this.volumeUpSelect, true),
            new StateEntity(new Vector2D(1320, 557.5), 20, 15, StateEntity.arrowButton, StateEntity.rectCheckHold, this.volumeDownSelect, false)  
        ]

        //Send 'hueChange' a quarter further into the spectrum.
        changeHue(90);

        //Start with the settings panel closed.
        this.settingsPanel = false;
    },

    /**
     * Does relevant behaviour if the user clicks on a button or hovers over it.
     * Displays an image of a title, three large buttons and a potential settings panel.
     * Is called one per 'draw()' when on the menu.
     */
    update()
    {
        //Assume that no button is selected.
        this.contextualText = "";

        //Check if the mouse is hovering over any button.
        //If it is 'selected' will receive the index of the button.
        //TriggerBox.isWithinBound(new Vector2D(mouseX, mouseY), TriggerBox.allM);

        Entity.checkAll(mouse, this.menuButtons);
        

        //Ups the value of 'hueChange' by 0.05.
        changeHue(0.05);

        //Draw a background with color dependent on time.
        background(hueChange, 100, 85);

        //We don't want to keep the following drawing settings.
        push();

        //Makes rectangles drawn from the corner, simplying things in our case.
        //Useless since of text behaves like CORNER when in RADIUS.
        //rectMode(CORNER);


        //SETTINGS PANEL

        //If the settings panel is active, render it.
        if(this.settingsPanel)
        {
            Entity.checkAll(mouse, this.settingsButtons);
            
            //Makes the rectangle's fill white.
            stroke(100);
            strokeWeight(5);

            //Switch back to the previous fill.
            fill(0);
            //Draw the body of the window.
            rect(1065, 500, 295, 190);

            noStroke();

            //Make the following text white.
            fill(100);

            //Increase the text size.
            textSize(40);
            //Write the title of the panel.
            text('SETTINGS MENU', 785, 350);

            //Reduce the text size.
            textSize(25);
            //Write the individual setting names along with their respective value.
            text('Display Resolution ', 815, 410);
            text(`${width} x ${height}`, 1200, 410); //Displays the user's resolution which depends on thier window size.

            text('Pixel Density', 815, 485);
            text((settings.density / 10).toFixed(1), 1200, 485); //Ranges from 0.1 to 3.0.

            text('Audio Volume', 815, 560);
            text((settings.volume / 10).toFixed(1), 1200, 560); //Ranges from 0.1 to 1.0.

            text('Controls', 815, 635);

            textSize(15);
            text(`Reccomended values are around 1500 x 750. Modify with 'Ctrl' + 'Scroll'.`, 825, 440);
            text('Affects the sharpness of the image. Lower to increase performance.', 825, 515);
            text('Modifies of how loud all game sounds are.', 825, 590);
            text('Use to re-map game controls.', 825, 665);

            Entity.displayAll(this.settingsButtons);
        }

        //Make the text white.
        fill(100);

        //Make the text much larger.
        textSize(150);
        //Write the game's title.
        text("PROJECT VECTOR", 50, 150);

        //Reduce the text's size.
        textSize(40);
        //Write a subtitle.
        text("A game about moving fast and making mistakes.", 60, 245);

        //Reduce the text size's further
        textSize(30);

        //Display the text under the buttons.
        text(this.contextualText, 50, 725);
        
        //Revert to the previous drawing settings.
        pop();

        Entity.displayAll(this.menuButtons);

        //Display current track.
        music.displayCurrTrack();

        //Draw the cursor.
        mouse.display();

        //#endregion
    },


    /** Free up memory used by the state before exiting. */
    exit() {        
        this.menuButtons = null;
        this.settingsButtons = null;
        this.contextualText = "";
    },

    
    //#region BUTTON FUNCTIONS

    playSelect() {
        if(mouse.click) {
            //Temporary manual assignment.
            switchState(GameState, Level.list[0]);
        }
        MenuState.contextualText = "Start playing. Adjusting settings first is recommended.";
    },

    settingSelect() {
        if(mouse.click) {
            MenuState.settingsPanel = !MenuState.settingsPanel;
        }
        MenuState.contextualText = "Adjust inputs, audio volume or pixel density.";
    },

    quitSelect() {
        if(mouse.click) {
            quit();
        }
        MenuState.contextualText = "Quit the game.";
    },

    densityUpSelect() {
        if(mouse.click) {
            settingsHandler.densityUp();
        }
        MenuState.contextualText = "Increase the pixel density.";
    },

    densityDownSelect() {
        if(mouse.click) {
            settingsHandler.densityDown();
        }
        MenuState.contextualText = "Decrease the pixel density.";
    },
    
    volumeUpSelect() {
        if(mouse.click) {
            settingsHandler.volumeUp();
        }
        MenuState.contextualText = "Increase the game's volume.";
    },

    volumeDownSelect() {
        if(mouse.click) {
            settingsHandler.volumeDown();
        }
        MenuState.contextualText = "Decrease the game's volume.";
    },

    rebindSelect() {
        if(mouse.click) {

            //Record the previous update function.
            let pastUpdate = MenuState.update;
            //Get all of the game actions whose inputs can be re-mapped.
            let actions = Object.getOwnPropertyNames(settings.input);
            let keyIndex = 0;
            let keyDown = false;
            let keyName = 'none';
            
            //Get the name of the key on
            window.onkeydown = (event) => {
                keyName = event.code;
            }

            //Assign a new one.
            MenuState.update = () => {

                background(0, 0, 50, 0.1);

                push();

                //
                rectMode(CORNERS);
                fill(0);
                stroke(100);
                strokeWeight(5);

                rect(475, 250, 1025, 550);

                textAlign(CENTER);
                noStroke();
                fill(100);


                textSize(100);
                text(actions[keyIndex].toUpperCase(), 750, 390);
                textSize(30);
                text('Press the desired key for:', 750, 285);
                text('Current: ' + settings.inputName[actions[keyIndex]], 750, 455);
                textSize(20);
                text(`(Press ESCAPE to skip)`, 750, 525);

                text(name, 750, 550);

                pop();

                if(keyIsPressed) {
                    if(!keyDown) {

                        keyDown = true;
                        if(keyCode != 27) {
                            settingsHandler.modifyInput(actions[keyIndex], keyCode, keyName);
                        }

                        keyIndex++;
                        if (keyIndex >= actions.length) {
                            
                            //Return to the main update function.
                            MenuState.update = pastUpdate;

                            //Remove the event function.
                            window.onkeydown = null;
                        }
                    }
                }
                else {
                    keyDown = false;
                }
            };
        }
        MenuState.contextualText = "Rebind game inputs.";
    }

    //#endregion
}


//Code that was removed but might be re-implemented later.
/*
        //MUSIC VISUALIZER

        //Creates the music visualizer which is a vignette effect 'beating' with the amplitude of the music.
        //Display the music visualizer if the music is playing.
        if(gameMusic.isPlaying())
        {
            //Measure the level of amplitude and send it to the amplitude variable.
            ampCurrent = ampAnalyzer.getLevel();
            //Measures the level of frequencies and sends them to the frequency array.
            freqsCurrent = freqAnalyzer.analyze();

            //We don't want to keep these drawing settings.
            push();


            //BEATING VIGNETTE

            //Set the size of the circle to scale with the size of the screen.
            size = Math.hypot(width, height) - ampCurrent * 100;

            //Offset everyting until the next pop() so that (0,0) is horizontally in the middle and
            //vertically far below what's in view (just under half the beating circle's height).



            //Makes a pattern within the beating circle going from dark to lighter shades.
            //A multiple of the window's height is removed from the beating circle's size to restrain in to the bottom of the window.

            //Draws a large, almost black circle at the point specified by translate above.
            fill(0, 0, 10);
            circle(0, 0, 1.03 * size);

            //Draws a slightly smaller, slighly lighter circle at the same point.
            fill(0, 0, 20);
            circle(0, 0, 1.02 * size);

            //Draws a slightly smaller, slighly lighter circle at the same point.
            fill(0, 0, 25);
            circle(0, 0, 1.01 * size);

            //Draws a slightly smaller, slighly lighter circle at the same point.
            fill(0, 0, 30);
            circle(0, 0, 1 * size);

            //Draws a slightly smaller, slighly lighter circle at the same point.
            fill(0, 0, 35);
            circle(0, 0, 0.99 * size);

            pop(); //Revert to the previous drawing and position settings.
        }
*/
"use strict";

/**
 * Menu state of the program where the user can choose to quit, adjust settings or start playing.
 */
let MenuState = 
{
    //Tracks which button is currently selected.
    selected: 0,

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
        //#region PLACE INSIDE FUNCTION

        //Unlocks the analyzers from 'currentMusic' as it's switching track.
        //Not doing so causes the analyzers to stop working entirely.
        freqAnalyzer.setInput();
        ampAnalyzer.setInput();

        //Stop any currently playing music.
        currentMusic.stop();
        //Switch the current track to the playing state music.
        currentMusic = menuMusic;
        //Make the current track loop.
        currentMusic.loop();

        //Change the index of the music name accordingly.
        currentMusicIndex = 0;

        //Sets the music as the input source. (Makes them ignore all other sounds, if any.)
        freqAnalyzer.setInput(currentMusic);
        ampAnalyzer.setInput(currentMusic);

        //#endregion

        //
        this.menuButtons = [
            new StateEntity(new Vector2D(297.5, 375), 300, 50, StateEntity.textButton, StateEntity.rectCheckHold, this.playSelect, 'PLAY'),
            new StateEntity(new Vector2D(297.5, 500), 300, 50, StateEntity.textButton, StateEntity.rectCheckHold, this.settingSelect, 'SETTINGS'),
            new StateEntity(new Vector2D(297.5, 625), 300, 50, StateEntity.textButton, StateEntity.rectCheckHold, this.quitSelect, 'QUIT')
        ];

        this.settingsButtons = [
            new StateEntity(new Vector2D(1270, 527.5), 20, 12.5, StateEntity.arrowButton, StateEntity.rectCheckHold, this.densityUpSelect, true),
            new StateEntity(new Vector2D(1320, 527.5), 20, 12.5, StateEntity.arrowButton, StateEntity.rectCheckHold, this.densityDownSelect, false),
            new StateEntity(new Vector2D(1270, 602.5), 20, 12.5, StateEntity.arrowButton, StateEntity.rectCheckHold, this.volumeUpSelect, true),
            new StateEntity(new Vector2D(1320, 602.5), 20, 12.5, StateEntity.arrowButton, StateEntity.rectCheckHold, this.volumeDownSelect, false)
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
            rect(1065, 510, 295, 145);

            noStroke();

            //Make the following text white.
            fill(100);

            //Increase the text size.
            textSize(40);
            //Write the title of the panel.
            text('SETTINGS MENU', 785, 400);

            //Reduce the text size.
            textSize(25);
            //Write the individual setting names along with their respective value.
            text('Display Resolution ', 815, 455);
            text(`${width} x ${height}`, 1200, 455); //Displays the user's resolution which depends on thier window size.

            text('Pixel Density', 815, 530);
            text((settings.density / 10).toFixed(1), 1200, 530); //Ranges from 0.1 to 3.0.

            text('Audio Volume', 815, 605);
            text((settings.volume / 10).toFixed(1), 1200, 605); //Ranges from 0.1 to 1.0.

            textSize(15);
            text(`Reccomended values are around 1500 x 750. Modify with 'Ctrl' + 'Scroll'.`, 825, 485);
            text('Affects the sharpness of the image. Lower to increase performance.', 825, 560);
            text('Modifies of how loud all game sounds are.', 825, 635);

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
            switchState(PlayingState);
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
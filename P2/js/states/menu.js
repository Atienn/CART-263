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

    //Holds the text of each main menu button.
    buttonText:
    [
        'PLAY',
        'SETTINGS',
        'QUIT'
    ],


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

        //Send 'hueChange' a quarter further into the spectrum.
        changeHue(90);

        //Start with the settings panel closed.
        this.settingsPanel = false;

        //Switch to the menu state.
        state = MenuState;
    },

    /**
     * Does relevant behaviour if the user clicks on a button or hovers over it.
     * Displays an image of a title, three large buttons and a potential settings panel.
     * Is called one per 'draw()' when on the menu.
     */
    update()
    {
        //Assume that no button is selected.
        this.selected = -1;

        //Check if the mouse is hovering over any button.
        //If it is 'selected' will receive the index of the button.
        TriggerBox.isWithinBound(new Vector2D(mouseX, mouseY), TriggerBox.allM);

        //If the mouse is pressed 
        if(mouseClick)
        {
            //Change the behaviour depending on which button is selected, if any.
            switch(this.selected)
            {
                //PLAY
                //Calls the 'PlayingState' setup, switching the game state to it.
                case 0:
                    PlayingState.setup();
                break;

                //SETTINGS
                case 1:
                    //If the settings panel is closed, open it. If it's open, close it.
                    this.settingsPanel = !this.settingsPanel;
                break;

                //QUIT
                //Makes the user leave the page, either by closing it or by sending them to their previously visited page.
                case 2:
                    quit();
                break;

                //INCREASE DENSITY
                case 3:
                    //If the density is below 3.0, add 0.1.
                    if(settings.density < 30)
                    {
                        //Add 1 to the density counter.
                        settings.density++;
                        //Apply the change, dividing by 10 to only add 0.1.
                        pixelDensity(settings.density / 10);
                    }
                break;
                
                //LOWER DENSITY
                case 4:
                    //If the density is above 0.1, subtract 0.1.
                    if(settings.density > 1)
                    {
                        //Remove 1 from the density counter.
                        settings.density--;
                        //Apply the change, dividing by 10 to only remove 0.1.
                        pixelDensity(settings.density / 10);
                    }
                break;

                //INCREASE VOLUME
                case 5:
                    //If the volume is below 1.0, add 0.1.
                    if(settings.volume < 10)
                    {
                        //Add 1 to the volume counter.
                        settings.volume++;
                        //Apply the change, dividing by 10 to only add 0.1.
                        masterVolume(settings.volume / 10);
                    }
                break;

                //DECREASE VOLUME
                case 6:
                    //If the volume is above 0.0, remove 0.1.
                    if(settings.volume > 0)
                    {
                        //Remove 1 from the volume counter.
                        settings.volume--;
                        //Apply the change, dividing by 10 to only remove 0.1.
                        masterVolume(settings.volume / 10);
                    }
                break;
            }
        }

        //#region Rendering

        //Ups the value of 'hueChange' by 0.05.
        changeHue(0.05);

        //Draw a background with color dependent on time.
        background(hueChange, 100, 85);

        //We don't want to keep the following drawing settings.
        push();


        //Makes rectangles drawn from the corner, simplying things in our case.
        rectMode(CORNER);


        //BUTTONS

        //Makes the rectangle's fill white.
        fill(100);
        //For each button, draw a rectangle which will act as an outline.
        for(let i = 0; i < 3; i++)
        {
            rect(0, (i*125)+340, 600, 100);
        }

        //Make's the rectangle's fill black.
        fill(0);

        //For each button, draw a rectangle going from the left side of the screen.
        for(let i = 0; i < 3; i++)
        {
            rect(0, (i*125)+345, 595, 90);
            
            //If the button is selected, add a semi-transparent highlight over it.
            if(this.selected === i)
            {
                //Switch to a half-transparent grey fill.
                fill(0,0,100,0.25);
                //Draw the highlight.
                rect(0, (i*125)+340, 600, 100);
                //Switch back to the previous fill.
                fill(0);
            }
        }


        //SETTINGS PANEL

        //If the settings panel is active, render it.
        if(this.settingsPanel)
        {
            //Makes the rectangle's fill white.
            fill(100);
            //Draw the outline of the window.
            rect(765, 360, 600, 300);

            //Switch back to the previous fill.
            fill(0);
            //Draw the body of teh window.
            rect(770, 365, 590, 290);


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
            text((this.density / 10).toFixed(1), 1200, 530); //Ranges from 0.1 to 3.0.

            text('Audio Volume', 815, 605);
            text((this.volume / 10).toFixed(1), 1200, 605); //Ranges from 0.1 to 1.0.

            textSize(15);
            text(`Reccomended values are around 1500 x 750. Modify with 'Ctrl' + 'Scroll'.`, 825, 485);
            text('Affects the sharpness of the image. Lower to increase performance.', 825, 560);
            text('Modifies of how loud all game sounds are.', 825, 635);

            //Draw arrows representing increase/decrease buttons.
            triangle(1270, 520, 1260, 535, 1280, 535); //Up arrow, pixel density.
            triangle(1320, 535, 1310, 520, 1330, 520); //Down arrow, pixel density.
            triangle(1270, 595, 1260, 610, 1280, 610); //Up arrow, audio volume.
            triangle(1320, 610, 1310, 595, 1330, 595); //Down arrow, audio volume.
            

            //If an increase/decrease button is selected, draw a highlight over it.
            if(this.selected > 2)
            {
                //Make the highlight semi-transparent.
                fill(0,0,100,0.25);

                //Draw a semi-transparent rectangle over the button.
                switch(this.selected)
                {
                    //Density increase highlight.
                    case 3:
                        rect(1250, 515, 40, 25);
                    break;

                    //Density decrease highlight.
                    case 4:
                        rect(1300, 515, 40, 25);
                    break;

                    //Volume increase highlight.
                    case 5:
                        rect(1250, 590, 40, 25);
                    break;

                    //Volume decrease highlight.
                    case 6:
                        rect(1300, 590, 40, 25);
                    break;
                }

            }
        }
        

        //TEXT

        //Makes the text larger.
        textSize(50);

        //Make the text white.
        fill(100);
        //For each button, write its respective text in the left-center as to align each button's text.
        for(let i = 0; i < 3; i++)
        {
            text(this.buttonText[i],50,(i*125)+395);
        }

        //Make the text much larger.
        textSize(150);
        //Write the game's title.
        text("PROJECT VECTOR", 50, 150);

        //Reduce the text's size.
        textSize(40);
        //Write a subtitle.
        text("A game about going fast and making mistakes.", 60, 245);

        //Reduce the text size's further
        textSize(30);
        //Chooses a message to display under the buttons if they are selected.
        switch(this.selected)
        {
            //Play message.
            case 0:
                this.contextualText = "Start playing. Adjusting settings first is recommended."
            break;

            //Settings message.
            case 1:
                this.contextualText = "Adjust settings like audio volume or pixel density."
            break;

            //Quit message.
            case 2:
                this.contextualText = "Quit the game."
            break;

            //Increase density message.
            case 3:
                this.contextualText = "Increase the pixel density."
            break;

            //Decrease density message.
            case 4:
                this.contextualText = "Lower the pixel density."
            break;

            //Increase volume message.
            case 5:
                this.contextualText = "Increase the audio volume."
            break;

            //Decrease volume message.
            case 6:
                this.contextualText = "Lower the audio volume."
            break;

            //If no buttons are selected, don't show any text.
            default:
                this.contextualText = "";
            break;
        }

        //Display the text under the buttons.
        text(this.contextualText, 50, 725)
        
        //Revert to the previous drawing settings.
        pop();

        //#endregion
    }
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
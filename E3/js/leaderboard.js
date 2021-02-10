"use strict";

/** State where a leaderboard of the previous scores is displayed. */
let leaderboard = 
{
    /** Sets up display settings. */
    setup() { textAlign(LEFT, CENTER); },

    /** Displays the users with the top 5 scores in a leaderboard. */
    update()
    {
        //Black background.
        background(0);

        //Set text as white, bold and aligned from the center.
        fill(255);
        textStyle(BOLD);

        //'Page' title.
        textSize(75);
        text('LEADERBOARD', 15, 60);

        //Leaderboard headers.
        textSize(45);
        text('Rank', 175, 193);
        text('Name', 375, 193);
        text('Score', 700, 193);

        //Instructions at the bottom.
        textSize(40);
        text('Press ENTER to play.\nPress BACKSPACE to reset the leaderboard.', 50, 695);

        //Disable bold style for the text inside the leaderboard.
        textStyle(NORMAL);

        for(let i = 0; i < 5; i++)
        {
            //Make the leaderboard rows alternate between dark shades of grey.
            if(i % 2 == 0) { fill(50); }
            else { fill(25); }

            //Draw the row.
            rect(540, 265 + 75*i, 780, 75);

            //Set text to white.
            fill(255);

            //User rank.
            text(`#${i+1}`, 200, 268 + 75*i);
            //User name. Will display '---' if there's not enough stored users.
            text(userData.users[i] == null ? '---' : userData.users[i].name, 400, 268 + 75*i);
            //User score. Will display '---' if there's not enough stored users. Adds leading 0s to make a 6 character number.
            text(userData.users[i] == null ? '---' : userData.users[i].score.toString().padStart(6, '0'), 725, 268 + 75*i);
        }
    },

    /** Do nothing. Used by other states. */
    keyType() { },

    /** Switch to the game state or reset the leaderboard. */
    keyPress() 
    {
        if (keyCode === ENTER) { switchState(game); }
        else if(keyCode === BACKSPACE) { resetUserData(); }
    }
}

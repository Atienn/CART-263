"use strict";

/** Displays a leaderboard using the locally stored users. */
let leaderboard = 
{
    /** Sets up display settings. */
    setup() 
    {
        textAlign(LEFT, CENTER);
    },

    /** Displays the users with the top 5 scores in a leaderboard. */
    update()
    {
        background(0);

        fill(255);
        textStyle(BOLD);


        textSize(75);
        text('LEADERBOARD', 15, 60);

        textSize(45);
        text('Rank', 175, 193);
        text('Name', 375, 193);
        text('Score', 700, 193);

        textSize(40);
        text('Press ENTER to play.\nPress BACKSPACE to reset the leaderboard.', 50, 695);

        textStyle(NORMAL);

        for(let i = 0; i < 5; i++)
        {
            if(i % 2 == 0) { fill(50); }
            else { fill(25); }
            rect(540, 265 + 75*i, 780, 75);

            fill(255);

            textAlign(LEFT, CENTER);
            text(`#${i+1}`, 200, 268 + 75*i);
            text(userData.users[i] == null ? '---' : userData.users[i].name, 400, 268 + 75*i);

            text(userData.users[i] == null ? '---' : userData.users[i].score.toString().padStart(6, '0'), 725, 268 + 75*i);
        }
    },

    /** Do nothing. Used by other states. */
    keyType() { },

    /** Switch to the game state. */
    keyPress() 
    {
        if (keyCode === ENTER) { switchState(game); }
        else if(keyCode === BACKSPACE) { resetUserData(); }
    }
}

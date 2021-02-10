"use strict";

/** Displays a leaderboard using the locally stored users. */
let leaderboard = 
{
    /** Do nothing. Used by other states. */
    setup() { },

    /** Displays the users with the top 5 scores in a leaderboard. */
    update()
    {
        background(0);

        fill(255);
        textStyle(BOLD);
        textAlign(LEFT, CENTER);

        textSize(75);
        text('LEADERBOARD', 15, 60);

        textSize(45);
        text('Rank', 175, 203);
        text('Name', 375, 203);
        text('Score', 700, 203);
        text('PRESS ENTER TO PLAY', 50, 700);

        textStyle(NORMAL);

        for(let i = 0; i < 5; i++)
        {
            if(i % 2 == 0) { fill(50); }
            else { fill(25); }
            rect(540, 275 + 75*i, 780, 75);

            fill(255);

            textAlign(LEFT, CENTER);
            text(`#${i+1}`, 200, 278 + 75*i);
            text(userData.users[i] == null ? '---' : userData.users[i].name, 400, 278 + 75*i);

            text(userData.users[i] == null ? '---' : userData.users[i].score.toString().padStart(6, '0'), 725, 278 + 75*i);
        }
    },

    /** Do nothing. Used by other states. */
    keyType() { },

    /** Switch to the game state. */
    keyPress() 
    {
        //if (keyCode === ENTER) { switchState(GAMESTATE); }
    }
}

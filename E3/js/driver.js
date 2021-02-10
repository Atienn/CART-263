/*
  Exercise 3
  
*/
"use strict";

let userData;
let state;

/**
 * Is called once on startup.
 */
function setup()
{
    //Create a window-sized black canvas.
    createCanvas(windowWidth, windowHeight);
    background(0);

    frameRate(20);

    rectMode(CENTER);

    //Make text large and aligned from the center.
    textSize(45);


    //Check if there is already data stored.
    userData = JSON.parse(localStorage.getItem(`E3:UserData`));
    //If user data doesn't exist yet, create new empty data holder.
    if(!userData) { resetUserData(); }

    //
    switchState(leaderboard);
}


/**
 * Is called once per frame.
 */
function draw() { state.update(); }


/**
 * Is called when the user types a key (ignores function keys like Shift and Control).
 */
function keyTyped() { state.keyType(); }


/**
 * Is called whenever the user is types a key on their keyboard.
 */
function keyPressed() { state.keyPress(); }


/**
 * Adjusts the size of what's displayed to match the window.
 * Is automatically called if the window is resized at any point.
 */
function windowResized()
{
    //Resizes the canvas with the dimensions of the window.
    resizeCanvas(windowWidth, windowHeight);
}



/** Safely switches to a new state by calling it's setup function first. */
function switchState(newState)
{
    state = newState;
    newState.setup();
}


/**
 * 
 */
function addNewUser(userName, userScore)
{
    let alreadyTaken;

    for(let i = 0; i < userData.users.length; i++)
    {
        if(userData.users[i].userName == userName) { alreadyTaken = true; }
    }

    if(alreadyTaken) { alert(`Username '${userName}' is already taken!`); }
    else
    {
        //Simultaneously add a new user to the users array and updates the user count.
        userData.userCount = userData.users.push({ name: userName, score: userScore });

        //Sort the array by user score (from highest to lowest).
        userData.users.sort((userA, userB) => { return userB.score - userA.score; })

        //Override the old user data to save the new user.
        localStorage.setItem(`E3:UserData`, JSON.stringify(userData));
    }
}

/** Overrides current user data (if any) with an empty object. */
function resetUserData()
{
    userData = { userCount: 0, users: [] };
    localStorage.setItem(`E3:UserData`, JSON.stringify(userData));
}
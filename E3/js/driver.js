/*
  Exercise 3 - Quicktype
  
  Basic game where the user must type as many letters displayed on screen as possible.
  Saves player score and name locally. 
*/

"use strict";

//Tracks the locally stored data.
let userData;
//The game's state.
let state;


/**
 * Creates canvas, sets basic settings and gets local data (if any).
 * Is called once on startup.
 */
function setup()
{
    //Create a window-sized black canvas.
    createCanvas(windowWidth, windowHeight);
    
    //Slow framerate. The game has no animation so this just 
    //lightens the computational load at basically no cost.
    frameRate(20);

    //Make recatangles drawn from the center (applies for all game states).
    rectMode(CENTER);

    //Get locally stored data if any is available.
    userData = JSON.parse(localStorage.getItem(`E3:UserData`));
    //If user data doesn't exist yet, create new empty data holder.
    if(!userData) { resetUserData(); }

    //Start the game in the leaderboard state.
    switchState(leaderboard);
}


/**
 * Is called once per frame.
 * Calls the current state's update.
 */
function draw() { state.update(); }


/**
 * Is called when the user types a key (ignores function keys like Shift and Control).
 * Calls the current state's key typed event.
 */
function keyTyped() { state.keyType(); }


/**
 * Is called whenever the user is types a key on their keyboard.
 * Calls the current state's key pressed event.
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
 * Tries to add a user to the local storage. 
 * Will fail if the new user's name is already taken.
 * @param {String} userName The new user's name.
 * @param {Number} userScore The new user's score in Quicktype.
 * @returns {boolean} If the user was successfully added to the array.
 */
function addNewUser(userName, userScore)
{
    //Assume the given name isn't already taken.
    let alreadyTaken = false;

    //Verify and correct the assumption if it was wrong. 
    for(let i = 0; i < userData.users.length; i++)
    {
        if(userData.users[i].name == userName) { alreadyTaken = true; }
    }

    //Don't add the user to the list if its name has already been taken.
    if(!alreadyTaken) 
    {
        //Simultaneously add a new user to the users array and updates the user count.
        userData.userCount = userData.users.push({ name: userName, score: userScore });

        //Sort the array by user score (from highest to lowest).
        userData.users.sort((userA, userB) => { return userB.score - userA.score; })

        //Override the old user data to save the new user.
        localStorage.setItem(`E3:UserData`, JSON.stringify(userData));
    }

    //Returns if the user was successfully added to the list.
    return !alreadyTaken;
}

/** Overrides current user data (if any) with an empty user list. */
function resetUserData()
{
    userData = { users: [] };
    localStorage.setItem(`E3:UserData`, JSON.stringify(userData));
}
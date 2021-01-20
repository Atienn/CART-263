
//Tracks if the user has clicked their mouse on the specific frame it's called on.
let mouseClick = false;

//
let reducedHeight;

//
let timer;

//
let wantedTypeNum;
let wantedTypeText;

//
let images = [[],[],[],[]];


/**
 * Loads all images required for the game.
 * This function is called and completed before any other.
 */
function preload()
{
    images[0][0] = loadImage('assets/images/clot1.png');
    images[0][1] = loadImage('assets/images/clot2.png');
    images[0][2] = loadImage('assets/images/clot3.png');

    images[1][0] = loadImage('assets/images/food1.png');
    images[1][1] = loadImage('assets/images/food2.png');
    images[1][2] = loadImage('assets/images/food3.png');

    images[2][0] = loadImage('assets/images/furn1.png');
    images[2][1] = loadImage('assets/images/furn2.png');
    images[2][2] = loadImage('assets/images/furn3.png');

    images[3][0] = loadImage('assets/images/tech1.png');
    images[3][1] = loadImage('assets/images/tech2.png');
    images[3][2] = loadImage('assets/images/tech3.png');
}


/**
 * 
 * Is called once on startup.
 */
function setup()
{
    //
    createCanvas(windowWidth, windowHeight);
    reducedHeight = windowHeight - 25;
    background(175);

    imageMode(CENTER);

    strokeWeight(25);
    strokeCap(SQUARE);

    textAlign(CENTER,CENTER);
    textSize(20);
    fill(125);

    for(let i = 0; i < 25; i++)
    {
        Item.current[i] = Item.Random();
        Item.current[i].display();
    }
    switchType();
    timer = 180;
}

/**
 * 
 * Is called 60 times per second.
 */
function draw()
{
    if(mouseClick)
    {
        for(let i = Item.current.length - 1; i > 0; i--)
        {
            if(Item.current[i].isMouseNear() && Item.current[i].isCorrectType())
            {
                Item.current[i] = Item.Random();
                switchType();
                timer = 180;
                break;
            }
        }
    }

    //Now that any logic is done, assume that the user won't click next frame.
    //Will be corrected by 'mousePressed' if the user does click.
    mouseClick = false;

    if(timer > 0) { timer--; }


    background(175);

    for(let i = 0; i < Item.current.length; i++)
    {
        Item.current[i].move();
        Item.current[i].display();
    }

    stroke(0);
    line(0, reducedHeight + 13, width, reducedHeight + 13);

    stroke(0,255,0);
    line(0, reducedHeight + 13,(timer / 180) * width, reducedHeight + 13);

    noStroke();
    text(`I am looking for ${wantedTypeText}.`, 0.5 * width, reducedHeight + 14);
}


/**
 * Only sets 'mouseClick' to true on the frame the user clicks their mouse.
 * This is very useful since it prevents any double input and the condition
 * can be checked with a global variable.
 */
function mousePressed() { mouseClick = true; }


/**
 * 
 */
function switchType()
{
    //
    let newType;

    //
    do { newType = randomInt(4); }
    while(newType == wantedTypeNum);

    //
    wantedTypeNum = newType;

    switch(wantedTypeNum)
    {
        case 0: wantedTypeText = 'a piece of CLOTHING'; break;
        case 1: wantedTypeText = 'some FOOD'; break;
        case 2: wantedTypeText = 'a piece of FURNITURE'; break;
        case 3: wantedTypeText = 'an ELECTRONIC item'; 
    }
}


/**
 * Returns a random integer higher or equal to 0 and less than 'max'.
 * @param {*} max The returned number's maximal limit (exclusive).
 */
function randomInt(max)
{
    return Math.floor(Math.random() * max);
}


/**
 * Adjusts the size of what's displayed to match the window.
 * Is automatically called if the window is resized at any point.
 */
function windowResized()
{
    //Resizes the canvas with the values of the window
    resizeCanvas(windowWidth, windowHeight);
    //Recalculate the screen height used for items.
    reducedHeight = windowHeight - 25;
}
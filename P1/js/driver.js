/****************
CLEANER
Étienne Racine

Built off template-p5-project.
****************/
"use strict"

let imgInfo;
let imgTags;
let imgHolder;
let imgLoading;
let infoRequest;

let output;

//HTML elements.
let sideRight;
let centerArea;
let canvas;

//
let currentImage;

let currentTimeout = "";


function preload()
{
    imgTags = loadJSON("assets/data/tags.json", () => { imgTags.length = Object.keys(imgTags).length; });
}

function setup()
{
    //Only attempt to start annyang if it is present.
    if(annyang)
    {
        //Makes annyang call [] with parameter ' ' when it recognizes speech.
        annyang.addCommands({ '*command': userCall });
        //Stars listening for voice input.
        annyang.start();
    }

    //Get the reference of HTML elements.
    centerArea = document.getElementById("center");
    sideRight = document.getElementById("right");
    output = document.getElementById("output");
    

    //Create canvas and make it fit within the center area.
    canvas = createCanvas(centerArea.clientWidth, centerArea.clientHeight);
    canvas.parent(centerArea);

    //Draw images from the center.
    imageMode(CENTER);
    

    //Create an html holder for the image.
    imgHolder = document.createElement('img');
    
    //imgHolder.style = "visibility: hidden;"

    //
    document.body.appendChild(imgHolder);

    //Loading an image after assigning it a new source is asynchronous.
    imgHolder.onload = () => 
    {
        //Display the image on the canvas.
        currentImage = select("img");
        displayImage(currentImage);

        //Stop rendering the html image.
        imgHolder.src = "";

        //Now that the image has loaded, let other requests happen.
        imgLoading = false;
    }
}


function userCall(command)
{
    if(command.toLowerCase().includes("ignore"))
    {
        outputText('Ignored.', 1250);
        showImage(randomTag());
    }
    else if(command.toLowerCase().includes("delete"))
    {
        outputText('Deleting...', 1250);
        showImage(randomTag());
    }
    else
    {
        outputText(`Unknown command: '${command}'`);
    }
}


function randomTag() { return randomElem(randomElem(imgTags)); }

function randomElem(arr) { return arr[Math.floor(Math.random() * arr.length)]; }


function showImage(tag)
{
    //End the function early if a another request is being made.
    if(imgLoading) 
    {
        outputText('Image is still loading...')
        return; 
    }

    //Prevent new requests from being made while this one is being sent/received.
    imgLoading = true;

    //Create a new request.
    infoRequest = new XMLHttpRequest();

    //Get the json info from Flickr. Search for the info of 9 images with the specified tag.
    infoRequest.open('GET', 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=bfa53076ee93e8d9dc477cb44589beb6&sort=relevant&per_page=9&format=json&tags=' + tag);
    //Specify how the response should be intepreted.
    infoRequest.responseType = 'text';
    
    //Specify callback function.
    infoRequest.onload = () => 
    {
        //Convert the fetched info into an object. 
        //The returned text always has "jsonFlickrApi()" encapsulating it, which is why we only care about the substring inside of it.
        let infoArr = JSON.parse(infoRequest.response.substring(14, infoRequest.response.length - 1)).photos;
        //console.log(infoArr);

        //Select a random image from the returned array.
        do { imgInfo = infoArr.photo[Math.floor(Math.random() * infoArr.photo.length)]; }
       
        //Sometimes, the image info isn't correctly returned, resulting in it being 'undefined'.
        //Try to get another picture if that is the case.  
        while(typeof imgInfo == 'undefined');

        //Free the memory used by the requested info since it's not needed anymore.
        infoArr = null;

        //Construct a source link for the image element using the picture's info.
        //The '_b' at the end specifies the image size as 'large' (~1024x768).
        //Will call imgHolder.onload() when loaded.
        imgHolder.src = `http://farm${imgInfo.farm}.staticflickr.com/${imgInfo.server}/${imgInfo.id}_${imgInfo.secret}_b.png`;
    };

    //Send the request.
    infoRequest.send();
}


/**
 * Draws a new image onto the canvas while conserving its aspect ratio.
 * @param {Image} img The image to display.
 */
function displayImage(img)
{
    background(220);
    if( (img.width - width) > (img.height - height))
    { image(currentImage, width/2, height/2, width, img.height * (width/img.width)); }
    else
    { image(currentImage, width/2, height/2, img.width * (height/img.height), height); }
}


/**
 * Displays text at the bottom of the screen for a set amount of time. 
 * @param {String} text The string of text to display.
 * @param {Number} duration (Optional) The amount of time (in ms) to display for.
 */
function outputText(text, duration = 3000)
{
    clearTimeout(currentTimeout);
    output.innerHTML = text;
    currentTimeout = setTimeout(() => { output.innerHTML = ""; }, duration)
}


/**
 * Resizes the canvas and redraws its content.
 * Is called automatically when the window is resized.
 */
function windowResized()
{
    resizeCanvas(centerArea.clientWidth, centerArea.clientHeight);

    //Redraw what was on canvas if an image was being displayed.
    if(currentImage) { displayImage(currentImage); }
}
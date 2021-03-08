"use strict"

//
let imgInfo;
let imgHolder;
let imgLoading;
let infoRequest;

//P5 element. Holds the image rendered on canvas.
let currentImage;


/** Performs setup operations related to image & display. */
function imageSetup()
{
    //Draw images from the center.
    imageMode(CENTER);

    //Set the text style.
    textSize(25);
    textStyle(BOLD);
    textAlign(CENTER);
    textFont('Courier New');


    //Create an html holder for the image, but prevent it from rendering.
    imgHolder = document.createElement('img');
    imgHolder.style = "visibility: hidden;"


    //Loading an image after assigning it a new source is asynchronous.
    imgHolder.onload = () => 
    {
        //Display the image on the canvas.
        currentImage = select("img");
        displayImage(currentImage);

        //Now that the image has loaded, let other requests happen.
        imgLoading = false;
    }

    //Include the image in the html body. 
    //(It doesn't matter too much where it will be, since it's invisible).
    document.body.appendChild(imgHolder);
}


/**
 * Fetches a new image from the Flickr image database and log its URL into the HTML image.
 * This triggers the imgHolder's 'onload' callback, which displays the image onto the canvas.
 * @param {String} tag - 
 */
function getNewImage(tag)
{
    //Ignore the function call if the previous image is still loading.
    if(imgLoading) { return; }

    //Prevent new requests from being made while this one is being sent/received.
    imgLoading = true;

    //For debug.
    currentTag = tag;

    //Draw & write over the last canvas frame. 
    //(This makes it clear that the next image is loading.)
    background(220);
    text('Loading...', width/2, height/2);


    //Create a new request.
    infoRequest = new XMLHttpRequest();

    //Get the json info from Flickr. Search for the info of 9 images with the specified tag.
    infoRequest.open('GET', 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=bfa53076ee93e8d9dc477cb44589beb6&sort=relevance&per_page=10&format=json&safe_search=1&tags=' + tag);
    //Specify how the response should be intepreted.
    infoRequest.responseType = 'text';

    //Specify callback function.
    infoRequest.onload = () => 
    {
        //Convert the fetched info into an object. 
        //The returned text always has "jsonFlickrApi()" encapsulating it, which is why we only care about the substring inside of it.
        let infoArr = JSON.parse(infoRequest.response.substring(14, infoRequest.response.length - 1)).photos;

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
 * Creates an event listener that will execute its callback function after an error is detected.
 * For some reason, every time a request is made to Flickr, this event gets fired (independently the image loading properly or not).
 * That said, this can be useful to check if the image has loaded properly. 
 * This is purely meant to resolve net::ERR_NAME_NOT_RESOLVED errors.
 * 
 * This is the only method I found to work. The 'onerror' property of elements (including the XHTMLRequest or the window)
 * don't get called by net::ERR_NAME_NOT_RESOLVED errors. The image's does, but it somehow leads to JSON or insuffucent resources
 * errors down the line.
 */
window.addEventListener('error', (errorEvent) => 
{
    //If the HTML image's source still has the Flickr link, assume that something went wrong
    //execute code to terminate the request and start another one.
    if(errorEvent.target.src.includes('staticflickr.com'))
    {
        //Free the memory used by the requested info since it's not needed anymore.
        imgInfo = null;

        //Allow the other images to load.
        imgLoading = false;

        displayText('Image is unavaiable, retrying...');

        //Display another image as replacement.
        game.nextPrompt();
    }
}, true);
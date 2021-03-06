/****************
CLEANER
Étienne Racine

Built off template-p5-project.
****************/
"use strict"

let imgInfo;
let imgHolder;
let infoRequest;

let sideRight;
let centerArea;
let canvas;
let currentImage;


function setup()
{
    //Only attempt to start annyang if it is present.
    if(annyang)
    {
        //Makes annyang call [] with parameter ' ' when it recognizes speech.
        //annyang.addCommands({ '*var_name': func_name });
        //Stars listening for voice input.
        //annyang.start();
    }

    //Get the reference of HTML elements.
    centerArea = document.getElementById("center");
    sideRight = document.getElementById("right");
    

    //Create canvas and make it fit within the center area.
    canvas = createCanvas(centerArea.clientWidth, centerArea.clientHeight);
    canvas.parent(centerArea);

    //Light grey bacground.
    background(200);
    //Draw images from the center.
    imageMode(CENTER);
    

    //Create an html holder for the image.
    imgHolder = document.createElement('img');
    //imgHolder.style = "visibility: hidden;";
    document.body.appendChild(imgHolder);

    //Loading an image after assigning it a new source is asynchronous.
    imgHolder.onload = () => 
    {
        //Display the image on the canvas.
        currentImage = select("img");
        displayImage(currentImage);

        //Stop rendering the html image.
        imgHolder.src = "";
    }
}


function showImage(tag)
{
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
 * @param {Image} img 
 */
function displayImage(img)
{
    background(200);
    if( (img.width - width) > (img.height - height))
    { image(currentImage, width/2, height/2, width, img.height * (width/img.width)); }
    else
    { image(currentImage, width/2, height/2, img.width * (height/img.height), height); }
}


/**
 * Resizes the canvas and redraws its content.
 * Is called automatically when the window is resized.
 */
function windowResized()
{
    resizeCanvas(centerArea.clientWidth, centerArea.clientHeight);

    //Redraw what was on canvas.
    if(currentImage) { displayImage(currentImage); }
}
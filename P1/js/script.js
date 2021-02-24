/****************
CLEANER
Étienne Racine

Built off template-p5-project.
****************/


let imgInfo;
let imgHolder;
let infoRequest;


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
        delete imgArr;



        //Construct a source link for the image element using the picture's info.
        //The '_b' at the end specifies the image size as 'large' (~1024x768).
        imgHolder.src = `http://farm${imgInfo.farm}.staticflickr.com/${imgInfo.server}/${imgInfo.id}_${imgInfo.secret}_b.png`;
    };

    //Send the request.
    infoRequest.send();
}

function start()
{
    setInterval(showImage, 1000, 'dog');
}

function setup()
{
    createCanvas(windowWidth, windowHeight);
    background(100,0,0);

    //Create an html holder for the image.
    imgHolder = document.createElement('img');
    //imgHolder.style = "visibility: hidden;";
    document.body.appendChild(imgHolder);

    //Loading an image after assigning it a new source is asynchronous.
    imgHolder.onload = () => 
    {
        //Display the image on the canvas.
        image(select("img"), 0, 0); 
        //Stop rendering the html image.
        imgHolder.src = "";
    }
}


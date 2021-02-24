/****************
CLEANER
Étienne Racine

Built off template-p5-project.
****************/


let imgInfo;
let htmlImage;


window.onload = () => 
{
    htmlImage = document.createElement('img');
    document.body.appendChild(htmlImage);
}

function showImage(tag)
{
    //Create a new request.
    let request = new XMLHttpRequest();

    //Get the json info from Flickr. Search for the info of 9 images with the specified tag.
    request.open('GET', 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=bfa53076ee93e8d9dc477cb44589beb6&sort=relevant&per_page=9&format=json&tags=' + tag);
    //Specify how the response should be intepreted.
    request.responseType = 'text';
    
    //Specify callback function.
    request.onload = () => 
    {
        //Convert the fetched info into an object. 
        //The returned text always has "jsonFlickrApi()" encapsulating it, which is why we only care about the substring inside of it.
        let infoArr = JSON.parse(request.response.substring(14, request.response.length - 1)).photos;
        console.log(infoArr);

        //Select a random image from the returned array.
        do { imgInfo = infoArr.photo[Math.floor(Math.random() * infoArr.photo.length)]; }
       
        //Sometimes, the image info isn't correctly returned, resulting in it being 'undefined'.
        //Try to get another picture if that is the case.  
        while(typeof imgInfo == 'undefined');

        //Free the memory used by the requested info since it's not needed anymore.
        delete imgArr;

        //Construct a source link for the image element using the picture's info.
        //The '_b' at the end specifies the image size as 'large' (~1024x768).
        htmlImage.src = `http://farm${imgInfo.farm}.staticflickr.com/${imgInfo.server}/${imgInfo.id}_${imgInfo.secret}_b.png`;
       
        //Doesn't work, even if a canvas is present. Would be the better option.
        //drawingContext.drawImage(htmlImage, 0, 0);
    };

    console.log('REQUEST SENT');
    request.send();
}



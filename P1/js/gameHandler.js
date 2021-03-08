"use strict";


function userCall(command)
{
    if(command.toLowerCase().includes("ignore"))
    {
        displayText('Ignored.', 1250);
        newImage(randomTag());
    }
    else if(command.toLowerCase().includes("delete"))
    {
        displayText('Deleting...', 1250);
        newImage(randomTag());
    }

    else
    { displayText(`Unknown command: '${command}'`); }
}
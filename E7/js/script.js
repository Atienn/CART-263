/****************
Exercise 7

This program lets the user compute basic numerical 
operation on numbers by dragging them into a box.
****************/

"use strict";


//#region OPERATIONS
//Each numerical operation that can take place.
//Returns the number to be set as the result.

function set(num1, num2) {
    return num2;
}

function add(num1, num2) {
    return num1 + num2;
}

function sub(num1, num2) {
    return num1 - num2;
}

function mul(num1, num2) {
    return num1 * num2;
}

function div(num1, num2) {
    return num1 / num2;
}

//The currently selected operation (default is add).
let currOperation = set;

//#endregion

/** Only execute once the page has loaded. */
window.onload = () => {
 
    //Set a popup for when the user runs out of numbers.
    $(`#end-popup`).dialog({
        //Don't open on starup.
        autoOpen: false,
        //Single button that reloads the page.
        buttons: {
            "Reset": function() {
                location.reload();
            }
        }
    });
    
    //Set the buttons with thier themes.
    $(`#radioset`).buttonset();

    //Listen to value changes on the radio buttons.
    $(`#radioset`).on(`change`, function() {
        //Set the current operation to the global function matching the selected button's value.
        currOperation =  window[$("input[name='operation']:checked").val()];
    });

    //Makes each number draggable.
    $(`.number`).draggable();

    //Makes the calculator box able to receive dragged numbers.
    $(`#drag-box`).droppable({
        drop: function(event, ui) {
            //Set the box's text to the result of the current operation.
            $(this).text(currOperation(Number.parseInt($(this).text()), Number.parseInt(ui.draggable.text())));
            //Remove the dragged number.
            ui.draggable.remove();
            
            //If there's no more numbers, then trigger the dialog box.
            if($(`.number`).length == 0) {
                $(`#end-popup`).dialog(`open`);
            }
        }
    });
}
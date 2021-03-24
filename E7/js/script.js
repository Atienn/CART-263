/****************
Exercise 7


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

let currOperation = set;

//#endregion


window.onload = () => {

    $(`#end-popup`).dialog({
        autoOpen: false,
        buttons: {
            "Reset": function() {
                location.reload();
            }
        }
    });
     
    $(`#radioset`).buttonset();

    $(`#radioset`).on(`change`, function() {
        currOperation =  window[$("input[name='operation']:checked").val()];

    });

    $(`.number`).draggable();

    $(`#drag-box`).droppable({
        drop: function(event, ui) {
            $(this).text(currOperation(Number.parseInt($(this).text()), Number.parseInt(ui.draggable.text())));
            ui.draggable.remove();
            
            if($(`.number`).length == 0) {
                $(`#end-popup`).dialog(`open`);
            }
        }
    });
}
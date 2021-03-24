/****************
Exercise 7


****************/

"use strict";

function set(num1, num2) {
    return num1;
}

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}


let currentOperation = add;


window.onload = () => {


    $(`#end-popup`).dialog({
        autoOpen: false,
        buttons: {
            "Reset?": function() {
                location.reload();
            }
        }
    });
     
    $(`#radioset`).buttonset();

    $(`.number`).draggable();

    $(`#drag-box`).text(0);
    $(`#drag-box`).droppable({
        drop: function(event, ui) {
            $(this).text(currentOperation(Number.parseInt($(this).text()), Number.parseInt(ui.draggable.text())));
            ui.draggable.remove();
        }
    });
}


// Let the user drag secret letters via a clone helper


// When the user drops a letter on the answer...




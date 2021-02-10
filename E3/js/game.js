"use strict";

let game =
{
    letter: '',
    lastLetter: '',
    timer: 0,
    score: 0,

    setup() 
    {

        textStyle(BOLD);
        textAlign(CENTER, CENTER);

        strokeCap(SQUARE);
        strokeWeight(10);

        this.score = 0;
        this.newLetter();
        this.timer = 300;
    },

    update() 
    {
        if(this.timer > 0) { this.timer--; }
        else { switchState(logUser); }

        background(0);
        
        stroke(150);
        line(0, height - 5, (this.timer / 300) * width, height - 5);

        noStroke();

        textSize(50);
        text('Type as many letters as you can!', width/2, 35);

        textSize(35);
        text(`Current score: ${this.score}.`, width/2, 100);

        textSize(200);
        text(this.letter, width/2, height/2);
    },

    keyType() 
    {
        if(key.toUpperCase() === this.letter)
        {
            this.score++;
            this.lastLetter = this.letter;
            this.newLetter();
        }
    },

    keyPress() 
    {

    },

    newLetter()
    {
        do { this.letter = String.fromCharCode(Math.floor(Math.random() * 26 + 65)); }
        while (this.letter === this.lastLetter);
    }

}
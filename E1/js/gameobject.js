"use strict"
/**
 * 
 */
class Item
{
    static current = [];

    /**
     * 
     * @param {*} position 
     * @param {*} velocity 
     * @param {*} type
     * @param {*} radius 
     */
    constructor(position, velocity, radius, type)
    {
        this.pos = position;
        this.vel = velocity;
        this.radius = radius;
        this.type = type;

        this.img = images[type][randomInt(3)];
    }

    static Random()
    {
        return new Item
        (
            new Vector2D(Math.random() * width, Math.random() * reducedHeight), 
            Vector2D.Random().Scale(2), 
            Math.random() * 100 + 150, 
            randomInt(4)
        );
    }


    /**
     * 
     */
    display()
    {
        image(this.img, this.pos.x, this.pos.y, this.radius, this.radius);
    }

    /**
     * 
     */
    move()
    {

        this.pos.Add(this.vel);
        
        //If the item is out of borders, return it in and reverse its velocity (make it 'bounce' back).
        if(this.pos.x < 0 ) 
        { 
            this.pos.x = 0; 
            this.vel.x = -this.vel.x; 
        }
        if(this.pos.x > windowWidth) 
        { 
            this.pos.x = windowWidth; 
            this.vel.x = -this.vel.x;  
        }
        if(this.pos.y < 0) 
        { 
            this.pos.y = 0; 
            this.vel.y = -this.vel.y;
        }
        if(this.pos.y > reducedHeight) 
        { 
            this.pos.y = reducedHeight; 
            this.vel.y = -this.vel.y; 
        }
    }


    /**
     * Checks if a given position is 
     * 
     * @param {Vector2D} position - The position to verify.
     * @param {} boxes - The array of 'TriggerBox instances'
     */
    isMouseNear()
    {
        //
        if(Math.hypot(mouseX - this.pos.x, mouseY - this.pos.y) < this.radius) { return true; }
        else { return false; }
    }


    /**
     * 
     */
    isCorrectType()
    {
        if(this.type == wantedTypeNum) { return true; }
        else { false; }
    }
}

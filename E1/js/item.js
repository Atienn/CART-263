"use strict"
/**
 * Object of a certain type moving around one the screen.
 * Can be collected by the player if it matches the game's wanted type.
 */
class Item
{
    //The array of items currently on the screen.
    static current = [];

    /**
     * Creates a new item.
     * @param {Vector2D} position Where the item will be created on the screen. 
     * @param {Vector2D} velocity The initial direction the item will be moving.
     * @param {Number} type The object's type. Determines when it can be collected.
     * @param {Number} radius The distance away from the object's center where it can be collected. 
     */
    constructor(position, velocity, radius, type)
    {
        this.pos = position;
        this.vel = velocity;
        this.radius = radius;
        this.type = type;

        //Assign a random image matching the object's type.
        this.img = images[type][randomInt(3)];
    }

    /**
     * Generates a new item with random values but with different type than the given one.
     * @param {Number} currentType Type to avoid assigning to the new item. (optional)
     * @returns {Item} New item with randomized values.
     */
    static Random(currentType = -1)
    {
        //Tracks the new type to be selected. 
        //Prevents against re-selecting the same type.
        let newType;

        //Generate a new valid item type.
        do { newType = randomInt(images.length); }
        //Keep re-rolling until we get a type different than the given one.
        while(newType == currentType)

        //Generate a new item that:
        // - Is somewhere within the bounds of the screen;
        // - Has a velocity of 2 in a random direction;
        // - Has a radius beween 150 and 250;
        // - Has a different type than the given one.
        return new Item
        (
            new Vector2D(Math.random() * width, Math.random() * reducedHeight), 
            Vector2D.Random().Scale(2), 
            Math.random() * 100 + 150, 
            newType
        );
    }


    /** Display the item by drawing its image at its position. */
    display() { image(this.img, this.pos.x, this.pos.y, this.radius, this.radius); }


    /** Moves the object by its velocity and makes it bounce back if it goes out of borders. */
    move()
    {
        //Move the position of the object by its velocity.
        this.pos.Add(this.vel);
        

        //If the item is out of borders, return it inside and reverse its velocity (make it 'bounce' back).
        
        //Left border.
        if(this.pos.x < 0)  
        { 
            this.pos.x = 0; 
            this.vel.x = -this.vel.x; 
        }
        
        //Right border.
        if(this.pos.x > windowWidth) 
        { 
            this.pos.x = windowWidth; 
            this.vel.x = -this.vel.x;  
        }

        //Top border.
        if(this.pos.y < 0)  
        { 
            this.pos.y = 0; 
            this.vel.y = -this.vel.y;
        }

        //Bottom border (the top of the lines showing the timer and objective).
        if(this.pos.y > reducedHeight) 
        {
            this.pos.y = reducedHeight; 
            this.vel.y = -this.vel.y; 
        }
    }


    /**
     * Checks if the distance between the mouse and an item is lower than that items radius.
     * @returns {boolean} `true` if the mouse's position is within the item's radius. `false` otherwise. 
     */
    isMouseNear()
    {
        //Return true if the hypotenuse (distance) is lower than the radius.
        if(Math.hypot(mouseX - this.pos.x, mouseY - this.pos.y) < this.radius) { return true; }
        //Othrewise, return false.
        else { return false; }
    }


    /**
     * Checks if the object matches the currently wanted type.
     * @returns {boolean} `true` if the object's type matches the wanted one. `false` otherwise.
     */
    isWantedType()
    {
        if(this.type == wantedType) { return true; }
        else { false; }
    }
}

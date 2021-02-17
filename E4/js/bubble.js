
/**
 * Circle object which floats around the screen during the game state.
 * Can be popped using the hand's projection to increase score.
 */
class Bubble
{
    /**
     * Creates a new bubble instance.
     * @param {Number} px The x coordinate of the bubble's position.
     * @param {Number} py The y coordinate of the bubble's position.
     * @param {Number} vx The x coordinate of the bubble's velocity.
     * @param {Number} vy The y coordinate of the bubble's velocity.
     * @param {Number} radius The bubble's size on screen.
     */
    constructor(x, y, vx, vy, radius)
    {
        this.px = x;
        this.py = y;
        this.vx = vx;
        this.vy = vy;

        this.radius = radius;
    }

    /** Array holding existing bubbles. */
    static current = [];

    /** Returns a new bubble with random values. */
    static random()
    {
        //Generate a random angle for the velocity.
        let angle = Math.random() * TWO_PI;

        return new Bubble
        (
            width * Math.random(), 
            height * Math.random(),
            Math.sin(angle) * 20,
            Math.cos(angle) * 20,
            50 + 50 * Math.random()
        )
    }

    /** Re-generates the bubble array. */
    static resetCurrent()
    {
        //Set an empty array and give it 20 new random bubbles.
        this.current = [];
        for(let i = 0; i < 20; i++) { this.current[i] = this.random(); }
    }


    /** Moves and displays all bubbles. */
    static updateAll()
    {
        //The following display settings should only apply to this method.
        push();

        //Give a thin, light grey ouline to objects.
        strokeWeight(3);
        stroke(175);
        //Make shapes grey and transparent.
        fill(125, 0.5);

        for(let i = 0; i < this.current.length; i++)
        {
            this.current[i].move();
            this.current[i].display();
        }

        //Return to previous display settings.
        pop();
    }


    /** Goes through the bubble array and checks if any of them should be popped. */
    static checkAll()
    {
        //Don't do anything if no hand is recognized.
        if(hands.length > 0)
        {
            //For each bubble...
            for(let i = 0; i < this.current.length; i++)
            {
                //For each 'node' (recognized point on the hand)...
                hands[0].landmarks.forEach(node => 
                {
                    //Checks if the distance between the bubble and the point on the hand is smaller than the bubble's radius.
                    if(dist(this.current[i].px, this.current[i].py, node[0], node[1]) < this.current[i].radius)
                    {
                        //If it is, 'pop' the bubble (replace it with a new one).
                        this.current[i] = this.random();
                        //Increase the score by 1.
                        game.score++;
                    }
                });
            }
        }
    }


    /** Moves the bubble by its velocity and makes it bounce back if it goes out of borders. */
    move()
    {
        //Move the position of the object by its velocity.
        this.px += this.vx;
        this.py += this.vy;
        

        //If the bubble is out of borders, return it inside and reverse its velocity (make it 'bounce' back).
        
        //Left border.
        if(this.px < 0)  
        { 
            this.px = 0; 
            this.vx = -this.vx; 
        }
        
        //Right border.
        if(this.px > width) 
        { 
            this.px = width; 
            this.vx = -this.vx;  
        }

        //Top border.
        if(this.py < 0)  
        { 
            this.py = 0; 
            this.vy = -this.vy;
        }

        //Bottom border (the top of the lines showing the timer and objective).
        if(this.py > height) 
        {
            this.py = height; 
            this.vy = -this.vy; 
        }
    }

    /** Displays the bubble as a transparent grey circle. */
    display() { circle(this.px, this.py, this.radius); }
}
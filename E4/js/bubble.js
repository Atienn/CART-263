
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
     * @param {Number} radius 
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
        //Generate a random angle.
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
        this.current = [];
        for(let i = 0; i < 20; i++) 
        { 
            //Add a new random bubble to the start of the array.
            this.current.unshift(this.random()); 
        }
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

        //
        for(let i = 0; i < this.current.length; i++)
        {
            this.current[i].move();
            this.current[i].display();
        }

        //Return to previous display settings.
        pop();
    }


    static checkAll()
    {
        if(hands.length > 0)
        {
            for(let i = 0; i < Bubble.current.length; i++)
            {
                for(let j = 0; j < hands[0].landmarks.length; j++)
                {
                    if(dist(Bubble.current[i].px, Bubble.current[i].py, hands[0].landmarks[j][0], hands[0].landmarks[j][1]) < Bubble.current[i].radius)
                    {
                        //Replace the bubble with a new one.
                        this.current[i] = this.random();
                        game.score++;
                    }
                }
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
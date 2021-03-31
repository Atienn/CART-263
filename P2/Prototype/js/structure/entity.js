/**
 * Game object which occupies some or no space.
 * Runs its 'onOverlap' function if 'overlapCheck' returns true.
 */
class Entity { 
    
    //Complex, but ultra modular constructor.
    //Subclasses that autmomatically fill out part of it will be implemented later.
    /**
     * Game object which occupies some or no space.
     * Runs its 'onOverlap' function if 'overlapCheck' returns true.
     * 
     * @param {Vector2D} position - The position (x, y) of the entity.
     * @param {Number} width - The widrh (x) of the entity's collider.
     * @param {Number} height - (Optional) The height (y) of the entity's collider. Defaults to width.
     * @param {Function} display - (Optional) The function used to display the entity.
     * @param {Function} overlapCheck - The function to check if a given position overlaps this entity's 'collider'. Dictates the collider's shape.
     * @param {Function} onOverlap - The function to run if there is overlap.
     * @param {any} modifier - (Optional) The value to specify the exact behaviour of the entity. Can be the speed to add or the text to display.
     * The type of this value is assumed to match what the entity type expects it to be.
     */
    constructor(position, width, height = width, display = () => {}, overlapCheck, onOverlap, modifier = null) {
        //Position.
        this.pos = position;

        //Width and height of the 'collider'.
        this.w = width;
        this.h = height;

        //The method to display the entity.
        this.display = display;

        //The 
        this.overlapCheck = overlapCheck;
        this.onOverlap = onOverlap;


        this.mod = modifier;
    }

    /** All of the entities present in the current game state. */
    static current = [];

    /** 
     * Checks of overlap in all entities and potentially 
     * trigger thier 'onOverlap' function. 
     */
    static overlapCheckAll(target, entities) {
        entities.forEach(entity => {
            if(entity.overlapCheck(target.pos)) {
                entity.onOverlap(target);
            }
        });
    }

    static displayAll() {

        //Translates the platfroms to be drawn from the player's perspective.
        //Should be moved outside of this function as to only be called once per draw() (for both platforms & entities).
        translate((width/2) - Player.pos.x - camOffset.x, (height/1.5) - Player.pos.y - camOffset.y);
        
        this.current.forEach(entity => {
            push();
            entity.display();
            pop();
        });

        //Temporary. Terrible practice.
        translate(-((width/2) - Player.pos.x - camOffset.x), -((height/1.5) - Player.pos.y - camOffset.y));
    }

    //#region OVERLAPCHECK

    /** Circular overlap check. */
    static circleCheck(position) {
        return (dist(this.pos.x, this.pos.y, position.x, position.y) < this.w);
    }

    /** Rectangular overlap check. */
    static rectCheck(position) {
        return (
            position.x >= this.pos.x - this.w && 
            position.x <= this.pos.x + this.w &&
            position.y >= this.pos.y - this.h &&
            position.y <= this.pos.y + this.h 
        );
    }

    //#endregion


    //#region ONOVERLAP

    static knockback(target) {
        //Refresh dash as the jump pad is considered as ground.
        Entity.dashRefresh(target);
        //Add to velocity.
        target.vel.Add(this.mod);
    }

    static dashRefresh(target) {
        //Refresh the dash immediately.
        target.dash = true;
    }


    //#region DISPLAY
    
    static redTriangle() {
        stroke(0);
        strokeWeight(2);
        fill(0, 100, 100);
        triangle(this.pos.x - this.w, this.pos.y, this.pos.x + this.w, this.pos.y, this.pos.x, this.pos.y - (this.h + ampCurrent*10));
    }

    static yellowCircle() {
        stroke(0);
        strokeWeight(2);
        fill(60, 100, 100);
        circle(this.pos.x, this.pos.y, this.w*0.75);
    }

    static whiteText() {
        stroke(0);
        strokeWeight(2);
        textSize(20);
        textAlign(CENTER);
        text(this.mod, this.pos.x, this.pos.y, this.w, this.h);
    }

    //#endregion
}
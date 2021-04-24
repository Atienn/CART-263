/**
 * Game object which occupies some or no space.
 * Runs its 'event' function if 'check' returns true.
 */
class Entity { 
    
    //Complex, but ultra modular constructor.
    //Subclasses that autmomatically fill out part of it will be implemented later.
    /**
     * Game object which occupies some or no space.
     * Runs its 'event' function if 'check' returns true.
     * 
     * @param {Vector2D} position - The position (x, y) of the entity.
     * @param {Number} width - The widrh (x) of the entity's collider.
     * @param {Number} height - (Optional) The height (y) of the entity's collider. Defaults to width.
     * @param {Function} display - (Optional) The function used to display the entity.
     * @param {Function} check - The function to check every frame to determine if the entity event should trigger. Ex: check if a given position overlaps this entity's 'collider'.
     * @param {Function} event - The function to run if there is overlap.
     * @param {any} modifier - (Optional) The value to specify the exact behaviour of the entity. Ex: the speed to add or the text to display.
     * The type of this value is assumed to match what the entity type expects it to be.
     */
    constructor(position, width, height = width, display, check, event, modifier = null) {
        //Position.
        this.pos = position;

        //Width and height of the 'collider'.
        this.w = width;
        this.h = height;

        //The method to display the entity.
        this.display = display;

        //The function to check if there is overlap (dictates the shape of the check)
        //and the function to execute if there is overlap.
        this.check = check;
        this.event = event;

        //Value that will specify the exact behaviour of the entity. For example, for a teleport effect,
        // it could be a Vector2D specifying which position to teleport to.
        this.mod = modifier;
    }

    /** All of the entities present in the current game state. */
    static current = [];

    /** 
     * Checks of overlap in all entities and potentially 
     * trigger thier 'onOverlap' function. 
     */
    static checkAll(target, entities) {
        entities.forEach(entity => {
            if(entity.check(target)) {
                entity.event(target);
            }
        });
    }

    /** Displays all of the current entities. */
    static displayAll(arr) {
        arr.forEach(entity => {
            push();
            entity.display();
            pop();
        });
    }


    //#region CHECK

    /** Circular overlap check. */
    static circleCheck(target) {
        return misc.circleCheck(target.pos, this.pos, this.w);
    }

    /** Rectangular overlap check. */
    static rectCheck(target) {
        return misc.rectCheck(target.pos, this.pos, this.w, this.h);
    }

    //#endregion


    //#region EVENT

    static knockback(target) {
        //Refresh dash as the jump pad is considered as ground.
        Entity.dashRefresh(target);
        //Add to velocity.
        target.vel.Add(this.mod);
    }

    /** Refreshes the target's dash. */
    static dashRefresh(target) {
        target.dash = true;
    }

    //#endregion


    //#region DISPLAY
    
    static redTriangle() {
        stroke(0);
        strokeWeight(2);
        fill(0, 100, 100);
        triangle(this.pos.x - this.w, this.pos.y, this.pos.x + this.w, this.pos.y, this.pos.x, this.pos.y - (this.h + music.ampCurrent*10));
    }

    static yellowCircle() {
        stroke(0);
        strokeWeight(2);
        fill(60, 100, 100);
        circle(this.pos.x, this.pos.y, this.w*0.75);
    }

    static whiteTextBox() {
        stroke(0);
        strokeWeight(2);
        textSize(20);
        textAlign(CENTER);

        //For some reason, setting rectMode to RADIUS makes text bounding boxes
        //act as if they're in rectMode CORNER. So we manually need to work around this.
        rectMode(CENTER);

        text(this.mod, this.pos.x, this.pos.y, this.w * 2, this.h * 2);
    }

    //#endregion
}



class StateEntity extends Entity {
    /**
     * Game object which occupies some or no space.
     * Runs its 'event' function if 'check' returns true.
     * Can 
     * 
     * @param {Vector2D} position - The position (x, y) of the entity.
     * @param {Number} width - The widrh (x) of the entity's collider.
     * @param {Number} height - (Optional) The height (y) of the entity's collider. Defaults to width.
     * @param {Function} display - (Optional) The function used to display the entity.
     * @param {Function} check - The function to check every frame to determine if the entity event should trigger. Ex: check if a given position overlaps this entity's 'collider'.
     * @param {Function} event - The function to run if there is overlap.
     * @param {any} modifier - (Optional) The value to specify the exact behaviour of the entity. Ex: the speed to add or the text to display.
     * @param {any} stateType - (Optional) The type of states the entity can have (either boolean or number).
     * The type of this value is assumed to match what the entity type expects it to be.
     */
    constructor(position, width, height = width, display, check, event, modifier = null) {

        //Create the entity.
        super(position, width, height, display, check, event, modifier);

        //Start the entity as inactive.
        this.state = false;
    }

    //#region CHECK

    /** Rectangular overlap check. */
    static rectCheckHold(target) {
        this.state = misc.rectCheck(target.pos, this.pos, this.w, this.h);
        return this.state;
    }

    /**  */
    static rectCheckOnce(target) {
        if(misc.rectCheck(target.pos, this.pos, this.w, this.h)) {
            return !this.state;
        }
    }
    
    //#endregion


    //#region DISPLAY

    static menuButton() {
        stroke(100);
        strokeWeight(5);
        fill(this.state ? 25 : 0);
        rect(this.pos.x, this.pos.y, this.w, this.h);

        noStroke();
        fill(100);

        //For some reason, setting rectMode to RADIUS makes text bounding boxes
        //act as if they're in rectMode CORNER. So we manually need to work around this.
        rectMode(CENTER);
        textSize(50);
        text(this.mod, this.pos.x + 52.5, this.pos.y, this.w * 2, this.h * 2);
    }

    static textButton() {
        noStroke();

        fill(this.state ? 25 : 0);
        rect(this.pos.x, this.pos.y, this.w, this.h);

        noStroke();
        fill(100);

        //For some reason, setting rectMode to RADIUS makes text bounding boxes
        //act as if they're in rectMode CORNER. So we manually need to work around this.
        rectMode(CENTER);
        textSize(20);
        textAlign(CENTER, BASELINE);
        text(this.mod, this.pos.x, this.pos.y + this.h / 2);
    }

    static arrowButton() {
        noStroke();

        fill(this.state ? 25 : 0);
        rect(this.pos.x, this.pos.y, this.w, this.h);

        fill(100);

        let w2 = this.w / 2;
        let h2 = this.h / 2;

        //Up arrow.
        if(this.mod) {
            triangle(
                this.pos.x, this.pos.y - h2,
                this.pos.x - w2, this.pos.y + h2,
                this.pos.x + w2, this.pos.y + h2
            );
        }
        //Down arrow.
        else {
            triangle(
                this.pos.x, this.pos.y + h2,
                this.pos.x - w2, this.pos.y - h2,
                this.pos.x + w2, this.pos.y - h2
            );
        }
    }

    //#endregion
}
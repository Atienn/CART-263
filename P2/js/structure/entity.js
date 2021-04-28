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
        //Refresh dash contact is considered as ground / wall.
        Entity.dashRefresh(target);
        //Add to velocity.
        target.vel.Add(this.mod);
    }

    static teleport(target) {
        //
        Entity.dashRefresh(target);
        target.pos.Get(this.mod);
        target.vel = Vector2D.Zero();

        //Dim the background as the player is teleported.
        GameState.dim = 50;
    }

    /** Refreshes the target's dash. */
    static dashRefresh(target) {
        target.dash = true;
    }

    static endGate() {
        GameState.cleared = true;
        GameState.playing = false;
    }

    //#endregion


    //#region DISPLAY
    
    static redTriangles() {
        stroke(0);
        strokeWeight(2);
        fill(0, 100, 100);
        triangle(this.pos.x - this.w, this.pos.y, this.pos.x + this.w, this.pos.y, this.pos.x, this.pos.y - (this.h + music.ampCurrent*10));
        triangle(this.pos.x - this.w * 0.5, this.pos.y, this.pos.x + this.w * 0.5, this.pos.y, this.pos.x, this.pos.y - (this.h + music.ampCurrent*10) * 1.5);

    }

    static orangeRects() {
        stroke(0);
        strokeWeight(2);
        fill(30, 100, 100);
        rect(this.pos.x, this.pos.y, this.w, this.h);

        noStroke();
        fill(30, 100, 75);
        rect(this.pos.x, this.pos.y + this.h * 0.5, this.w, this.h * 0.5);
    }

    static cyanRectStack() {
        stroke(0);
        strokeWeight(2);
        fill(180, 100, 45);
        rect(this.pos.x, this.pos.y, this.w, this.h);
        noStroke();
        //Draw 4 boxes, each one thinner, lighter than the last.
        for(let i = 0; i < 3; i++) {
            //Make the box's fill darker if it isn't active. Also make it lighter for every box drawn.
            fill(180, 100, 60 + 15*i);

            //Draw the 'TriggerBox' as a rectangle with it's coordinates and dimensions getting thinner every time.
            rect(this.pos.x, this.pos.y, this.w * (1-0.33*i) - music.ampCurrent * 5, this.h);
        }
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

    static dynamicTextBox() {
        stroke(0);
        strokeWeight(2);
        textSize(20);
        textAlign(CENTER);

        //For some reason, setting rectMode to RADIUS makes text bounding boxes
        //act as if they're in rectMode CORNER. So we manually need to work around this.
        rectMode(CENTER);

        text(this.mod(), this.pos.x, this.pos.y, this.w * 2, this.h * 2);
    }

    //#endregion
}



class StateEntity extends Entity {
    /**
     * Game object which occupies some or no space.
     * Runs its 'event' function if 'check' returns true.
     * Can be in either active or inactive state.
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
        if(!this.state && misc.rectCheck(target.pos, this.pos, this.w, this.h)) {
            this.state = true;
            return this.state;
        }
        else {
            return false;
        }
    }

    static rectCheckActive(target) {
        return this.state && misc.rectCheck(target.pos, this.pos, this.w, this.h);
    }

    static circleCheckHold(target) {
        this.state = misc.circleCheck(target.pos, this.pos, this.w);
        return this.state;
    }
    
    //#endregion


    //#region DISPLAY

    static menuButton() {
        //Draw the 'body' of the button (black or light grey if the mouse if hovering over it) with a white outline.
        stroke(100);
        strokeWeight(5);
        fill(this.state ? 25 : 0);
        rect(this.pos.x, this.pos.y, this.w, this.h);

        //Write white text inside the button.
        noStroke();
        fill(100);
        //For some reason, setting rectMode to RADIUS makes text bounding boxes
        //act as if they're in rectMode CORNER. So we manually need to work around this.
        rectMode(CENTER);
        textSize(50);
        text(this.mod, 52.5, this.pos.y);
    }

    static textButton() {
        //Draw the 'body' of the button (black or light grey if the mouse if hovering over it).
        fill(this.state ? 25 : 0);
        rect(this.pos.x, this.pos.y, this.w, this.h);

        //Write white text inside the button.
        fill(100);
        //For some reason, setting rectMode to RADIUS makes text bounding boxes
        //act as if they're in rectMode CORNER. So we manually need to work around this.
        rectMode(CENTER);
        textSize(this.h * 1.5);
        textAlign(CENTER, BASELINE);
        text(this.mod, this.pos.x, this.pos.y + this.h / 2);
    }

    static levelButton() {
        //Draw a thin line at the bottom of the button.
        stroke(100);
        strokeWeight(2);
        line(this.pos.x - this.w, this.pos.y + this.h, this.pos.x + this.w, this.pos.y + this.h);
        
        //Draw the 'body' of the button (black or light grey if the mouse if hovering over it).
        noStroke();
        fill(this.state ? 25 : 0);
        rect(this.pos.x, this.pos.y, this.w, this.h);

        //Write white text inside the button.
        fill(100);
        //For some reason, setting rectMode to RADIUS makes text bounding boxes
        //act as if they're in rectMode CORNER. So we manually need to work around this.
        rectMode(CENTER);
        textSize(this.h * 1.5);
        textAlign(LEFT, BASELINE);
        text(this.mod.name, (this.pos.x - 0.8 * this.w), this.pos.y + this.h / 2);
    }

    static arrowButton() {
        //Draw the 'body' of the button (black or light grey if the mouse if hovering over it).
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

    static yellowCircles() {
        noFill();

        stroke(0);
        strokeWeight(this.h);
        circle(this.pos.x, this.pos.y, this.w - 10 - music.ampCurrent * 5);

        stroke(60, 100, this.state ? 50 : 100);
        circle(this.pos.x, this.pos.y, this.w - 12 - music.ampCurrent * 5);


        stroke(0);
        strokeWeight(2);
        fill(60, 100, this.state ? 50 : 100);
        circle(this.pos.x, this.pos.y, this.w * 0.2);
    }

    static greenRect() {
        stroke(0);
        strokeWeight(2);

        fill(120, 100, this.state ? 50 : 100);
        square(this.pos.x, this.pos.y, this.w * 0.5, this.w * 0.25);
    }

    static cyanRectStackActive() {
        stroke(0);
        strokeWeight(2);
        fill(180, 100, 45);
        rect(this.pos.x, this.pos.y, this.w, this.h);
        noStroke();
        //Draw 4 boxes, each one thinner, lighter than the last.
        for(let i = 0; i < 3; i++) {
            //Make the box's fill darker if it isn't active. Also make it lighter for every box drawn.
            fill(180, 100, 10 + 50*this.state + 15*i);

            //Draw the 'TriggerBox' as a rectangle with it's coordinates and dimensions getting thinner every time.
            rect(this.pos.x, this.pos.y, this.w * (1-0.33*i) - music.ampCurrent * 5, this.h);
        }
    }

    //#endregion
}


class LabeledEntity extends StateEntity {
    /**
     * Game object which occupies some or no space.
     * Runs its 'event' function if 'check' returns true.
     * Can be in either active or inactive state.
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
     * @param {any} label - (Optional) The "type" of the entity. Only used when trying to target specific groups of entities within an array.
     */
    constructor(position, width, height = width, display, check, event, modifier = null, label = null) {

        //Create the entity.
        super(position, width, height, display, check, event, modifier);

        //Used to only target specific groups of entities within an array.
        this.label = label;
    }


    //#region EVENT

    static groupCheck() {

        //Tracks if the goal should activate or not.
        //Assume that all switches are active.
        let allActive = true;

        //Loop through all entities, only considering the ones with the same label.
        for (let i = 0; i < Entity.current.length; i++) {
            if(Entity.current[i].label === this.label) {
                
                if(!Entity.current[i].state) {
                    allActive = false;
                    break;
                }
            }            
        }

        if(allActive) {
            this.mod();
        }
    }

    static activateGoal() {
        for (let i = 0; i < Entity.current.length; i++) {
            if(Entity.current[i].label === GOAL) {
                Entity.current[i].state = true;
                break;
            }
        }
    }

    //#endregion
}
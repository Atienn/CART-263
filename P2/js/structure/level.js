//LABELS
const SWITCH = 's';
const GOAL = 'g';

class Level {

    /**
     * @param musicFile {String} - 
     */
    constructor(title, startPosition, objective, musicFile, platforms, entities) {
        this.name = title;
        this.startPos = startPosition;
        this.objText = objective;
        this.trackName = musicFile;
        this.platformArr = platforms;
        this.entityArr = entities;
        this.track = null;
    }

    static list = [

        //LEVEL 0 (TUTORIAL)
        new Level(
            //LEVEL NAME
            'TUTORIAL',
            //STARTING POSISION
            new Vector2D(550, 1050),
            //OBJECTIVE(S)
            "- Reach the end gate.",
            //TRACK NAME
            "Floating Anarchy - Cyber Funk",

            //PLATFORM BUNDLE
            {
                g: [
                    new Platform(1100, 425, 1425, false),
                    new Platform(975, 1400, 1625, false),
                    new Platform(850, 1600, 1825, false),
                    new Platform(600, 1350, 1600, false),
                    new Platform(650, 575, 1375, false),
                    new Platform(600, 400, 600, false),
                    new Platform(600, 175, 600, false),
                    new Platform(250, 500, 1275, false)
                ],
                c: [
                    new Platform(800, 425, 1000, false),
                    new Platform(700, 1000, 1600, false),
                    new Platform(350, 500, 1825, false),
                    new Platform(50, 175, 1275, false)
                ],

                l: [
                    new Platform(450, 775, 1125, true),
                    new Platform(1000, 700, 800, true),
                    new Platform(1600, 600, 700, true),
                    new Platform(600, 600, 675, true),
                    new Platform(200, 25, 625, true)
                ],
                r: [
                    new Platform(1400, 975, 1125, true),
                    new Platform(1600, 850, 1000, true),
                    new Platform(1800, 325, 875, true),
                    new Platform(1350, 600, 675, true),
                    new Platform(500, 250, 350, true),
                    new Platform(1250, 25, 275, true)
                ]
            },

            //ENTITIES ARRAY
            [
                new Entity(new Vector2D(1235, 150), 15, 100, Entity.cyanRectStack, Entity.rectCheck, Entity.endGate, undefined),
                new Entity(new Vector2D(975, 640), 375, 10, Entity.orangeRects, Entity.rectCheck, Entity.teleport, new Vector2D(1450, 575)),

                //The text here needs to be a function since settings only get set at preload().
                new Entity(new Vector2D(675, 925), 200, 100, Entity.dynamicTextBox, misc.noCheck, misc.none, () => { return `Welcome to PROJECT VECTOR\n\nUse ${settings.inputName.up}, ${settings.inputName.left}, ${settings.inputName.down} and ${settings.inputName.right} to move.` }),
                new Entity(new Vector2D(1200, 925), 200, 100, Entity.dynamicTextBox, misc.noCheck, misc.none, () => { return `Use ${settings.inputName.jump} to jump.` }),
                new Entity(new Vector2D(1700, 700), 75, 100, Entity.whiteTextBox, misc.noCheck, misc.none, `Jumping can be done off walls.`),
                new Entity(new Vector2D(1350, 450), 100, 100, Entity.dynamicTextBox, misc.noCheck, misc.none, () => { return `Use ${settings.inputName.dash} to dash.`}),
                new Entity(new Vector2D(700, 150), 195, 100, Entity.whiteTextBox, misc.noCheck, misc.none, 'The goal of this game is to complete levels in the least amount of time possible.\n\nThe timer at the top-left corner shows the amount of time taken.'),
                new Entity(new Vector2D(1050, 150), 100, 100, Entity.dynamicTextBox, misc.noCheck, misc.none, () => { return `Use ${settings.inputName.dash} to quick-restart.`})
            ]
        ),

        //LEVEL 1
        new Level (
            //LEVEL NAME
            'LEVEL 01',
            //STARTING POSISION
            new Vector2D(125, 1575),
            //OBJECTIVE(S)
            "- Activate all switches.\n- Reach the end gate.",
            //TRACK NAME
            'EVA - 失望した',

            //PLATFORM BUNDLE
            {
                g: [
                    new Platform(1600, 25, 1025, false),
                    new Platform(1450, 350, 450, false),
                    new Platform(1300, 1000, 1200, false),
                    new Platform(1400, 1175, 1675, false),
                    new Platform(550, 1400, 1525, false),
                    new Platform(1000, 975, 1425, false),
                    new Platform(900, 75, 1000, false),
                    new Platform(300, 225, 325, false),
                    new Platform(300, 900, 1800, false)
                ],
                c: [
                    new Platform(1100, 25, 1525, false),
                    new Platform(400, 900, 1675, false),
                    new Platform(800, 1150, 1275, false),
                    new Platform(50, 75, 1800, false),
                    new Platform(675, 225, 325, false)
                ],

                l: [
                    new Platform(50, 1075, 1625, true),
                    new Platform(450, 1450, 1625, true),
                    new Platform(1200, 1300, 1425, true),
                    new Platform(1525, 550, 1100, true),
                    new Platform(1275, 375, 800, true),
                    new Platform(1000, 900, 1025, true),
                    new Platform(100, 25, 925, true),
                    new Platform(325, 300, 675, true)
                ],
                r: [
                    new Platform(350, 1450, 1625, true),
                    new Platform(1000, 1300, 1625, true),
                    new Platform(1650, 375, 1425, true),
                    new Platform(1400, 550, 1025, true),
                    new Platform(1150, 375, 800, true),
                    new Platform(225, 300, 675, true),
                    new Platform(900, 300, 400, true),
                    new Platform(1775, 25, 325, true)
                ]
            },

            //ENTITIES ARRAY
            [
                //Goal
                new LabeledEntity(new Vector2D(1760, 175), 15, 125, StateEntity.cyanRectStackActive, StateEntity.rectCheckActive, Entity.endGate, null, GOAL),

                //Switches
                new LabeledEntity(new Vector2D(800, 1250), 50, 50, StateEntity.greenRect, StateEntity.rectCheckOnce, LabeledEntity.groupCheck, LabeledEntity.activateGoal, SWITCH),
                new LabeledEntity(new Vector2D(1100, 550), 50, 50, StateEntity.greenRect, StateEntity.rectCheckOnce, LabeledEntity.groupCheck, LabeledEntity.activateGoal, SWITCH),
                new LabeledEntity(new Vector2D(165, 300), 50, 50, StateEntity.greenRect, StateEntity.rectCheckOnce, LabeledEntity.groupCheck, LabeledEntity.activateGoal, SWITCH),
                new LabeledEntity(new Vector2D(385, 300), 50, 50, StateEntity.greenRect, StateEntity.rectCheckOnce, LabeledEntity.groupCheck, LabeledEntity.activateGoal, SWITCH),

                //Other
                new Entity(new Vector2D(1200, 990), 200, 10, Entity.orangeRects, Entity.rectCheck, Entity.teleport, new Vector2D(1462.5, 525)),
                new Entity(new Vector2D(1425, 1390), 225, 10, Entity.orangeRects, Entity.rectCheck, Entity.teleport, new Vector2D(1100, 1275))
            ]
        ),

        new Level (
            //LEVEL NAME
            'LEVEL TEMPLATE',
            //STARTING POSITION
            new Vector2D(1225, 825),
            //OBJECTIVE(S)
            "- X.",
            //TRACK NAME
            "Neon.Deflector - Outpost X",

            //PLATFORM BUNDLE
            {
                g: [
                    new Platform(1100, 175, 1025, false),
                    new Platform(900, 1000, 1525, false)
                ],
                c: [
                    new Platform(400, 175, 1525, false)
                ],

                l: [
                    new Platform(200, 375, 1125, true)
                ],
                r: [
                    new Platform(1000, 900, 1125, true),
                    new Platform(1500, 375, 925, true)
                ]
            },

            //ENTITIES ARRAY
            [
                new Entity(new Vector2D(900, 1100), 50, 10, Entity.redTriangles, Entity.rectCheck, Entity.knockback, new Vector2D(0, -50)),
                new StateEntity(new Vector2D(660, 1000), 50, 2, StateEntity.yellowCircles, StateEntity.circleCheckHold, Entity.dashRefresh),

                new Entity(new Vector2D(660, 750), 275, 100, Entity.whiteTextBox, misc.noCheck, misc.none, 'These are the entities that have been added up to now.\n\nTriggerboxes and thier effects will be re-written as entities and added back soon.'),
                new Entity(new Vector2D(400, 1000), 125, 50, Entity.whiteTextBox, misc.noCheck, misc.none, 'These will be useful for creating a tutorial level.'),
                new Entity(new Vector2D(400, 1150), 150, 50, Entity.whiteTextBox, misc.noCheck, misc.none, 'Textbox.'),
                new Entity(new Vector2D(900, 1150), 50, 50, Entity.whiteTextBox, misc.noCheck, misc.none, 'Jump pad.'),
                new Entity(new Vector2D(660, 1150), 100, 50, Entity.whiteTextBox, misc.noCheck, misc.none, 'Dash refresh')
            ]
        )
    ]
}
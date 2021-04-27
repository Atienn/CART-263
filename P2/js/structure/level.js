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
            new Vector2D(1250, 800),
            //OBJECTIVE(S)
            "- Reach the gate.",
            //TRACK NAME
            "Floating Anarchy - Cyber Funk",

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
                new Entity(new Vector2D(900, 1100), 50, 10, Entity.redTriangle, Entity.rectCheck, Entity.knockback, new Vector2D(0, -50)),
                new Entity(new Vector2D(660, 1000), 30, 30, Entity.yellowCircle, Entity.circleCheck, Entity.dashRefresh),

                new Entity(new Vector2D(660, 750), 275, 100, Entity.whiteTextBox, Entity.rectCheck, misc.none, 'These are the entities that have been added up to now.\n\nTriggerboxes and thier effects will be re-written as entities and added back soon.'),
                new Entity(new Vector2D(400, 1000), 125, 50, Entity.whiteTextBox, Entity.rectCheck, misc.none, 'These will be useful for creating a tutorial level.'),
                new Entity(new Vector2D(400, 1150), 150, 50, Entity.whiteTextBox, Entity.rectCheck, misc.none, 'Textbox.'),
                new Entity(new Vector2D(900, 1150), 50, 50, Entity.whiteTextBox, Entity.rectCheck, misc.none, 'Jump pad.'),
                new Entity(new Vector2D(660, 1150), 100, 50, Entity.whiteTextBox, Entity.rectCheck, misc.none, 'Dash refresh')
            ]
        ),

        //LEVEL 1
        new Level (
            //LEVEL NAME
            'LEVEL 01',
            //STARTING POSISION
            new Vector2D(125, 1575),
            //OBJECTIVE(S)
            "- Activate all switches.\n- Reach the gate.",
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
            []
        ),

        new Level (
            //LEVEL NAME
            'LEVEL TEMPLATE',
            //STARTING POSITION
            Vector2D.Zero(),
            //OBJECTIVE(S)
            "- X.",
            //TRACK NAME
            "Neon.Deflector - Outpost X",

            //PLATFORM BUNDLE
            {
                g: [],
                c: [],
                l: [],
                r: []
            },

            //ENTITIES ARRAY
            []
        )
    ]
}
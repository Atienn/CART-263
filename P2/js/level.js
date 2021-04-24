class Level {

    constructor(plattforms, entities, musicFile) {
        this.platformArr = plattforms;
        this.entityArr = entities;
        this.track = undefined;
        this.trackName = musicFile;
    }

    static list = [

        //LEVEL 0 (TEST LEVEL)
        new Level(

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

            //ENTITY ARRAY
            [
                new Entity(new Vector2D(900, 1100), 50, 10, Entity.redTriangle, Entity.rectCheck, Entity.knockback, new Vector2D(0, -50)),
                new Entity(new Vector2D(660, 1000), 30, 30, Entity.yellowCircle, Entity.circleCheck, Entity.dashRefresh),

                new Entity(new Vector2D(660, 750), 275, 100, Entity.whiteTextBox, Entity.rectCheck, misc.none, 'These are the entities that have been added up to now.\n\nTriggerboxes and thier effects will be re-written as entities and added back soon.'),
                new Entity(new Vector2D(400, 1000), 125, 50, Entity.whiteTextBox, Entity.rectCheck, misc.none, 'These will be useful for creating a tutorial level.'),
                new Entity(new Vector2D(400, 1150), 150, 50, Entity.whiteTextBox, Entity.rectCheck, misc.none, 'Textbox.'),
                new Entity(new Vector2D(900, 1150), 50, 50, Entity.whiteTextBox, Entity.rectCheck, misc.none, 'Jump pad.'),
                new Entity(new Vector2D(660, 1150), 100, 50, Entity.whiteTextBox, Entity.rectCheck, misc.none, 'Dash refresh')
            ],
            
            //LEVEL TRACK
            "INTL.CMD - Sunset City"
        )//,

        //LEVEL 1
        // new Level()
    ]
}
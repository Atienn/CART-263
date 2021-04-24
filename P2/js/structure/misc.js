let misc = {

    /** Function specifying doing nothing. */
    none() { },

    rectCheck(pos, cen, w, h) {
        return (
            pos.x >= cen.x - w && 
            pos.x <= cen.x + w &&
            pos.y >= cen.y - h &&
            pos.y <= cen.y + h 
        );
    },

    circleCheck(pos, cen, rad) {
        return ( dist(cen.x, cen.y, pos.x, pos.y) < rad );
    }
}
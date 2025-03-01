// File origin: VS1LAB A3

let tagId = 0;

/**
 * This script is a template for exercise VS1lab/Aufgabe3
 * Complete all TODOs in the code documentation.
 */

/** * 
 * A class representing geotags.
 * GeoTag objects should contain at least all fields of the tagging form.
 */



class GeoTag {
    gtId = 0;
    latitude = 0;
    longitude = 0;
    /**
     * @type {String}
     */
    name = "";
    /**
     * @type {String}
     */
    tag = "";



    // TODO: ... your code here ...
    constructor(latitude, longitude, name, tag) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.name = name;
        this.tag = tag;

        this.gtId = tagId++;
        return this;
    }


    get latitude() {
        return this.latitude;
    }

    get longitude() {
        return this.longitude;
    }

    get name() {
        return this.name;
    }

    get tag() {
        return this.tag;
    }

    get gtId() {
        return this.id;
    }
}

module.exports = GeoTag;

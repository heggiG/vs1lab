// File origin: VS1LAB A3

/**
 * This script is a template for exercise VS1lab/Aufgabe3
 * Complete all TODOs in the code documentation.
 */

/** * 
 * A class representing geotags.
 * GeoTag objects should contain at least all fields of the tagging form.
 */
class GeoTag {

    #name;

    #latitude;

    #longitude;

    #hashtag;

    constructor(name, latitude, longitude, hashtag) {
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.hashtag = hashtag;
    }

    distanceTo(other) {
        //return distance to other geotag in km from longitude and latitude
        return Math.sqrt(Math.pow(this.latitude - other.latitude, 2)
            + Math.pow(this.longitude - other.longitude, 2));

    }

}

module.exports = GeoTag;

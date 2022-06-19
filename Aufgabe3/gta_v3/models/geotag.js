// File origin: VS1LAB A3

<<<<<<< HEAD
var tagId = 0

/**
 * This script is a template for exercise VS1lab/Aufgabe3
 * Complete all TODOs in the code documentation.
 */

=======
>>>>>>> origin/dev
/** * 
 * A class representing geotags.
 * GeoTag objects should contain at least all fields of the tagging form.
 */
class GeoTag {
<<<<<<< HEAD
    //#gtId = 0;
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
        this.latitude = latitude
        this.longitude = longitude
        this.name = name
        this.tag = tag
        return this
    }

=======
    #name
    #hashtag
    #latitude
    #longitude


    // TODO: ... your code here ...
        /**
     * Create GeoTag instance.
     * @param {string} name
     * @param {string} hashtag
     * @param {string} latitude 
     * @param {string} longitude 
     */
         constructor(name, hashtag, latitude, longitude) {
            this.name = name;
            this.hashtag = hashtag;
            this.#latitude = (parseFloat(latitude)).toFixed(5);
            this.#longitude = (parseFloat(longitude)).toFixed(5);
        }

    get name() {
        return this.name;
    }

    get hashtag() {
        return this.hashtag;
    }
>>>>>>> origin/dev

    get latitude() {
        return this.latitude;
    }

    get longitude() {
        return this.longitude;
    }
<<<<<<< HEAD

    get name() {
        return this.name;
    }

    get tag() {
        return this.tag;
    }
=======
    
>>>>>>> origin/dev
}

module.exports = GeoTag;

// File origin: VS1LAB A3

/** * 
 * A class representing geotags.
 * GeoTag objects should contain at least all fields of the tagging form.
 */
class GeoTag {
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

    get latitude() {
        return this.latitude;
    }

    get longitude() {
        return this.longitude;
    }
    
}

module.exports = GeoTag;

// File origin: VS1LAB A3

let id = 0;

/**
 * A class representing geotags.
 * GeoTag objects should contain at least all fields of the tagging form.
 */
class GeoTag {

    id;

    latitude;

    longitude;

    name;

    tag;

    constructor(latitude, longitude, name, tag) {
        this.id = id++;
        this.latitude = latitude
        this.longitude = longitude
        this.name = name
        this.tag = tag
    }

    get id() {
        return this.id;
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
}

module.exports = GeoTag;

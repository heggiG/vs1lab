// File origin: VS1LAB A3

/**
 * This script is a template for exercise VS1lab/Aufgabe3
 * Complete all TODOs in the code documentation.
 */

const GeoTag = require("./geotag");

/**
 * A class for in-memory-storage of geotags
 * 
 * Use an array to store a multiset of geotags.
 * - The array must not be accessible from outside the store.
 * 
 * Provide a method 'addGeoTag' to add a geotag to the store.
 * 
 * Provide a method 'removeGeoTag' to delete geo-tags from the store by name.
 * 
 * Provide a method 'getNearbyGeoTags' that returns all geotags in the proximity of a location.
 * - The location is given as a parameter.
 * - The proximity is computed by means of a radius around the location.
 * 
 * Provide a method 'searchNearbyGeoTags' that returns all geotags in the proximity of a location that match a keyword.
 * - The proximity constrained is the same as for 'getNearbyGeoTags'.
 * - Keyword matching should include partial matches from name or hashtag fields. 
 */
class InMemoryGeoTagStore{

    static #instance = null;

    #storage = [];

    // #constructor() {
    //
    // }

    addGeoTag(geoTag) {
        if (!geoTag instanceof GeoTag) {
            throw new Error("Invalid GeoTag");
        }
        this.#storage.push(geoTag);
    }

    removeGeoTag(name) {
        this.#storage = this.#storage.filter(geoTag => geoTag.name !== name);
    }

    getNearbyGeoTags(location, radius) {
        return this.#storage.filter(geoTag => geoTag.distanceTo(location) <= radius);
    }

    searchNearbyGeoTags(location, radius, keyword) {
        return this.#storage.filter(geoTag => geoTag.distanceTo(location) <= radius &&
            (geoTag.name.includes(keyword) || geoTag.hashtag.includes(keyword)));
    }

    get storage() {
        return this.#storage;
    }

    /**
      * get singleton instance
     */
    static getInstance() {
        if (!InMemoryGeoTagStore.instance) {
            InMemoryGeoTagStore.instance = new InMemoryGeoTagStore();
        }
        return InMemoryGeoTagStore.instance;
    }
}

module.exports = InMemoryGeoTagStore

// File origin: VS1LAB A3

<<<<<<< HEAD
const GeoTag = require("./geotag");
const GeoTagExamples = require("./geotag-examples");

/**
 * This script is a template for exercise VS1lab/Aufgabe3
 * Complete all TODOs in the code documentation.
 */
=======
const GeoTagExamples = require("./geotag-examples");

>>>>>>> origin/dev

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
<<<<<<< HEAD
    // TODO: ... your code here ...
    static #instance = null;
    /**
     * @type {GeoTag[]}
     */
    #tagStorage = []
    
    /**
     * 
     * @returns {InMemoryGeoTagStore}
     */
    static getInstance() {
        if (InMemoryGeoTagStore.#instance == null) {
            InMemoryGeoTagStore.#instance = new InMemoryGeoTagStore();
            GeoTagExamples.geoTagList.forEach(it => {
                this.#instance.addGeoTag(it);
            })
        }
        return InMemoryGeoTagStore.#instance
    }

    /**
     * 
     * @param {GeoTag} tag 
     */
    addGeoTag(tag) {
        this.#tagStorage.push(tag); 
    }

    /**
     * 
     * @param {String} name 
     */
    removeGeoTag(name) {
        this.#tagStorage = this.#tagStorage.filter(geoTag => geoTag.name != name);
    }

    /**
     * 
     * @param {int} latitude 
     * @param {int} longitude 
     * @param {int} radius 
     * @returns {GeoTag[]}
     */
    getNearbyGeoTags(latitude, longitude, radius) {
        let temp = [];
        this.#tagStorage.forEach(item => {
            if (Math.sqrt(Math.pow(Math.abs(item.latitude - latitude), 2) + Math.pow(Math.abs(item.latitude - longitude), 2)) <= radius) {
                temp.push(item);
            }
        })

        return temp;
    }

    /**
     * 
     * @param {int} latitude 
     * @param {int} longitude 
     * @param {int} radius 
     * @param {String} keyword 
     * @returns {GeoTag[]}
     */
    searchNearbyGeoTags(latitude, longitude, radius, keyword) {
        let temp = [];
        this.#tagStorage.forEach(item => {
            if ((Math.sqrt(Math.pow(item.latitude - latitude, 2) + Math.pow(item.longitude - longitude, 2)) <= radius) 
            && (item.name.includes(keyword) || (item.tag != undefined &&item.tag.includes(keyword)))) {
                temp.push(item);
            }
        })

        return temp;
    }

    /**
     * 
     * @returns {GeoTag[]}
     */
    getAllGeoTags() {
        return this.#tagStorage
=======

    #geoTags = [];
    constructor() {
        this.geoTags = GeoTagExamples.tagList();
    }

    addGeoTag(geoTag) {
        geoTags.push(geoTag);
    }

    removeGeoTag(geoTagName) {
        for(i = 0; i < geoTags.length; i++) {
            if(this.geoTags[i].name() == geoTagName) {
                this.geoTags.splice(i,1);
            }
        }
    }



    getNearbyGeoTags(latitude, longitude) {
        result = [];
        radius = 10; //some radius
        for(i = 0; i < geoTags.length; i++) {
            if(this.#distance(this.geoTags[i].latitude(), this.geoTags[i].longitude, latitude, longitude) <= radius) {
                result.push(this.geoTags[i]);
            }
        }
    }

    #distance(latitude1, longitude1, latitude2, longitude2) {
        return Math.sqrt((latitude1 - latitude2) ^ 2 + (longitude1 - longitude2) ^ 2)
    }


    searchNearbyGeoTags(latitude, longitude, keyword) {
        nearbyGeoTags = getNearbyGeoTags(latitude, longitude);
        result = [];

        for(i = 0; i < nearbyGeoTags.length; i++) {
            if((nearbyGeoTags[i].name().toLowerCase().indexOf(keyword.toLowerCase()) > -1)
            || (nearbyGeoTags[i].hashtag().toLowerCase().indexOf(keyword.toLowerCase()) > -1)) {
                result.push(nearbyGeoTags[i]);
            }
        }
        return result;
>>>>>>> origin/dev
    }
}

module.exports = InMemoryGeoTagStore

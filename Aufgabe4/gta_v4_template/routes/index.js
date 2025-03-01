// File origin: VS1LAB A3, A4

/**
 * This script defines the main router of the GeoTag server.
 * It's a template for exercise VS1lab/Aufgabe3
 * Complete all TODOs in the code documentation.
 */

/**
 * Define module dependencies.
 */

const {application, json} = require('express');
const express = require('express');
const router = express.Router();
const url = require("url");

/**
 * The module "geotag" exports a class GeoTagStore.
 * It represents geotags.
 */
// eslint-disable-next-line no-unused-vars
const GeoTag = require('../models/geotag');
const GeoTagExamples = require('../models/geotag-examples');
const InMemoryGeoTagStore = require('../models/geotag-store');

/**
 * The module "geotag-store" exports a class GeoTagStore.
 * It provides an in-memory store for geotag objects.
 */
// eslint-disable-next-line no-unused-vars
const GeoTagStore = require('../models/geotag-store');

const Paging = require('../models/paging-utils');

// App routes (A3)

/**
 * Route '/' for HTTP 'GET' requests.
 * (http://expressjs.com/de/4x/api.html#app.get.method)
 *
 * Requests cary no parameters
 *
 * As response, the ejs-template is rendered without geotag objects.
 */

router.get('/', (req, res) => {
    let val_latitude = (req.body["latitude"] != undefined) ? req.body["latitude"] : "-49.01508"
    let val_longitude = (req.body["longitude"] != undefined) ? req.body["longitude"] : "-8.39007"
    let getTagStorage = InMemoryGeoTagStore.getInstance();
    let tempTagList = getTagStorage.getAllGeoTags();
    res.render('index', {
        taglist: Paging.getPage(tempTagList, 0),
        ejs_latitude: val_latitude,
        ejs_longitude: val_longitude,
        ejs_currentPageNumber: 1,
        ejs_maxPageNumber: Math.ceil(tempTagList.length / Paging.getPageSize()),
        ejs_mapTagList: JSON.stringify(Paging.getPage(tempTagList, 0)),
        ejs_numberOfEntries: tempTagList.length
    });
});

/**
 * Route '/tagging' for HTTP 'POST' requests.
 * (http://expressjs.com/de/4x/api.html#app.post.method)
 *
 * Requests cary the fields of the tagging form in the body.
 * (http://expressjs.com/de/4x/api.html#req.body)
 *
 * Based on the form data, a new geotag is created and stored.
 *
 * As response, the ejs-template is rendered with geotag objects.
 * All result objects are located in the proximity of the new geotag.
 * To this end, "GeoTagStore" provides a method to search geotags
 * by radius around a given location.
 */
router.post('/tagging', (req, res) => {
    let getTagStorage = InMemoryGeoTagStore.getInstance();
    getTagStorage.addGeoTag(new GeoTag(req.body["latitude"], req.body["longitude"], req.body["name"], req.body["hashtag"]));
    let tempTagList = getTagStorage.getNearbyGeoTags(req.body["latitude"], req.body["longitude"], 5);
    res.render('index', {
        taglist: tempTagList,
        ejs_latitude: req.body["latitude"],
        ejs_longitude: req.body["longitude"],
        ejs_mapTagList: JSON.stringify(tempTagList)
    });
});

/**
 * Route '/discovery' for HTTP 'POST' requests.
 * (http://expressjs.com/de/4x/api.html#app.post.method)
 *
 * Requests cary the fields of the discovery form in the body.
 * This includes coordinates and an optional search term.
 * (http://expressjs.com/de/4x/api.html#req.body)
 *
 * As response, the ejs-template is rendered with geotag objects.
 * All result objects are located in the proximity of the given coordinates.
 * If a search term is given, the results are further filtered to contain
 * the term as a part of their names or hashtags.
 * To this end, "GeoTagStore" provides methods to search geotags
 * by radius and keyword.
 */
router.post('/discovery', (req, res) => {
    let getTagStorage = InMemoryGeoTagStore.getInstance();
    let tempTagList = getTagStorage.searchNearbyGeoTags(req.body["latitude"], req.body["longitude"], 5, req.body["query"]);
    res.render('index', {
        taglist: tempTagList,
        ejs_latitude: req.body["latitude"],
        ejs_longitude: req.body["longitude"],
        //ejs_mapTagList: JSON.stringify(tempTagList)
    });
})


// API routes (A4)

/**
 * Route '/api/geotags' for HTTP 'GET' requests.
 * (http://expressjs.com/de/4x/api.html#app.get.method)
 *
 * Requests contain the fields of the Discovery form as query.
 * (http://expressjs.com/de/4x/api.html#req.body)
 *
 * As a response, an array with Geo Tag objects is rendered as JSON.
 * If 'searchterm' is present, it will be filtered by search term.
 * If 'latitude' and 'longitude' are available, it will be further filtered based on radius.
 */

// TODO: ... your code here ...


router.get('/api/geotags', (req, res) => {
    let tagStorage = InMemoryGeoTagStore.getInstance();
    let tempTagList = [];
    let query = url.parse(req.url, true).query;
    let radius = -1;
    if (query["radius"] == undefined) {
        radius = 5;
    } else {
        radius = query["radius"];
    }
    if (query["latitude"] >= 0 && query["longitude"] >= 0) {
        if (query["query"] != undefined) {
            //if(query["searchterm"] !== undefined) {
            tempTagList = tagStorage.searchNearbyGeoTags(query["latitude"], query["longitude"], radius, query["query"]);
        } else {
            tempTagList = tagStorage.getNearbyGeoTags(query["latitude"], query["longitude"], radius);
        }
    } else {
        if (query["query"] != undefined) {
            ///if(query["searchterm"] !== undefined) {
            tempTagList = tagStorage.searchGeoTags(query["query"]);
        } else {
            tempTagList = tagStorage.getAllGeoTags();
        }
    }
    console.log(tempTagList)

    res.json(Paging.getPage(tempTagList, 0));
});


/**
 * Route '/api/geotags' for HTTP 'POST' requests.
 * (http://expressjs.com/de/4x/api.html#app.post.method)
 *
 * Requests contain a GeoTag as JSON in the body.
 * (http://expressjs.com/de/4x/api.html#req.query)
 *
 * The URL of the new resource is returned in the header as a response.
 * The new resource is rendered as JSON in the response.
 */

// TODO: ... your code here ...

router.post('/api/geotags', (req, res) => {
    let tagStorage = InMemoryGeoTagStore.getInstance();
    let simpleGeoTag = req.body;
    let latitude = simpleGeoTag.latitude;
    let longitude = simpleGeoTag.longitude;
    let name = simpleGeoTag.name;
    let tag = simpleGeoTag.tag;
    let newGeoTag = new GeoTag(latitude, longitude, name, tag);
    tagStorage.addGeoTag(newGeoTag);
    let url = '/api/geotags/' + newGeoTag.gtId;
    res.location(url);
    console.log('newGeoTag.gtId' + newGeoTag.gtId);
    console.log('url' + url);
    res.statusCode = 201; //Code stems from the Readme
    res.json(newGeoTag);
})

/**
 * Route '/api/geotags/:id' for HTTP 'GET' requests.
 * (http://expressjs.com/de/4x/api.html#app.get.method)
 *
 * Requests contain the ID of a tag in the path.
 * (http://expressjs.com/de/4x/api.html#req.params)
 *
 * The requested tag is rendered as JSON in the response.
 */

// TODO: ... your code here ...

router.get('/api/geotags/:id', (req, res) => {
    let tagStorage = InMemoryGeoTagStore.getInstance();
    let requestedGeoTag = tagStorage.getGeoTagById(req.params.id); //ID!
    res.json(requestedGeoTag);
});

/**
 * Route '/api/geotags/:id' for HTTP 'PUT' requests.
 * (http://expressjs.com/de/4x/api.html#app.put.method)
 *
 * Requests contain the ID of a tag in the path.
 * (http://expressjs.com/de/4x/api.html#req.params)
 *
 * Requests contain a GeoTag as JSON in the body.
 * (http://expressjs.com/de/4x/api.html#req.query)
 *
 * Changes the tag with the corresponding ID to the sent value.
 * The updated resource is rendered as JSON in the response.
 */

// TODO: ... your code here ...

router.put('/api/geotags/:id', (req, res) => {
    let tagStorage = InMemoryGeoTagStore.getInstance();
    tagStorage.removeGeoTagById(req.params.id);
    let simpleGeoTag = req.body;
    let latitude = simpleGeoTag.latitude;
    let longitude = simpleGeoTag.longitude;
    let name = simpleGeoTag.name;
    let tag = simpleGeoTag.tag;
    let newGeoTag = new GeoTag(latitude, longitude, name, tag);
    newGeoTag.gtId = req.params.id;
    tagStorage.addGeoTag(newGeoTag);
    res.json(newGeoTag);
})

/**
 * Route '/api/geotags/:id' for HTTP 'DELETE' requests.
 * (http://expressjs.com/de/4x/api.html#app.delete.method)
 *
 * Requests contain the ID of a tag in the path.
 * (http://expressjs.com/de/4x/api.html#req.params)
 *
 * Deletes the tag with the corresponding ID.
 * The deleted resource is rendered as JSON in the response.
 */

// TODO: ... your code here ...

router.delete('/api/geotags/:id', (req, res) => {
    let tagStorage = InMemoryGeoTagStore.getInstance();
    let deletedGeoTag = tagStorage.getGeoTagById(req.params.id);
    tagStorage.removeGeoTagById(req.params.id);

    res.json(deletedGeoTag);
})


router.get('/api/geotags/page/:id', (req, res) => {
    let tagStorage = GeoTagStore.getInstance();
    let searchterm = req.query.searchterm
    let geotags = []
    if (searchterm == undefined) {
        geotags = tagStorage.getAllGeoTags(); //ID!
    } else {
        geotags = tagStorage.searchGeoTags(searchterm);
    }
    res.json(Paging.getPage(geotags, req.params.id - 1));
});

module.exports = router;

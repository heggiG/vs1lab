// File origin: VS1LAB A3


const GeoTag = require("./geotag");

/**
 * A class representing example geoTags at HKA
 * 
 * TODO: populate your InMemoryGeoTagStore with these tags
 * 
 */
class GeoTagExamples {
    /**
     * Provides some geoTag data
     */
    static get tagList() {
        return [
            new GeoTag('Castle', 49.013790, 8.404435, '#sight'),
            new GeoTag('IWI', 49.013790, 8.390071, '#edu'),
            new GeoTag('Building E', 49.014993, 8.390049, '#campus'),
            new GeoTag('Building F', 49.015608, 8.390112, '#campus'),
            new GeoTag('Building M', 49.016171, 8.390155, '#campus'),
            new GeoTag('Building LI', 49.015636, 8.389318, '#campus'),
            new GeoTag('Auditorium He', 49.014915, 8.389264, '#campus'),
            new GeoTag('Building R', 49.014992, 8.392365, '#campus'),
            new GeoTag('Building A', 49.015738, 8.391619, '#campus'),
            new GeoTag('Building B', 49.016843, 8.391372, '#campus'),
            new GeoTag('Building K', 49.013190, 8.392090, '#campus'),
        ];
    }
}

module.exports = GeoTagExamples;

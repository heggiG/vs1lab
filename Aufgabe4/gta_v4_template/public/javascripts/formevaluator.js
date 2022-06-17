
document.addEventListener('DOMContentLoaded', () => {

    document.getElementById("tag-form").addEventListener("submit", (event) => {
        event.preventDefault();
        let name = document.getElementById('inp_name').value;
        let tag = document.getElementById('inp_hashtag').value;
        let longitude = parseFloat(document.getElementById('inp_longitude').value);
        let latitude = parseFloat(document.getElementById('inp_latitude').value);
        let geotag = new SimpleTag(latitude, longitude, name, tag); //
        fetch('/api/geotags/', { //ajax call to put new tag
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(geotag),
        }).then(r => { //update map
            let map = document.getElementById("img_map");
            let currentTags = JSON.parse(map.dataset.tags);
            currentTags.push(geotag);
            map.dataset.tags = JSON.stringify(currentTags);
            updateLocation();
        }).catch(e => console.error(e))

    }, true);

    document.getElementById("discoveryFilterForm").addEventListener("submit", (event) => {
        event.preventDefault();
        let term = document.getElementById('inp_searchterm');
        fetch('/api/geotags/', {
            method: 'GET',
            headers: {
                'Content-Type': 'text/plain',
            },
            body: {
                'searchterm': term.value,
            },
        }).then(r => r.json())
            .then(tags => {
            let imgMap = document.getElementById("img_map");
            imgMap.dataset.tags = JSON.stringify(tags);
            updateLocation();
        }).catch(e => console.error(e))

    }, true);

});



/**
 * Helper class to send geotag objects to the server
 */
class SimpleTag {
    name
    tag
    longitude
    latitude

    constructor(longitude, latitude, name, tag) {
        this.name = name;
        this.tag = tag;
        this.longitude = longitude;
        this.latitude = latitude;
    }
}

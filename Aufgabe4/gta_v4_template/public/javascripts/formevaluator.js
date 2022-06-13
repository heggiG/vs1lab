import GeoTag from "../../models/geotag";

document.addEventListener('DOMContentLoaded', () => {

    document.getElementById("tag-form").addEventListener("submit", () => {
        let name = document.getElementById('inp_name');
        let tag = document.getElementById('inp_hashtag');
        let longitude = document.getElementById('inp_longitude');
        let latitude = document.getElementById('inp_latitude');
        let geotag = new GeoTag(latitude, longitude, name, tag);
        fetch('/api/geotags/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(geotag),
        }).then(r => console.log(r)).catch(e => console.error(e))

        //map erneuern
    });

    document.getElementById("discoveryFilterForm").addEventListener("submit", () => {
        let term = document.getElementById('inp_searchterm');
        fetch('/api/geotags/', {
            method: 'GET',
            headers: {
                'Content-Type': 'text/plain',
            },
            body: {
                'searchterm': term
            },
        }).then(r => r.json())
            .then(tags => {
            let imgMap = document.getElementById("img_map");
            imgMap.dataset.tags = JSON.stringify(tags);
            updateLocation();
        }).catch(e => console.error(e))

    });

});


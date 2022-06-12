import GeoTag from "../../models/geotag";


document.getElementById("tag-form").addEventListener("submit", () => {
    let name = document.getElementById('inp_name');
    let tag = document.getElementById('inp_hashtag');
    let longitude = document.getElementById('inp_longitude');
    let latitude = document.getElementById('inp_latitude');
    let geotag = new GeoTag(latitude, longitude, name, tag);
    let id = -1;
    fetch(`/api/geotags/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(geotag),
    }).then(r => console.log(r)).catch(e => console.error(e))

    //map erneuern
});

document.getElementById("discoveryFilterForm").addEventListener("submit", () => {
    let form = document.getElementById("discoveryFilterForm");
    let id = -1;
    fetch(`/api/geotags/${id}`)
        .then(r => r.json())
        .then(r => {}) //id finden
        .catch(e => console.error(e));

    //map erneuern
    //tag liste erneuern
});


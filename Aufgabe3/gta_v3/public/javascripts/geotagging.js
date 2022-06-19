// File origin: VS1LAB A2

/* eslint-disable no-unused-vars */

// This script is executed when the browser loads index.html.

// "console.log" writes to the browser's console. 
// The console window must be opened explicitly in the browser.
// Try to find this output in the browser...
console.log("The geoTagging script is going to start...");


<<<<<<< HEAD
function changeValueOfInput(id, value) {
    document.getElementById(id).value = value;
}

=======
>>>>>>> origin/dev
/**
 * TODO: 'updateLocation'
 * A function to retrieve the current location and update the page.
 * It is called once the page has been fully loaded.
 */
// ... your code here ...
<<<<<<< HEAD
function updateLocation() {
    let inp_latitude = document.getElementById("inp_latitude");
    let inp_longitude = document.getElementById("inp_longitude");
    let inp_hiddenLatitude = document.getElementById("inp_hiddenLatitude");
    let inp_hiddenLongitude = document.getElementById("inp_hiddenLongitude");

    if (inp_latitude.value < 0) { //Swap Frog: better gate
        LocationHelper.findLocation((callback) => {
            changeValueOfInput("inp_latitude", callback.latitude);
            changeValueOfInput("inp_longitude", callback.longitude);

            changeValueOfInput("inp_hiddenLongitude", callback.longitude);
            changeValueOfInput("inp_hiddenLatitude", callback.latitude);
        
            
            let mapManager = new MapManager('f64689zc2fhvhu0miIiVlLaUAchTYDWv');
            let img_map = document.getElementById("img_map"); 

            let tagString = img_map.dataset.tags
            let tagList = JSON.parse(tagString)

            img_map.src = mapManager.getMapUrl(callback.latitude, callback.longitude, tagList);
        });
    } else {
        let img_map = document.getElementById("img_map"); 
        
        let tagString = img_map.dataset.tags
        let tagList = JSON.parse(tagString)
        
        let mapManager = new MapManager('f64689zc2fhvhu0miIiVlLaUAchTYDWv');
        img_map.src = mapManager.getMapUrl(inp_latitude.value, inp_longitude.value, tagList)
    }
=======
function callbackFunction(helper){
    const latitude = helper.latitude;
    const longitude = helper.longitude;
    document.getElementById("inp_latitude" ).value = latitude;
    document.getElementById("inp_longitude").value = longitude;

    document.getElementById("inp_hiddenLatitude").value = latitude;
    document.getElementById("inp_hiddenLongitude" ).value = longitude;

    manager = new MapManager ("i6wFNU4SfKpS3CELEc2fO4oeVuQFDNkA");
    var url = manager.getMapUrl(latitude, longitude);
    
    document.getElementById("mapView").src = url;
   
}

function updateLocation(){
    LocationHelper.findLocation(callbackFunction);
>>>>>>> origin/dev
}

// Wait for the page to fully load its DOM content, then call updateLocation
document.addEventListener("DOMContentLoaded", () => {
<<<<<<< HEAD
    updateLocation()
    //alert("Please change the script 'geotagging.js'");
=======
    //alert("Please change the script 'geotagging.js'");
    updateLocation();
>>>>>>> origin/dev
});
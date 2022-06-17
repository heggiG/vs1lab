// File origin: VS1LAB A2

/* eslint-disable no-unused-vars */

// This script is executed when the browser loads index.html.

// "console.log" writes to the browser's console. 
// The console window must be opened explicitly in the browser.
// Try to find this output in the browser...
console.log("The geoTagging script is going to start...");


/**
 * TODO: 'updateLocation'
 * A function to retrieve the current location and update the page.
 * It is called once the page has been fully loaded.
 */
// ... your code here ...
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
}

// Wait for the page to fully load its DOM content, then call updateLocation
document.addEventListener("DOMContentLoaded", () => {
    //alert("Please change the script 'geotagging.js'");
    updateLocation();
});
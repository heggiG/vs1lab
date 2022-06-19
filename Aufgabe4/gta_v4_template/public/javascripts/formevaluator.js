
document.addEventListener('DOMContentLoaded', () => {

    document.getElementById("tag-form").addEventListener("submit", (event) => {
        event.preventDefault();
        let name = document.getElementById('inp_name').value;
        let tag = document.getElementById('inp_hashtag').value;
        let longitude = parseFloat(document.getElementById('inp_longitude').value);
        let latitude = parseFloat(document.getElementById('inp_latitude').value);
        let geotag = new SimpleTag(latitude, longitude, name, tag); //

        fetch('/api/geotags/', { //ajax call to put new tag
            method: 'POST',
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
            //renewTagList();
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



    //let dataElement = document.getElementById("dataElement");

    document.getElementById("btn_previousPage").addEventListener("click", (event) => {
        let dataElement = document.getElementById("dataElement")
        if(dataElement.dataset["currentpage"] > 1) {
            fetch("/api/geotags/page/" + (Number(dataElement.dataset.currentpage) - 1), {
                mehod: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(r => r.json()).then(tags => {
                let tagsArray = JSON.parse(tags);
                dataElement.dataset.currentpage = Number(dataElement.dataset.currentpage) - 1;
                let listEntries = document.getElementsByClassName("resultListElement")

                document.getElementById("discoveryResults").innerHTML = "";

                for (let index = 0; index < tagsArray.length; index++) {
                    let entry = document.createElement("li");
                    entry.classList.add("resultListElement");
                    
                    entry.innerHTML = tagsArray[index].name +" (" + tagsArray[index].latitude + "," + tagsArray[index].longitude + ")" + tagsArray[index].tag
                    
                    document.getElementById("discoveryResults").appendChild(entry);
                    //listEntries[index].innerHTML = tagsArray[index].name +" (" + tagsArray[index].latitude + "," + tagsArray[index].longitude + ")" + tagsArray[index].hashtag
                }
                dataElement.dataset["currentpage"] = Number(dataElement.dataset["currentpage"]);
                document.getElementById("lbl_currentPageNumber").innerHTML = dataElement.dataset["currentpage"];

                let imgMap = document.getElementById("img_map");
                imgMap.dataset.tags = JSON.stringify(tags);
                updateButtons();
            })
        }
    })
    
    
    document.getElementById("btn_nextPage").addEventListener("click", (event) => {
        let dataElement = document.getElementById("dataElement")
        if(dataElement.dataset["currentpage"] < dataElement.dataset["lastpage"]) {
            fetch("/api/geotags/page/" + (Number(dataElement.dataset.currentpage) +1), {
                mehod: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(r => r.json()).then(tags => {
                let tagsArray = JSON.parse(tags);
                dataElement.dataset.currentpage = Number(dataElement.dataset.currentpage) + 1;
               
                document.getElementById("discoveryResults").innerHTML = "";
                
                for (let index = 0; index < tagsArray.length; index++) {
                    let entry = document.createElement("li");
                    entry.classList.add("resultListElement");
                    
                    entry.innerHTML = tagsArray[index].name +" (" + tagsArray[index].latitude + "," + tagsArray[index].longitude + ")" + tagsArray[index].tag
                    
                    document.getElementById("discoveryResults").appendChild(entry);
                }
                dataElement.dataset["currentpage"] = Number(dataElement.dataset["currentpage"])  
                document.getElementById("lbl_currentPageNumber").innerHTML = dataElement.dataset["currentpage"]

                let imgMap = document.getElementById("img_map");
                imgMap.dataset.tags = JSON.stringify(tags);
                updateButtons();
            })
        }
    })


    updateButtons();
});

function updateButtons(){
    let dataElement = document.getElementById("dataElement");
    if (dataElement.dataset["currentpage"] == 1) {
        document.getElementById("btn_previousPage").disabled = true;
    } else {
        document.getElementById("btn_previousPage").removeAttribute("disabled")
    }
    if (dataElement.dataset["currentpage"] == dataElement.dataset["lastpage"]) {
        document.getElementById("btn_nextPage").disabled = true;
    } else {
        document.getElementById("btn_nextPage").removeAttribute("disabled")
    }
}

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

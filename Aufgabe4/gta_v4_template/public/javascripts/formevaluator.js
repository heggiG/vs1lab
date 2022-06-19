
document.addEventListener('DOMContentLoaded', () => {

    document.getElementById("tag-form").addEventListener("submit", (event) => {
        event.preventDefault();
        let dataElement = document.getElementById("dataElement");
        let name = document.getElementById('inp_name').value;
        let tag = document.getElementById('inp_hashtag').value;
        let longitude = parseFloat(document.getElementById('inp_longitude').value);
        let latitude = parseFloat(document.getElementById('inp_latitude').value);
        let geotag = new SimpleTag(latitude, longitude, name, tag); //new tag to send over ajax

        fetch('/api/geotags/', { //ajax call to put new tag
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(geotag),
        }).then(r => {
            let map = document.getElementById("img_map");
            let currentTags = JSON.parse(map.dataset.tags); //get the current tags
            if (dataElement.dataset.currentpage == dataElement.dataset.lastpage) {
                currentTags.push(geotag); //add the new tag client side
            }

            document.getElementById("discoveryResults").innerHTML = "";
            
            for (let index = 0; index < currentTags.length; index++) {
                let entry = document.createElement("li");
                entry.classList.add("resultListElement");
                
                entry.innerHTML = currentTags[index].name +" (" + currentTags[index].latitude + "," + currentTags[index].longitude + ") " + currentTags[index].tag
                
                document.getElementById("discoveryResults").appendChild(entry);
            }
            
            dataElement.dataset["numberofentries"] = (Number(dataElement.dataset["numberofentries"]) + 1).toString()
            document.getElementById("lbl_numberOfEntries").value = dataElement.dataset["numberofentries"]
            
            map.dataset.tags = JSON.stringify(currentTags); //set the new taglist
            updateLocation(); //update the map
        }).catch(e => console.error(e))

    }, true);

    document.getElementById("discoveryFilterForm").addEventListener("submit", (event) => {
        event.preventDefault();
        let dataElement = document.getElementById("dataElement");
        let term = document.getElementById('inp_searchterm').value;
        fetch(`/api/geotags/?query=${term}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'text/plain',
            },
        }).then(r => r.json())
            .then(tags => {
                document.getElementById("discoveryResults").innerHTML = "";

                dataElement.dataset.currentpage = 1;
                               
                for (let index = 0; index < tags.length; index++) {
                    let entry = document.createElement("li");
                    entry.classList.add("resultListElement");
                    
                    entry.innerHTML = tags[index].name +" (" + tags[index].latitude + "," + tags[index].longitude + ") " + tags[index].tag
                    
                    document.getElementById("discoveryResults").appendChild(entry);
                }

                document.getElementById("lbl_currentPageNumber").innerHTML = dataElement.dataset["currentpage"];

                let imgMap = document.getElementById("img_map");
                imgMap.dataset.tags = JSON.stringify(tags);
                updateLocation();
        }).catch(e => console.error(e))

    }, true);



    //let dataElement = document.getElementById("dataElement");

    document.getElementById("btn_previousPage").addEventListener("click", (event) => {
        let dataElement = document.getElementById("dataElement")
        if(dataElement.dataset["currentpage"] > 1) {
            fetch(`/api/geotags/page/${(Number(dataElement.dataset.currentpage) -1)}?searchterm=${document.getElementById("inp_searchterm").value}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'cache-control': 'no-cache',
                }
            }).then(r => r.json()).then(tagsArray => {
                dataElement.dataset.currentpage = Number(dataElement.dataset.currentpage) - 1;
                
                document.getElementById("discoveryResults").innerHTML = "";
                for (let index = 0; index < tagsArray.length; index++) {
                    let entry = document.createElement("li");
                    entry.classList.add("resultListElement");
                    
                    entry.innerHTML = tagsArray[index].name +" (" + tagsArray[index].latitude + "," + tagsArray[index].longitude + ") " + tagsArray[index].tag
                    
                    document.getElementById("discoveryResults").appendChild(entry);
                } 
                
                dataElement.dataset["currentpage"] = Number(dataElement.dataset["currentpage"]);
                document.getElementById("lbl_currentPageNumber").innerHTML = dataElement.dataset["currentpage"];

                let imgMap = document.getElementById("img_map");
                imgMap.dataset.tags = JSON.stringify(tagsArray);
                updateButtons();
                updateLocation();
            })
        }
    })
    
    
    document.getElementById("btn_nextPage").addEventListener("click", (event) => {
        let dataElement = document.getElementById("dataElement")
        if(dataElement.dataset["currentpage"] < dataElement.dataset["lastpage"]) {
            fetch(`/api/geotags/page/${(Number(dataElement.dataset.currentpage) +1)}?searchterm=${document.getElementById("inp_searchterm").value}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'cache-control': 'no-cache',
                }
            }).then(r => r.json()).then(tagsArray => {
                dataElement.dataset.currentpage = Number(dataElement.dataset.currentpage) + 1;
               
                document.getElementById("discoveryResults").innerHTML = "";
                for (let index = 0; index < tagsArray.length; index++) {
                    let entry = document.createElement("li");
                    entry.classList.add("resultListElement");
                    
                    entry.innerHTML = tagsArray[index].name +" (" + tagsArray[index].latitude + "," + tagsArray[index].longitude + ") " + tagsArray[index].tag
                    
                    document.getElementById("discoveryResults").appendChild(entry);
                }
                dataElement.dataset["currentpage"] = Number(dataElement.dataset["currentpage"])  
                document.getElementById("lbl_currentPageNumber").innerHTML = dataElement.dataset["currentpage"]

                let imgMap = document.getElementById("img_map");
                imgMap.dataset.tags = JSON.stringify(tagsArray);

                updateButtons();
                updateLocation();
            })
        }
    })


    updateButtons();
});

async function updateButtons(){
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

    constructor(latitude, longitude, name, tag) {
        this.name = name;
        this.tag = tag;
        this.longitude = longitude;
        this.latitude = latitude;
    }
}

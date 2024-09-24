import {apiKey} from './ApiKey.js';

const searchBaseURL = "https://api.si.edu/openaccess/api/v1.0/search";

/* to check results  ––––––––>  https://collections.si.edu/search/  */
const search =  `unit_code:"NMNHENTO" AND online_visual_material:true`;

// array that we will write into
let myArray = [];

// string that will hold the stringified JSON data
export let jsonString = '';

// search: fetches an array of terms based on term category
function fetchSearchData(searchTerm) {
  let url = searchBaseURL + "?api_key=" + apiKey + "&q=" + searchTerm;
  console.log(url);

  window
  .fetch(url)
  .then(res => res.json())
  .then(data => {
    console.log(data)
    
    // constructing search queries to get all the rows of data
    // you can change the page size
    let pageSize = 1000;
    let numberOfQueries = Math.ceil(data.response.rowCount / pageSize);
    console.log(numberOfQueries)
    let searchAllURL;
    for(let i = 0; i < numberOfQueries; i++) {
      // making sure that our last query calls for the exact number of rows
      if (i === (numberOfQueries - 1)) {
       searchAllURL = url + `&start=${i * pageSize}&rows=${data.response.rowCount - (i * pageSize)}`;
      } else {
        searchAllURL = url + `&start=${i * pageSize}&rows=${pageSize}`;
      }
      console.log(searchAllURL)
      fetchAllData(searchAllURL);
    
    }
  })
  .catch(error => {
    console.log(error);
  })
}

// fetching all the data listed under our search and pushing them all into our custom array
function fetchAllData(url) {
  console.log("running fetch all data")
  window
  .fetch(url)
  .then(res => res.json())
  .then(data => {
    console.log(data)

    data.response.rows.forEach(function(n) {
      addObject(n);
    });
    
    jsonString = JSON.stringify(myArray, null, 2);
    console.log("myarray" , myArray);
  })
  .catch(error => {
    console.log(error)
  })
}

// create your own array with just the data you need
function addObject(objectData) {  
  
//undefined check for coutnry 
let itemCountry = objectData.content.indexedStructured.geoLocation ? objectData.content.indexedStructured.geoLocation[0].L2.content : "not specified";
let itemName = objectData.title || "Not Specified";
let taxClass = objectData.content.indexedStructured.tax_class ? objectData.content.indexedStructured.tax_class[0] : "Not Specified";
let taxFamily = objectData.content.indexedStructured.tax_family ? objectData.content.indexedStructured.tax_family[0] : "Not Specified";
let taxKingdom = objectData.content.indexedStructured.tax_kingdom ? objectData.content.indexedStructured.tax_kingdom[0] : "Not Specified";
let topic = objectData.content.indexedStructured.topic ? objectData.content.indexedStructured.topic[0] : "Not Specified";
  
myArray.push({
    A_id: objectData.id,
    name: itemName,
    class: taxClass,
    family: taxFamily,
    tax_kingdom: taxKingdom,
    Topic: topic,
    Country: itemCountry,
  })
}

fetchSearchData(search);

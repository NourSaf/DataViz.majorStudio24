import {apiKey} from './ApiKey.js';

const searchBaseURL = "https://api.si.edu/openaccess/api/v1.0/search";

/* to check results  ––––––––>  https://collections.si.edu/search/  */
const search =  `data_source:"Smithsonian Libraries" AND object_type:"Books" AND topic:"Politics"`;

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
// let itemName = objectData.content.freetext.title[0].content || "Not Specified";
let itemName = objectData.content.descriptiveNonRepeating.title_sort || "not provided";
console.log(itemName)

let objectType = objectData.content.freetext.objectType[0].content;
let bookAuthor = (objectData.content.freetext.name && objectData.content.freetext.name.length > 0) ? objectData.content.freetext.name[0].content : "no name";
let year = objectData.content.freetext.date[0].content || "Not Provided"
let book_describtion = (objectData.content.freetext.physicalDescription && objectData.content.freetext.physicalDescription.length > 0 )? objectData.content.freetext.physicalDescription[0].content : "Not Provided";
let language = objectData.content.indexedStructured.language && objectData.content.indexedStructured.language.length > 0 ? objectData.content.indexedStructured.language[0] : "Not Specified";


let topics = [];
if (objectData.content.freetext.topic && objectData.content.freetext.topic.length > 0) {
  objectData.content.freetext.topic.forEach(function(topic) {
    topics.push(topic.content);
  });
} else {
  topics.push("Not Specified");
}

myArray.push({
  A_id: objectData.id,
  name: itemName,
  objectType: objectType,
  authorName: bookAuthor,
  bookYear: year,
  book_physical_details: book_describtion,
  language: language,
  topic: topics
});
}

fetchSearchData(search);


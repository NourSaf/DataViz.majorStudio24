// Smithsonian API example code
// check API documentation for search here: http://edan.si.edu/openaccess/apidocs/#api-search-search
// Using this data set https://collections.si.edu/search/results.htm?q=Flowers&view=grid&fq=data_source%3A%22Cooper+Hewitt%2C+Smithsonian+Design+Museum%22&fq=online_media_type%3A%22Images%22&media.CC0=true&fq=object_type:%22Embroidery+%28visual+works%29%22

// Put your API key here;
import {apiKey} from './ApiKey.js';
// Search base URL
const searchBaseURL = "https://api.si.edu/openaccess/api/v1.0/search";

// Constructing the initial search query
const search =  'unit_code:"NMNHMINSCI" AND topic=Meteorite AND place=Antarctica';
// Array that we will write into
let myArray = [];

// String that will hold the stringified JSON data
let jsonString = '';

// Search: fetches an array of terms based on term category
function fetchSearchData(searchTerm) {
    // Encode the search term to ensure it's URL-safe
    const encodedSearchTerm = encodeURIComponent(searchTerm);
    let url = `${searchBaseURL}?api_key=${apiKey}&q=${encodedSearchTerm}`;
    console.log("Initial Search URL:", url);
    
    fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log("Initial Search Data:", data);
        
        // Check if the response and rowCount exist
        if (!data.response || typeof data.response.rowCount !== 'number') {
            throw new Error("Invalid response structure");
        }

        // Constructing search queries to get all the rows of data
        const pageSize = 1000;
        const numberOfQueries = Math.ceil(data.response.rowCount / pageSize);
        console.log(`Total Rows: ${data.response.rowCount}, Number of Queries: ${numberOfQueries}`);
        
        for(let i = 0; i < numberOfQueries; i++) {
            // Calculate the number of rows for the current query
            const rows = (i === numberOfQueries - 1) 
                ? data.response.rowCount - (i * pageSize) 
                : pageSize;
            
            // Declare searchAllURL with 'let' to ensure it's scoped correctly
            let searchAllURL = `${searchBaseURL}?api_key=${apiKey}&q=${encodedSearchTerm}&start=${i * pageSize}&rows=${rows}`;
            console.log(`Search URL ${i + 1}:`, searchAllURL);
            
            fetchAllData(searchAllURL);
        }
    })
    .catch(error => {
        console.error("Error in fetchSearchData:", error);
    });
}

// Fetching all the data listed under our search and pushing them all into our custom array
function fetchAllData(url) {
    fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log("Fetched Data:", data);

        // Check if rows exist in the response
        if (!data.response || !Array.isArray(data.response.rows)) {
            throw new Error("Invalid data structure in fetchAllData");
        }

        data.response.rows.forEach(function(n) {
            addObject(n);
        });
        // Update jsonString after each fetch
        jsonString += JSON.stringify(myArray, null, 2); // Pretty-print with 2 spaces
        console.log("Current Array:", myArray);
    })
    .catch(error => {
        console.error("Error in fetchAllData:", error);
    });
}

// Create your own array with just the data you need
function addObject(objectData) {  
    // We've encountered that some places have data others don't
    let currentPlace = "";
    if(objectData.content && objectData.content.indexedStructured && Array.isArray(objectData.content.indexedStructured.place)) {
        currentPlace = objectData.content.indexedStructured.place[0];
    }

    myArray.push({
        id: objectData.id,
        title: objectData.title,
        link: objectData.content.descriptiveNonRepeating.record_link,
        place: currentPlace
    });
}

// Start the data fetching process
fetchSearchData(search);

// ---------------------------UNIT CODES------------------------------
// ACAH: Archives Center, National Museum of American History
// ACM: Anacostia Community Museum
// CFCHFOLKLIFE: Smithsonian Center for Folklife and Cultural Heritage
// CHNDM: Cooper-Hewitt, National Design Museum
// FBR: Smithsonian Field Book Project
// FSA: Freer Gallery of Art and Arthur M. Sackler Gallery Archives
// FSG: Freer Gallery of Art and Arthur M. Sackler Gallery
// HAC: Smithsonian Gardens
// HMSG: Hirshhorn Museum and Sculpture Garden
// HSFA: Human Studies Film Archives
// NAA: National Anthropological Archives
// NASM: National Air and Space Museum
// NMAAHC: National Museum of African American History and Culture
// NMAfA: Smithsonian National Museum of African Art
// NMAH: Smithsonian National Museum of American History
// NMAI: National Museum of the American Indian
// NMNHANTHRO: NMNH - Anthropology Dept.
// NMNHBIRDS: NMNH - Vertebrate Zoology - Birds Division
// NMNHBOTANY: NMNH - Botany Dept.
// NMNHEDUCATION: NMNH - Education & Outreach
// NMNHENTO: NMNH - Entomology Dept.
// NMNHFISHES: NMNH - Vertebrate Zoology - Fishes Division
// NMNHHERPS: NMNH - Vertebrate Zoology - Herpetology Division
// NMNHINV: NMNH - Invertebrate Zoology Dept.
// NMNHMAMMALS: NMNH - Vertebrate Zoology - Mammals Division
// NMNHMINSCI: NMNH - Mineral Sciences Dept.
// NMNHPALEO: NMNH - Paleobiology Dept.
// NPG: National Portrait Gallery
// NPM: National Postal Museum
// SAAM: Smithsonian American Art Museum
// SI: Smithsonian Institution, Digitization Program Office
// SIA: Smithsonian Institution Archives
// SIL: Smithsonian Libraries

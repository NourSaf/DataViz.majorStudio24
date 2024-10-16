let mydataLink = "/dataTarget.json";

//fetch data through a async function that takes a link parameter 
// async function fetchMyData (link){
//   //try block and catch error 
//   try {
//     //get response request 
//     const response = await fetch(link);
//     console.log('This is your Response', response);
//     if (!response.ok){
//       throw new Error (`Network is nor OK ${response.status}`);
//     }
//     const data = await response.json(link);
//     console.log("This is your fetched data",data)
//   }catch (error){
//     console.log('Error Fetching data', error);
//     throw error;
//   }
// }

// fetchMyData(mydataLink);

//if the data takes time to load, I want to display loading
// function waitLoading(){
//   const app = d3
//     .select('#app')
//     .attr('class', 'loading')
//     .text('LOADING')
// }

// function hideLoading (){
//   d3.select('.loading').remove();
// }
// waitLoading();

//fetch data 
//data and a function to fetch the data 

//get my data link 
const myData = "dataTarget.json"

//write async function 
async function fetchMyData (link) {
  //start a try bock, which is try and catch to get my data, if not -> error -> catch this error 
  try {
    //request response 
    const response = await fetch(link);
    console.log("This is your response",response)
    if (!response.ok){
      throw new Error (`Network response was not OK ${response.status}`)
    }
    //now I want to get my data from the response
    const data = await response.json(link);
    console.log('This is your data', data);
  }catch (error){
    console.log("Fetch is not sucssecful",error);
    throw error; 
  }
}

fetchMyData(myData);

function waitLoading (){
  const app = d3
    .select('#app')
    .attr('class','loading')
    .text('Loading...');
}

function finishLoading(){
  d3.select('.loading').remove();
}

waitLoading(); 

setTimeout(finishLoading, 2000);


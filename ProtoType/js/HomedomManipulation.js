// Create the main container div
//homepage

const textDiv = document.getElementById('textDiv');

const container = document.createElement('div');
container.style.display = 'flex';
container.style.flexDirection = 'column';
container.style.alignItems = 'left';
container.style.padding = '2em';
container.style.width = '27vw';
container.style.position = 'absolute';



// Create the title div
const titleDiv = document.createElement('div');
const title = document.createElement('h1');
title.innerText = 'Taxonomy Visualization';
title.classList = "titleDiv";
titleDiv.appendChild(title);

// Create the subtitle div
const subtitleDiv = document.createElement('div');
const link = document.createElement('a');
link.href = 'https://github.com/Smithsonian/OpenAccess';
link.target = '_blank'; // Open link in a new tab
link.innerText = `Smithsonian Open Access Metadata NMNH - Entomology Dept.`;
link.style.color = 'white';
link.style.backgroundColor = 'black';
link.style.opacity = '0.9';
link.style.padding = '0.8em';
link.style.textDecoration = 'none';
link.style.fontFamily = 'monospace';
link.style.fontSize = '0.8em';
link.style.textAlign = 'left';
subtitleDiv.appendChild(link);

const paragraph = document.createElement('p');
paragraph.innerHTML = 'This visualization uses data from the Smithsonian Open Access <br> Metadata API to display the taxonomy of the insects in the collection.';
paragraph.style.fontFamily = 'monospace';
paragraph.style.color = 'white';
paragraph.style.backgroundColor = 'black';
paragraph.style.opacity = '0.9';
paragraph.style.padding = "0.8em";
paragraph.style.textAlign = 'left';
paragraph.style.fontSize = '0.8em';
subtitleDiv.appendChild(paragraph);


// Append the title and subtitle divs to the main container


// create a hint for useres to drag and move 
// const hintBox = document.createElement('div');
// const hintButton = document.createElement('button');
// hintButton.innerText = 'Click and Drag the visualizations';
// hintButton.style.position = 'absolute';
// hintButton.style.bottom = '-80vh';
// hintButton.style.left = '5%';
// hintButton.style.padding = '0.5em 1em';
// hintButton.style.fontFamily = 'monospace';
// hintButton.style.fontSize = '1em';
// hintButton.style.color = 'white';
// hintButton.style.outline = '0.2px dashed white';
// hintButton.style.backgroundColor = 'black';
// hintButton.style.border = 'none';


container.appendChild(titleDiv);
container.appendChild(subtitleDiv);
textDiv.appendChild(container);
// container.appendChild(hintBox);
// hintBox.appendChild(hintButton);

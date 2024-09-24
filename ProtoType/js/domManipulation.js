// Create the main container div

const textDiv = document.getElementById('textDiv');
const container = document.createElement('div');
container.style.display = 'flex';
container.style.flexDirection = 'column';
container.style.alignItems = 'left';
container.style.padding = '3em';
container.style.width = '15vw';
container.style.position = 'absolute';



// Create the title div
const titleDiv = document.createElement('div');
const title = document.createElement('h1');
title.innerText = 'Taxonomy Visualization';
title.style.fontFamily = 'monospace';
title.style.fontWeight = 'bold';
title.style.color = 'white';
title.style.textAlign = 'left';
title.style.fontSize = '3em';
titleDiv.appendChild(title);

// Create the subtitle div
const subtitleDiv = document.createElement('div');
const link = document.createElement('a');
link.href = 'https://github.com/Smithsonian/OpenAccess';
link.target = '_blank'; // Open link in a new tab
link.innerHTML = `Smithsonian Open Access Metadata <br> NMNH - Entomology Dept.`;
link.style.color = 'white';
link.style.textDecoration = 'none';
link.style.fontFamily = 'monospace';
link.style.fontSize = '1em';
link.style.textAlign = 'left';
subtitleDiv.appendChild(link);

const paragraph = document.createElement('p');
paragraph.innerText = 'This visualization uses data from the Smithsonian Open Access Metadata API to display the taxonomy of the insects in the collection.';
paragraph.style.fontFamily = 'monospace';
paragraph.style.color = 'white';
paragraph.style.textAlign = 'left';
paragraph.style.fontSize = '1em';
subtitleDiv.appendChild(paragraph);


// Append the title and subtitle divs to the main container
container.appendChild(titleDiv);
container.appendChild(subtitleDiv);
textDiv.appendChild(container);

// Responsive styling
const style = document.createElement('style');
style.innerHTML = `
  @media (max-width: 600px) {
    h1 {
      font-size: 1.5em;
    }
    h2 {
      font-size: 1em;
    }
  }
  @media (min-width: 601px) {
    h1 {
      font-size: 2.5em;
    }
    h2 {
      font-size: 1.5em;
    }
  }
`;
document.head.appendChild(style);

/*
RiTa.js reference:
https://rednoise.org/rita/reference/index.php
*/

let myJson = "/dataTarget.json";
let historical_context = [
  "medieval", "renaissance", "colonial", "industrial revolution", "enlightenment", "modern", "early american", 
  "ancient", "victorian", "georgian", "middle ages", "classical", "age of reason", "imperial age", "byzantine", 
  "dark ages", "feudal", "early modern", "pre-colonial","civil war", "revolution", "independence", "world war", "exploration", "discovery", "treaty", "invasion", 
  "conquest", "crusades", "expansion", "plague", "rebellion", "uprising", "renaissance", "colonization", "industrialization", 
  "migration", "diaspora", "abolition", "enfranchisement","capitalism", "trade", "commerce", "markets", "wealth", "industry", "labor", "business", "free market", 
  "enterprise", "merchant", "economy", "globalization", "corporation", "investment", "monopoly", "competition", 
  "currency", "stocks", "venture", "profit", "supply", "demand", "market forces", "inflation", "commodities"
]

let politics = [
  "monarchy", "republic", "democracy", "socialism", "communism", "dictatorship", "fascism", "anarchy", "oligarchy", 
  "parliament", "totalitarianism", "federalism", "theocracy", "autocracy", "liberalism", "conservatism", "feudalism", 
  "authoritarianism", "tyranny", "plutocracy", "liberty", "freedom", "justice", "equality", "rebellion", "revolt", "resistance", "reform", "change", "rights", 
  "revolution", "independence", "self-determination", "emancipation", "insurrection", "defiance", "overthrow", "abolition", 
  "protest", "civil disobedience", "struggle","leader", "ruler", "dictator", "emperor", "king", "laws", "policy", "imperial", "authority", "tyranny", 
  "command", "sovereignty", "government", "control", "dominion", "oppression", "governance", "rule", "regime", 
  "bureaucracy", "empowerment", "subjugation", "leader", "ruler", "dictator", "emperor", "king", "laws", "policy", "imperial", "authority", "tyranny", 
  "command", "sovereignty", "government", "control", "dominion", "oppression", "governance", "rule", "regime", 
  "bureaucracy", "empowerment", "subjugation"
]

let social_and_cultural_ideologies = [
  "peasants", "aristocracy", "working class", "bourgeoisie", "lords", "proletariat", "servants", "elite", "slaves", 
  "serfdom", "capitalist", "landowner", "tenant", "guild", "nobility", "gentry", "baron", "duke", "vassal", 
  "feudal lord", "estate", "indentured servant", "bourgeois", "plebeian", "african", "asian", "european", "native american", "hispanic", "racism", "civilization", "savage", "barbarism", 
  "ethnic", "tribal", "multicultural", "segregation", "race", "colonial", "indigenous", "cultural superiority", 
  "racial purity", "ethnicity", "diaspora", "creole", "mestizo", "racialized", "inferiority", "nationalism", "exclusion", "christianity", "islam", "judaism", "buddhism", "hinduism", "paganism", "atheism", "deism", "god", "church", 
  "priest", "monk", "prophet", "holy", "sacred", "temple", "missionary", "ritual", "ceremony", "pilgrimage", 
  "faith", "belief", "heresy", "doctrine", "orthodoxy", "salvation", "hell", "devotion", "martyrdom"
]

let gender = [
  "women", "men", "masculinity", "femininity", "patriarchy", "motherhood", "fatherhood", "equality", "feminism", 
  "matriarchy", "gender roles", "gender identity", "suffrage", "oppression", "womanhood", "manhood", "toxic masculinity", 
  "misogyny", "male dominance", "subordination", "sexuality", "gender norms", "gender binary"
]


async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Network response was not ok (status ${response.status})`);
    }
    const data = await response.json(myJson);   
    return data.slice(0, 1002);
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; 
  }
}

function showLoading() {
  const app = d3.select('#appContainer');
  app.append('div')
    .attr('class', 'loading')
    .text('...LOADING...');
}

function hideLoading() {
  d3.select('.loading').remove();
}

showLoading();

const dataPromise = fetchData(myJson)
    .then(data => {
    hideLoading();
    console.log("this is My data", data);
    // Loop through data and return only the name property
    const names = data.map(item => item.name);
    const type = data.map(item => item.objectType);
    console.log("Names:",  names);
    console.log("type:",  type);

    // Create a new div and display the names
    const app = d3.select('#appContainer');
    const mainContainer = app.append('div').attr('class', 'main-container');

  
    // Use DocumentFragment to minimize reflows and repaints
    const fragment = document.createDocumentFragment();
    let subContainer = document.createElement('div');
    subContainer.className = 'sub-container';
    
    const tokenizedNames = names.map(name => name.split(' '));
    console.log(tokenizedNames)

    names.forEach((name, index) => {
      const div = document.createElement('div');
      let lowerCaseName = name.toLowerCase();
      let tokens = lowerCaseName.split(' '); // Define tokens
      console.log('this is my tokens', tokens);
      let lowerCaseType = type[index].toLowerCase();
      div.textContent = `${lowerCaseName} (${lowerCaseType})`;
      div.style.fontSize = '0.9em';
      subContainer.appendChild(div);

      // Every 10 divs, create a new sub-container
      if ((index + 1) % 1 === 0) {
      fragment.appendChild(subContainer);
      subContainer = document.createElement('div');
      subContainer.className = 'sub-container';
      }

      tokens.forEach(token => {
        const span = document.createElement('span');
        if (historical_context.some(w => token.toLowerCase() === w.toLowerCase())) {
          span.textContent = token;
          span.style.background = 'red';
          span.classList.add('historical');
        } else if (politics.some(w => token.toLowerCase() === w.toLowerCase())) {
          span.textContent = token;
          span.style.background = 'blue';
          span.classList.add('political');
        } else if (social_and_cultural_ideologies.some(w => token.toLowerCase() === w.toLowerCase())) {
          span.textContent = token;
          span.style.background = 'green';
          span.classList.add('social');
        } else if (gender.some(w => token.toLowerCase() === w.toLowerCase())) {
          span.textContent = token;
          span.style.background = 'yellow';
          span.classList.add('gender');
        } else {
          span.textContent = token;
        }
        div.appendChild(span);
        div.appendChild(document.createTextNode(' ')); // Add space between words
      });;
    }); 

    function createButton(category, color, className) {
      const button = document.createElement('button');
      button.textContent = `${category}`;
      button.style.backgroundColor = color;
      button.style.border = 'none'; // Remove the border
      button.style.padding = '0.5em'; // Remove the border
      button.addEventListener('click', () => {
        const spans = document.querySelectorAll(`.${className}`);
        spans.forEach(span => {
          if (span.style.backgroundColor === color) {
            span.style.backgroundColor = '';
          } else {
            span.style.backgroundColor = color;
          }
        });
        const rect = document.querySelector(`.rect.${className}`);
        if (rect) rect.classList.toggle('highlight');
      });
      return button;
    }

    const buttonContainerElement = document.getElementById('butnContainer');
    if (buttonContainerElement) {
      const buttonContainer = d3.select(buttonContainerElement).append('div').attr('class', 'button-container');
      buttonContainer.node().appendChild(createButton('Politics', 'blue', 'political'));
      buttonContainer.node().appendChild(createButton('Gender', 'yellow', 'gender'));
      buttonContainer.node().appendChild(createButton('Social', 'green', 'social'));
      buttonContainer.node().appendChild(createButton('Historical', 'red', 'historical'));
    } else {
      console.error('Element with ID "butnContainer" not found.');
    }

  let historicalCount = 0;
  let politicalCount = 0;
  let socialCount = 0;
  let genderCount = 0;

function countWords(data) {
  data.forEach(item => {
    const tokens = item.name.toLowerCase().split(' ');
    tokens.forEach(token => {
      if (historical_context.some(w => token.toLowerCase() === w.toLowerCase())) {
        historicalCount++;
      }
      if (social_and_cultural_ideologies.some(w => token.toLowerCase() === w.toLowerCase())) {
        socialCount++;
      }
      if (politics.some(w => token.toLowerCase() === w.toLowerCase())) {
        politicalCount++;
      }
      if (gender.some(w => token.toLowerCase() === w.toLowerCase())) {
        genderCount++;
      }
    });
  });

  // Display the counts
  const app = d3.select('#appContainer');
  const chartContainer = d3.select('#chartContainer').attr('class', 'count-display');;
  

  // Create a rect for historical count
  chartContainer.append('div')
    .attr('class', 'rect-container')
    .append('div')
    .attr('class', 'rect historical')
    .style('width', `${historicalCount * 10}px`)
    .style('background-color', 'red')
    .text(`Historical Count: ${historicalCount}`);

  // Create a rect for political count
  chartContainer.append('div')
    .attr('class', 'rect-container')
    .append('div')
    .attr('class', 'rect political')
    .style('width', `${politicalCount * 10}px`)
    .style('background-color', 'blue')
    .text(`Political Count: ${politicalCount}`);
    
    chartContainer.append('div')
    .attr('class', 'rect-container')
    .append('div')
    .attr('class', 'rect social')
    .style('width', `${socialCount * 10}px`)
    .style('background-color', 'green')
    .text(`Social Count: ${socialCount}`);
  
    chartContainer.append('div')
    .attr('class', 'rect-container')
    .append('div')
    .attr('class', 'rect gender')
    .style('width', `${genderCount * 10}px`)
    .style('background-color', 'yellow')
    .text(`Gender Count: ${genderCount}`);
}

  countWords(data);

    // Append the last sub-container if it has any children
    if (subContainer.children.length > 0) {
      fragment.appendChild(subContainer);
    }
    mainContainer.append(() => fragment);
  
    // You can call processRita here if you want to process the fetched data
    // processRita(data.someTextProperty);
  })
  .catch(error => {
    hideLoading();
    console.error('Error:', error);
  });
  
  // Function to create a toggle button


  // Call the function to create the toggle button
  

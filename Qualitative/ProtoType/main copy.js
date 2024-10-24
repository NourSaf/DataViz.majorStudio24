
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
  "bureaucracy", "empowerment", "subjugation",
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
  "misogyny", "male dominance", "subordination", "sexuality", "gender norms", "gender binary", "non-binary", "gender fluid", 
  "transgender", "cisgender", "genderqueer", "intersex", "two-spirit", "gender expression", "gender dysphoria", 
  "sexual orientation", "queer", "gender non-conforming", "gender parity", "agender", "demiboy", "demigirl", "androgyne", 
  "third gender", "gender transition", "transfeminine", "transmasculine", "gender abolition", "gender spectrum", "intersectionality", 
  "gender variance", "misandry", "gender affirmation", "gender euphoria", "gender fluidity", "pangender", "bigender", 
  "gender performance", "hegemonic masculinity", "intersectional feminism", "sexual dimorphism", "gender-affirming care", 
  "neutrois", "sissy", "butch", "femme", "androcentrism", "sexism"
];
console.log("those are gender terms:", gender)

async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Network response was not ok (status ${response.status})`);
    }
    const data = await response.json(myJson);   
    return data.slice(0, 102);
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; 
  }
}

function showLoading() {
  const app = d3.select('.main');
  app.append('div')
    .attr('class', 'loading')
    .text('...LOADING...');
}

function hideLoading() {
  d3.select('.loading').remove();
}

showLoading();

const historyColor = "rgb(80, 255, 168)";
const politicColor = "rgb(111, 154, 255)";
const genderColor = "rgb(187, 255, 97)";
const socialColor = "rgb(247, 192, 96)";
const invisitageColor = "rgb(255, 255, 255)";

const dataPromise = fetchData(myJson)
  .then(data => {
  hideLoading();
  console.log("this is My data", data);

  // Fragment use. to reduce reflows and improve performance
  const fragment = document.createDocumentFragment();
  
  // select the main div
  const app = d3.select('.main-viz');
  let btnContainer = app.append('div').attr('class','btns')
  let btns = document.createElement('div')
  btns.id = 'allBtnContainer'
  btns.className = "allBtns"
  // btns.style.display = "flex"
  btnContainer.node().appendChild(btns);

  const mainContainer = app.append('div').attr('class', 'main-viz-container');
  let subContainer = document.createElement('div');
  subContainer.className = 'sub-container x1';
  
  // Loop through data and return only the name property
  const names = data.map(item => item.name);
  const type = data.map(item => item.objectType);
  console.log("Names:",  names);
  console.log("type:",  type);

  const tokenizedNames = names.map(name => name.split(' '));
  console.log("This is Tokenized Names",tokenizedNames)

    // Add click event listener to sub-div-text elements
    const containerPopup = document.querySelector('.main-viz-container');
    containerPopup.addEventListener('click', (event) => {
      if (/x/.test(event.target.className)) {
        const popUpdiv = document.createElement('div');
        popUpdiv.classList = "popUpDiv";
        popUpdiv.textContent = event.target.textContent; // Assign the clicked div content
        containerPopup.appendChild(popUpdiv);
        console.log("hi you clicked me");
      }
    });

    
  
  names.forEach((name, index) => {
    const div = document.createElement('div');
    div.className = 'sub-div-text x1';
    div.id = 'sub-div-text'
    div.style.fontSize = '0.6em';
    div.style.padding = "0.5em"

    let lowerCaseName = name.toLowerCase();
    let tokens = lowerCaseName.split(' ');
    console.log('this is my tokens', tokens);

    subContainer.appendChild(div);
    
    if ((index+1) % 1 === 0) {
      fragment.appendChild(subContainer);
      subContainer = document.createElement('div');
      subContainer.className = 'sub-container x1';
      //console.log("----->>> INDEX",index)
    }
    
  

    tokens.forEach(token => { 
      const span = document.createElement('span');
      if (historical_context.some(w => token.toLowerCase() === w.toLowerCase())) {
        span.textContent = token;
        span.style.background = `${historyColor}`;
        span.classList.add('historical');
      } else if (politics.some(w => token.toLowerCase() === w.toLowerCase())) {
        span.textContent = token;
        span.style.background = `${politicColor}`;
        span.classList.add('political');
      } else if (social_and_cultural_ideologies.some(w => token.toLowerCase() === w.toLowerCase())) {
        span.textContent = token;
        span.style.background = `${socialColor}`;
        span.classList.add('social');
      } else if (gender.some(w => token.toLowerCase() === w.toLowerCase())) {
        span.textContent = token;
        span.style.background = `${genderColor}`;
        span.classList.add('gender');
      } else {
        span.textContent = token;
        span.classList.add('notHighlight-x1');
      }
      div.appendChild(span);
      div.appendChild(document.createTextNode(' ')); // Add space between words
    });;
  }); 
  
    function createButton(category, color, className) {
        const button = document.createElement('button');
        button.textContent = `${category}`;
        button.style.backgroundColor = color;
        button.style.padding = '0.5em 2.5em 0.5em 2.5em';
        button.style.borderRadius = '1em'
        button.style.border = `0.1em solid ${color}`

        button.onmouseover = () => {
          button.style.backgroundColor = 'black';
          button.style.color = 'white';
          button.style.border = `0.1em solid ${color}`
          button.style.cursor = 'pointer';;
        };
        button.onmouseout = () => {
          button.style.backgroundColor = color;
          button.style.color = 'black';
          button.style.border = `0.1em solid ${color}`
        };
      
        button.addEventListener('click', () => {
          const spans = document.querySelectorAll(`.${className}`);
          spans.forEach(span => {
            if (span.style.backgroundColor === color) {
              span.style.backgroundColor = '';
            } else {
              span.style.backgroundColor = color;
            }
          });
          const rect = document.querySelector(`${className}`);
          if (rect) rect.classList.toggle('highlight');
        });
        return button;
      }

    function createIvisitageBtn(btnTitle, color, className) {
        const button = document.createElement('button');
        button.textContent = `${btnTitle}`;
        button.style.backgroundColor = color;
        button.style.padding = '0.5em 2.5em 0.5em 2.5em';
        button.style.borderRadius = '1em'
        button.style.border = `0.1em solid ${color}`

        button.onmouseover = () => {
          button.style.backgroundColor = 'black';
          button.style.color = 'white';
          button.style.border = `0.1em solid ${color}`
          button.style.cursor = 'pointer';;
        };
        button.onmouseout = () => {
          button.style.backgroundColor = color;
          button.style.color = 'black';
          button.style.border = `0.1em solid ${color}`
        };
      
        button.addEventListener('click', () => {
          const spans = document.querySelectorAll(`.${className}`);
          spans.forEach(span => {
            if (span.style.color === "black") {
              span.style.color = "white";
            } else {
              span.style.color = "black";
            }
          });
        });
        return button;
      }

      if (btns) {
        const buttonContainer = d3.select(btns).append('div').attr('class', 'button-container');
        const subButtonContainer = d3.select(btns).append('div').attr('class', 'subButton-container');
        subButtonContainer.node().appendChild(createIvisitageBtn('Invisitage', `${invisitageColor}`, 'notHighlight-x1'));
        buttonContainer.node().appendChild(createButton('Politics', `${politicColor}`, 'political'));
        buttonContainer.node().appendChild(createButton('Gender', `${genderColor}`, 'gender'));
        buttonContainer.node().appendChild(createButton('Social', `${socialColor}`, 'social'));
        buttonContainer.node().appendChild(createButton('Historical', `${historyColor}`, 'historical'));
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
  
    //secondary visualization div structure
    const secVizContainer = app.append('div').attr('class','sec-viz-container')
    const chartContainer = secVizContainer.append('div').attr('id','chartContainer').attr('class','chartContainer')
    secVizContainer.node().appendChild(chartContainer.node());

    // Bar for each group
    const totalCount = historicalCount + politicalCount + socialCount + genderCount;
    const historicalWidth = (historicalCount / totalCount) * 100;
    const politicalWidth = (politicalCount / totalCount) * 100;
    const socialWidth = (socialCount / totalCount) * 100;
    const genderWidth = (genderCount / totalCount) * 100;

    const barPadding = "0.5em"
    
    const stackedBar = chartContainer.append('div')
      .attr('class', 'stacked-bar')
      .style('display', 'flex')
      .style('width', '100%');

    stackedBar.append('div')
      .attr('class', 'rect-historical')
      .style('width', `${historicalWidth}%`)
      .style('background-color', `${historyColor}`)
      .style('padding', `${barPadding}`)
    
    stackedBar.append('div')
      .attr('class', 'rect-political')
      .style('width', `${politicalWidth}%`)
      .style('background-color',  `${politicColor}`)
      .style('padding', `${barPadding}`);

    stackedBar.append('div')
      .attr('class', 'rect-social')
      .style('width', `${socialWidth}%`)
      .style('background-color', `${socialColor}`)
      .style('padding', `${barPadding}`);

    stackedBar.append('div')
      .attr('class', 'rect-gender')
      .style('width', `${genderWidth}%`)
      .style('background-color', `${genderColor}`)
      .style('padding', `${barPadding}`);

    const textStackedBar = chartContainer.append('div')
      .attr('class', 'stacked-bar')
      .style('display', 'flex')
      .style('width', '100%');

    textStackedBar.append('div')
      .attr('class', 'rect-historical')
      .style('width', `${historicalWidth}%`)
      .style('padding', `${barPadding}`)
      .text(`Historical words: ${historicalCount}`);

    
    textStackedBar.append('div')
      .attr('class', 'rect-political')
      .style('width', `${politicalWidth}%`)
      .style('padding', `${barPadding}`)
      .text(`Potitical words: ${politicalCount}`);



    textStackedBar.append('div')
      .attr('class', 'rect-social')
      .style('width', `${socialWidth}%`)
      .style('padding', `${barPadding}`)
      .text(`Soical words: ${socialCount}`);
      


    textStackedBar.append('div')
      .attr('class', 'rect-gender')
      .style('width', `${genderWidth}%`)
      .style('padding', `${barPadding}`)
      .text(`Gender words: ${genderCount}`);

  }
  countWords(data);

  // Append the last sub-container if it has any children
  if (subContainer.children.length > 0) {
    fragment.appendChild(subContainer);
  }
  mainContainer.append(() => fragment);

}).catch(error => {
  hideLoading();
  console.error('Error:', error);
});


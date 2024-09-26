d3.json('../data/data.json').then(data => {
  // Group by family and country
  const familyData = d3.groups(data, d => d.family)
      .map(([family, items]) => ({
          name: family, 
          children: d3.groups(items, d => d.Country)
              .map(([country, insects]) => ({
                  name: country,
                  children: insects.map(insect => ({
                      name: insect.name,
                      value: 1
                  }))
              }))
      }));

  const families = familyData.map(d => d.name);
  const color = d3.scaleOrdinal()
      .domain(families)
      .range(["#FF5733", "#FFBD33", "#DBFF33", "#75FF33", "#33FF57", "#33FFBD", "#33DBFF", "#3375FF", "#5733FF", "#BD33FF"]);

  const width = 250;
  const radius = width / 2;

  const partition = data => d3.partition()
      .size([2 * Math.PI, radius])
      (d3.hierarchy(data)
          .sum(d => d.value)
          .sort((a, b) => b.value - a.value));

  const arc = d3.arc()
      .startAngle(d => d.x0)
      .endAngle(d => d.x1)
      .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
      .padRadius(radius / 2)
      .innerRadius(d => d.y0)
      .outerRadius(d => d.y1 - 1);

  // Append each family chart to the flexbox container
  familyData.forEach(family => {
      const root = partition(family);

      // Create a div container for each family chart
      const container = d3.select("#chart-flex")
          .append("div")
          .attr("class", "chart-container");

      const svg = container.append("svg")
          .attr("viewBox", `-${radius} -${radius} ${width} ${width}`)
          .style("font", "12px  monospace");

      // Info text placeholder
      const infoText = container.append("div")
          .attr("class", "info-text")
          .text("");

      // Add arc paths
      svg.append("g")
          .attr("fill-opacity", 0.6)
          .selectAll("path")
          .data(root.descendants().filter(d => d.depth))
          .join("path")
          .attr("fill", d => { while (d.depth > 1) d = d.parent; return color(d.data.name); })
          .attr("d", arc)
          .on("click", (event, d) => {
              const hierarchyNames = d.ancestors().map(d => d.data.name).reverse().slice(1).join(" : ");
              infoText.text(`${hierarchyNames} : ${d.value} insects`);
          })
          .append("title")
          .text(d => `${d.ancestors().map(d => d.data.name).reverse().slice(1).join("/")}\n${d.value}`);

      // Add family title
      container.append("h3")
          .style("font-family", "monospace")
          .text(family.name);
  });
});

const container = document.createElement('div');
container.style.display = 'flex';
container.style.flexDirection = 'column';
container.style.alignItems = 'left';
container.style.padding = '2em';
container.style.width = '27vw';
container.style.position = 'relative';
document.querySelector('.titleCont').appendChild(container);

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
container.appendChild(titleDiv);

// Create the subtitle div
const subtitleDiv = document.createElement('div');
const link = document.createElement('a');
link.href = 'https://github.com/Smithsonian/OpenAccess';
link.target = '_blank'; // Open link in a new tab
link.innerText = `Smithsonian Open Access Metadata NMNH - Entomology Dept.`;
link.style.color = 'white';
// link.style.backgroundColor = 'black';
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
// paragraph.style.backgroundColor = 'black';
paragraph.style.opacity = '0.9';
paragraph.style.padding = "0.8em";
paragraph.style.textAlign = 'left';
paragraph.style.fontSize = '0.8em';
subtitleDiv.appendChild(paragraph);
container.appendChild(subtitleDiv);
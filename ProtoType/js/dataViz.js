// const { count } = require("d3");

let myData;
let taxFamily = [];

// load the data
d3.json("ProtoType/data/data.json").then(data => { 
  myData = data;
  analyzeData();
});

// analyze the data
//local-major-studio-01/data.json
function analyzeData(){
  let insectFamilyName;

  // go through the list of myData
  myData.forEach(n => {
    insectFamilyName = n.family;
    let match = false;

    // see if their location already exists the taxFamily array
    taxFamily.forEach(p => {
      if(p.name == insectFamilyName){
        p.number++;
        let number = p.number + 1;
        match = true;
      }
    });
    // if not create a new entry for that insectFamilyName name
      if(!match){
        taxFamily.push({
          name: insectFamilyName,
          number: 1,
        });
      }
  });
  console.log(taxFamily)

  function createNodes(taxFamily) {
    let nodes = [];
    
    taxFamily.forEach(item => {
      let node = {
        name: item.name,
        value: item.number
      };
      nodes.push(node);
    });
    
    return nodes;
  }

  am5.ready(function() {

    var root = am5.Root.new("chartdiv"); 
    
    root.setThemes([
      am5themes_Animated.new(root),
      am5themes_Dark.new(root)
    ]);
    
    var data = {
      name: "Smithosonian Insect Collection",
      value: `${myData.length}`,
      children: createNodes(taxFamily)
    };
    
    // Create wrapper container
    root.setThemes([
      am5themes_Animated.new(root)
    ]);
    
    var container = root.container.children.push(
      am5.Container.new(root, {
        width: am5.percent(100),
        height: am5.percent(100),
        layout: root.verticalLayout
      })
    );
    var series = container.children.push(
      am5hierarchy.ForceDirected.new(root, {
        downDepth: 1,
        initialDepth: 1,
        valueField: "value",
        categoryField: "name",
        childDataField: "children",
        minRadius: 26,
        maxRadius: am5.percent(16),
        manyBodyStrength: -3,
        centerStrength: 0.9,
        nodePadding: 20
      })
    );  
    series.get("colors").setAll({
      step: 2
    });
    
    series.links.template.set("strength", 0.01);
    
    series.data.setAll([data]);
    
    series.set("selectedDataItem", series.dataItems[0]);
    
    series.appear(1000, 10);
    });
}


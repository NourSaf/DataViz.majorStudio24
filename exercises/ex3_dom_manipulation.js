/*
  Exercise 3
  DOM manipulation with vanilla JS
*/

// Task
// What does DOM stand for?

/* ANSWER 
DOM stands for Document Object Model. 
The DOM represetns the document as a tree of braches conecting 
nodes, which contains objescts inside them. 
In our case Javascrip is the langauge we use to accsess 
the DOM and maipulate it's content and structure. 
*/

// Task
// Open the file index.html in your browser. Open the index.html file in VS Code, right-click the tab and select "Open in Browser"
// If you are working locally, navigate to the excercise directory and start a python http server `python3 -m http.server 900`, press Control-c to stop the server 
//DONE

// Task
// Delete the div with the class rectangle from index.html and refresh the preview.

// Task
// What does the following code do?

//ANSWERS

/*
This line declares a viz constatnt variable.
The value of this variable represtes the div with .viz class, 
which is done by using document:querySelector() method, which 
returns the first element in the DOM which matches the slected 
css attribute in this case class 
*/
const viz = document.body.querySelector(".viz");

/*
same as above but here we are selecting an element 
that has an ID represted as # from the DOM 
*/
const button = document.body.querySelector("#button");

/*
this line is loging to the consle the viz variable which is 
the element with viz class and it's childern. 
*/
console.log(viz, viz.children);


/*
This is a function that creates an element with DIV tag 
assign to it a class attribute with "rectangle" as a class name.
then style it's high by assigning a random high using Math.random() static method 
the high is between 1 and 100 px 
then it adds the new div ".rectangle" to the DOM using appendChild() method
 */
const addChildToViz = () => {
  const newChild = document.createElement("div");
  newChild.className = "rectangle";
  newChild.style.height = Math.random() * 100 + "px";
  viz.appendChild(newChild);
};

// Task
// Modify index.html to make this event listener work
button.addEventListener("click", addChildToViz);

// Task
// Where can you see the results of the console.log below? How is it different from in previous exercises?
function drawIrisData() {
  const dataViz = document.createElement('div');
  dataViz.className = "fetchedData"
  const myData   = window
      .fetch("./iris_json.json")
      .then(data => data.json())
      .then(data => { data.forEach(function (n, i) {
        var irisClass = data[i].class;
        
        if( irisClass === "Iris-setosa"){
          const irisClassHeader = document.createElement("div");
          irisClassHeader.className = "irisViz";
          irisClassHeader.innerHTML = irisClass;
          viz.appendChild(irisClassHeader)
        } 

      });

        console.log(data);
      }) ;

}

drawIrisData();

// Task
// Modify the code above to visualize the Iris dataset in the preview of index.html.
// Feel free to add additional CSS properties in index.html, or using JavaScript, as you see fit.

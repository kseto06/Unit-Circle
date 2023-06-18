//Initialize canvas / cartesian plane
const graph = document.getElementById("cartesian-plane");
var context = graph.getContext("2d");
var input = document.getElementById("inputAngle");

//Create the initial graph
initGraph();

//Ask user for the angle to be calculated:
var num = "";
input.addEventListener("input", function() {
    num = input.value;
    console.log(num);

    if (num.includes("pi")) {
        num = eval(num.replace("pi", String(Math.PI)));
    }

    //fix num exceptions: e.g. if there are things multiplying the "pi", have to add a multiplication
    
    let sin = document.getElementById("sinx");
    sin.textContent = "sin(x)= "+round(Math.sin(num)); 
    let cos = document.getElementById("cosx");
    cos.textContent = "cos(x)= "+round(Math.cos(num));
    let tan = document.getElementById("tanx");
    tan.textContent = "tan(x)= "+round(Math.tan(num));
    let csc = round(1/Math.sin(num));
    let sec = round(1/Math.cos(num));
    let cot = round(1/Math.tan(num));
    
    console.log(sin, " ", cos, " ",tan, " ", csc, " ", sec, " ", cot, " ");

    //Draw the point on the cartesian plane: (x, y) --> (cos, sin)
    //Get rid of the String values to print the point correctly
    cos = round(Math.cos(num));
    sin = round(Math.sin(num));
    plot(cos, sin);
});

//Functions:
function initGraph() {
    context.fillStyle = "white";
    context.fillRect(0, 0, graph.width, graph.height);

    context.strokeStyle = "black";

    //x-values: (horizontal axis)
    context.beginPath();
    context.moveTo(0, graph.height/2); //(0, 200), subpath
    context.lineTo(graph.width, graph.height/2); //line from 400 to 200
    context.stroke();

    //y-values: (vertical axis)
    context.beginPath();
    context.moveTo(graph.width/2, 0);
    context.lineTo(graph.width/2, graph.height);
    context.stroke();

    //Circle:
    context.beginPath();
    context.arc(200, 200, 200, 0, 2*Math.PI);
    context.stroke();

    //Add the points at (1,1), (-1, 1), etc...
    context.font = "15px Arial";
    context.fillStyle = "black";
    context.fillText("1", 380, 220);
    context.fillText("1", 205, 20);
    context.fillText("-1", 10, 190);
    context.fillText("-1", 205, 390);
}

//Round values to four decimal places
function round(value) {
    return +(Math.round(value + "e+4") + "e-4");
}

//Draw points on the cartesian plane:
//Since height/width is 400 x 400, everything on the unit circle must be multiplied by a factor of 400/2 = 200.
//Also need to translate to the right by 200, and translate down by 200
function plot(x, y) {
    //Scaling: Multiply by a factor of 200:
    x = x*200;
    y = y*200;
    //Translate to new origin, (200, -200)
    x = x+200;
    y = y-200;
    console.log(x,y);

    //Refresh the graph
    context.clearRect(0, 0, 400, 400);
    initGraph();

    //Draw the point
    context.beginPath();
    context.arc(Math.abs(x), Math.abs(y), 5, 0, 2*Math.PI);
    context.fillStyle = "black";
    context.fill();
    context.stroke();

    //Draw the line to the point
    context.beginPath();
    context.moveTo(200, 200); //Always begin at the origin 
    context.lineTo(Math.abs(x), Math.abs(y)); //Draw a line to the (x, y) value
    context.lineWidth = 3;
    context.stroke();
    context.lineWidth = 1;
    context.closePath();
}
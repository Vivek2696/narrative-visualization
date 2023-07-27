let slide = 1;

//parameter to control scene
let svgWidth = 1050;
let svgHeight = 1050;

let chartWidth = 900;
let chartHeight = 900;

var makes = [];
var highway_mpgs = [];
var city_mpgs = [];

function initialize() {
    generateSlide1();
    disablePreviousButton();
}

function onNextSlide(){
    slide++;
    switch (slide) {
        case 2:
            generateSlide2();
            enablePreviousButton();
            break;
        case 3:
            generateSlide3();
            break;
        case 4:
            generateSlide4();
            disableNextButton();
            break;
        default:  
            break;
    }
}

function onPreviousSlide(){
    slide--;
    switch (slide) {
        case 1:
            generateSlide1();
            disablePreviousButton();
            break;
        case 2:
            generateSlide2();
            break;
        case 3:
            generateSlide3();
            enableNextButton();
            break;
        default:
            break;
    }
}

async function generateSlide1(){
    //load data
    const data = await d3.csv("https://flunky.github.io/cars2017.csv");

    //Extract MPGs
    var makes_raw = [];
    var highway_mpgs_raw = [];
    var city_mpgs_raw = [];
    for (var key of Object.values(data)) {
        if (!makes_raw.includes(key.Make)) {
            makes_raw.push(key.Make)
            highway_mpgs_raw.push(key.AverageHighwayMPG)
            city_mpgs_raw.push(key.AverageCityMPG)
        }
    }
    makes = makes_raw.filter(function(x) { return x != undefined && x != null; });
    highway_mpgs = highway_mpgs_raw.filter(function(x) { return x != undefined && x != null; });
    city_mpgs = city_mpgs_raw.filter(function(x) { return x != undefined && x != null; });
    console.log(makes);
    console.log(highway_mpgs);
    console.log(city_mpgs);

    var cleaned_data = { Make:makes, AverageHighwayMPG:highway_mpgs, AverageCityMPG:city_mpgs };

    var chart1_tooltip = d3.select("body")
    .append("div")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "black")
    .style("color", "white")
    .style("border-radius", "5px")
    .style("padding", "15px");

    //get the scene container and remove it
    var sceneContainer = d3.select("#scene-container");
    if (sceneContainer) { sceneContainer.remove(); }

    var yAxisScale = d3.scaleBand()
                       .domain(data.map(function(d) { return d.Make; }))
                       .range([0,chartHeight]);

    var xAxisScale = d3.scaleLinear()
                       .domain([0,120])
                       .range([0,chartWidth]);

    //update the page number
    d3.select("#scene-title")
    .text("Page "+slide);

    d3.select("#scene-body")
      .append("div")
      .attr("id", "scene-container")

    d3.select("#scene-container")
    .append("svg")
    .attr("id","chart1")
    .attr("width", svgWidth.toString() + "px")
    .attr("height", svgHeight.toString() + "px");

    d3.select("#chart1")
      .append("g")
      .attr("transform", "translate(100,50)")
      .call(d3.axisLeft(yAxisScale).ticks(10));
    
    d3.select("#chart1")
      .append("g")
      .attr("transform", "translate(100,"+ Number(chartHeight + 50) +")")
      .call(d3.axisBottom(xAxisScale).ticks(10));

    d3.select("#chart1")
      .append("g")
      .attr("transform", "translate(100,50)")
      .selectAll("rect")
      .data(cleaned_data.Make)
      .enter()
      .append("rect")
      .attr("x", 0)
      .attr("y", function(d, i) { return yAxisScale(makes[i]); })
      .attr("width", function(d, i) { return xAxisScale(highway_mpgs[i]); })
      .attr("height", yAxisScale.bandwidth() - 10)
      .attr("fill", "#1e90ff")
      .on("mouseover", function(event, d) {
            console.log("Creating tooltip at: ("+event.pageX+","+event.pageY+") with :"+d);
            chart1_tooltip.style("opacity", 0.9);
            chart1_tooltip.html(d)
                          .style("left", (event.pageX) + "px")
                          .style("top", (event.pageY) + "px");
      })
      .on("mouseout", function(d, i) {
            chart1_tooltip.style("opacity", 0);
      });
}

function generateSlide2(){
    //clear scene
    var sceneContainer = d3.select("#scene-container");
    if (sceneContainer) { sceneContainer.remove(); } 

    //update the page number
    d3.select("#scene-title")
    .text("Page "+slide);

    d3.select("#scene-body")
    .append("div")
    .attr("id","scene-container")
    .append("p")
    .append("id", "scene2-paragraph")
    .append("text")
    .text("Template for slide 2.");
}

function generateSlide3(){
    //clear scene
    var sceneContainer = d3.select("#scene-container");
    if (sceneContainer) { sceneContainer.remove(); }
    
    //update the page number
    d3.select("#scene-title")
    .text("Page "+slide);

    d3.select("#scene-body")
    .append("div")
    .attr("id","scene-container")
    .append("p")
    .append("id", "scene3-paragraph")
    .append("text")
    .text("Template for slide 3.");
}

function generateSlide4(){
    //clear scene
    var sceneContainer = d3.select("#scene-container");
    if (sceneContainer) { sceneContainer.remove(); }
    
    //update the page number
    d3.select("#scene-title")
    .text("Page "+slide);

    d3.select("#scene-body")
    .append("div")
    .attr("id","scene-container")
    .append("p")
    .append("id", "scene4-paragraph")
    .append("text")
    .text("Template for slide 4.");
}

function disableNextButton(){
    document.getElementById("nav-next-btn").disabled = true;
}

function enableNextButton(){
    document.getElementById("nav-next-btn").disabled = false;
}

function disablePreviousButton(){
    document.getElementById("nav-prev-btn").disabled = true;
}

function enablePreviousButton(){
    document.getElementById("nav-prev-btn").disabled = false;
}
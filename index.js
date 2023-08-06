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
            enableNextButton();
            break;
        default:
            break;
    }
}

async function generateSlide1(){
    //load data
    const data = await d3.csv("https://flunky.github.io/cars2017.csv");

    //parameter selection
    var currentParameter = "highway";

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
      .attr("id", "scene-container");

    d3.select("#chart-question")
      .text("How well all car models performs in Fuel MPG?")

    d3.select("#chart-description")
      .text("Now a days all automoblie companies are implementing the new technology for their cars to make"+
            " it more morder and efficient in terms of fuel consumption and fuel efficiency. Let's see how "+
            "well all of the cars models that are performing in terms of Fuel MPG.")

    d3.select("#scene-container")
      .append("div")
      .attr("id", "chart1-Domain")
      .append("label").html("Average Highway MPG")
      .style("color", "#1e90ff")
      .insert("input")
      .attr("type","radio")
      .attr("name","domain")
      .attr("value","highway")
      .attr("checked", true);

    d3.select("#chart1-Domain")
      .append("label").html("Average City MPG")
      .style("color", "#DC582A")
      .style("margin-left", "10px")
      .insert("input")
      .attr("type","radio")
      .attr("name","domain")
      .attr("value","city")

    var parameterChanged = function(d) {
        if(this.value === "highway"){
            d3.select("#chart1")
              .selectAll("rect")
              .transition()
              .duration(1000)
              .attr("fill", "#1e90ff")
              .attr("width", function(d, i) { return xAxisScale(highway_mpgs[i]); });
        }
        else{
            d3.select("#chart1")
              .selectAll("rect")
              .transition()
              .duration(1000)
              .attr("fill", "#DC582A")
              .attr("width", function(d, i) { return xAxisScale(city_mpgs[i]); });
        }
    }

    const radioButtons = d3.select("#chart1-Domain").selectAll("input");
    radioButtons.on("change", parameterChanged)

    var currentTooltipValue = function(d) {
        currentIndex = makes.indexOf(d);
        if(currentIndex != -1){
            if(currentParameter === "highway"){
                return "MPG: " + highway_mpgs[currentIndex];
            }
            else{
                return "MPG: " + city_mpgs[currentIndex];
            }
        }
        else{
            return "MPG: Error";
        }
    }

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
      .attr("y", function(d, i) { return Number(yAxisScale(makes[i]) + 5); })
      .attr("width", function(d, i) { return xAxisScale(highway_mpgs[i]); })
      .attr("height", yAxisScale.bandwidth() - 10)
      .attr("fill", "#1e90ff")
      .on("mouseover", function(event, d) {
            chart1_tooltip.style("opacity", 0.9);
            chart1_tooltip.text(currentTooltipValue(d))
                          .style("left", (event.pageX) + "px")
                          .style("top", (event.pageY) + "px");
      })
      .on("mouseout", function(d, i) {
            chart1_tooltip.style("opacity", 0);
      });

      //annotation
      d3.select("#annotation").remove();
      d3.select("body")
        .append("div")
        .attr("id", "annotation")
        .style("top", "500px")
        .style("left", "800px")
        .style("height", "50px")
        .html("Hyundai has the highest MPG because of Electric Engine.")

      //char labels
      d3.select("#chart1")
        .append('text')
        .attr('x', -500)
        .attr('y', 15)
        .attr('transform', 'rotate(-90)')
        .attr('text-anchor', 'middle')
        .text('Cars')

      d3.select("#chart1")
        .append('text')
        .attr('x', 500)
        .attr('y', 1000)
        .attr('text-anchor', 'middle')
        .text('Milage')
}

async function generateSlide2(){
    //load data
    const data = await d3.csv("https://flunky.github.io/cars2017.csv");

    //clear scene
    var sceneContainer = d3.select("#scene-container");
    if (sceneContainer) { sceneContainer.remove(); } 

    //update the page number
    d3.select("#scene-title")
    .text("Page "+slide);

    var chart2_tooltip = d3.select("body")
                           .append("div")
                           .append("div")
                           .style("opacity", 0)
                           .attr("class", "tooltip")
                           .style("background-color", "black")
                           .style("color", "white")
                           .style("border-radius", "5px")
                           .style("padding", "15px");

    d3.select("#scene-body")
    .append("div")
    .attr("id","scene-container")

    d3.select("#chart-question")
      .text("How does Highway and City MPG compares for all type of Cars?")

    d3.select("#chart-description")
      .text("The fuel efficiency differs for the highway and the city, due to the different driving "+
            "styles. So, Looking at all the car models and see how are those performing on their "+
            "highway and city MPG by the factor of cylinders.")

    //annotation
    d3.select("#annotation").remove();
    d3.select("body")
    .append("div")
    .attr("id", "annotation")
    .style("top", "500px")
    .style("left", "500px")
    .style("height", "50px")
    .html("The smaller size of Engine perofrms better.");


    var xAxisScale = d3.scaleLog()
                       .domain([10,150])
                       .range([0,900]);
    var yAxisScale = d3.scaleLog()
                       .domain([10,150])
                       .range([900,0]);

    d3.select("#scene-container")
      .append("svg")
      .attr("id","chart2")
      .attr("width", svgWidth.toString() + "px")
      .attr("height", svgHeight.toString() + "px");

    d3.select("#chart2")
      .append("g")
      .attr("transform", "translate(100,50)")
      .call(d3.axisLeft(yAxisScale).tickValues([10,20,50,100]));

    d3.select("#chart2")
      .append("g")
      .attr("transform", "translate(100,"+ Number(chartHeight + 50) +")")
      .call(d3.axisBottom(xAxisScale).tickValues([10,20,50,100]));

    d3.select("#chart2")
      .append("g")
      .attr("transform", "translate(100,50)")
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", function(d) { return xAxisScale(d.AverageCityMPG); })
      .attr("cy", function(d) { return yAxisScale(d.AverageHighwayMPG); })
      .attr("r", function(d) { return Number(d.EngineCylinders) + 2; })
      .on("mouseover", function(event, d) {
        chart2_tooltip.text(d.EngineCylinders + "Cylinders" +
                            "(Hwy: " + d.AverageHighwayMPG + ", " +
                            "Cty:" + d.AverageCityMPG + ")")
                      .style("top", (event.pageY) + "px")
                      .style("left", (event.pageX) + "px")
                      .style("height", "60px")
                      .style("width", "150px");
        chart2_tooltip.style("opacity", 0.9)
      })
      .on("mouseout", function(event, d) { 
        chart2_tooltip.style("opacity", 0);
      });

    //char labels
    d3.select("#chart2")
      .append('text')
      .attr('x', -500)
      .attr('y', 15)
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'middle')
      .text('Highway MPG')

    d3.select("#chart2")
      .append('text')
      .attr('x', 500)
      .attr('y', 1000)
      .attr('text-anchor', 'middle')
      .text('City MPG')

}

async function generateSlide3(){
    //load data
    const data = await d3.csv("https://flunky.github.io/cars2017.csv");

    //clear scene
    var sceneContainer = d3.select("#scene-container");
    if (sceneContainer) { sceneContainer.remove(); }
    
    //update the page number
    d3.select("#scene-title")
    .text("Page "+slide);

    d3.select("#scene-body")
    .append("div")
    .attr("id","scene-container");

    d3.select("#chart-question")
      .text("How the fuel efficienty differs with respect to fuel type, Engine cylinders?")

    d3.select("#chart-description")
      .text("From the previous charts we can see that the electric engine performs way better in fuel "+
            "efficiency. So, comparing all cars model's fuel efficiency with two factors of engine "+
            "cylinders and fuel inake method (Diesel, Gasoline and Electric).")

    d3.select("#annotation").remove();
    d3.select("body")
    .append("div")
    .attr("id", "annotation")
    .style("top", "500px")
    .style("left", "800px")
    .style("height", "100px")
    .html("The Diesel and Petrol engine cars performs similar, while Petrol engine has better fuel efficiency for 4 cylinders.");

    d3.select("#scene-container")
      .append("svg")
      .attr("id", "chart3")
      .attr("width", svgWidth + "px")
      .attr("height", svgHeight + "px");


    var cylinders = ["2", "4", "6", "8", "10", "12"];

    var xAxisScale = d3.scaleBand().range([0, chartWidth])
                                   .domain(data.map(function (d) { return d.Fuel; }));

    var yAxisScale = d3.scaleBand().range([chartHeight, 0])
                                   .domain(cylinders);

    var getChart3CircleColor = function (fuelType) {
        if (fuelType === "Diesel") {
            return "#1E90FF";
        }
        else if (fuelType === "Gasoline") {
            return "#DC582A";
        }
        else {
            return "#00AFB1";
        }
    }

    d3.select("#chart3")
      .append("g")
      .attr("transform", "translate(50,"+Number(chartHeight+50)+")")
      .call(d3.axisBottom(xAxisScale).ticks(5));

    d3.select("#chart3")
      .append("g")
      .attr("transform", "translate(50,50)")
      .call(d3.axisLeft(yAxisScale));
    
    d3.select("#chart3")
      .selectAll("circle")
      .data(data)
      .enter().append("circle")
      .attr("cx", function (d) { return 200 + xAxisScale(d.Fuel); })
      .attr("cy", function (d) { return 900 - 70 * d.EngineCylinders; })
      .attr("r", function (d) { return d.AverageHighwayMPG / 1.5; })
      .attr("fill", function(d) { return getChart3CircleColor(d.Fuel) })
      .attr("stroke", "black")
      .attr("opacity", 0.1);

    //char labels
    d3.select("#chart3")
      .append('text')
      .attr('x', -500)
      .attr('y', 15)
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'middle')
      .text('Engine Cylinder')

    d3.select("#chart3")
      .append('text')
      .attr('x', 500)
      .attr('y', 1000)
      .attr('text-anchor', 'middle')
      .text('Fuel Type')
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
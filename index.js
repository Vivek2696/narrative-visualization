let slide = 0;

function initialize() {
    onNextSlide();
}

function onNextSlide(){
    //check the current slide and take action appropriately
    slide++;
    switch (slide) {
        case 1:
            generateSlide1();
            break;
        case 2:
            generateSlide2();
            break;
        case 3:
            generateSlide3();
            break;
        default:
            slide = 1;
            generateSlide1();
            break;
    }
}

function generateSlide1(){
    //get the scene container and remove it
    var sceneContainer = d3.select("#scene-container");
    if (sceneContainer) { sceneContainer.remove(); } 

    //update the page number
    d3.select("#scene-title")
    .text("Page "+slide);

    d3.select("#scene-body")
    .append("div")
    .attr("id","scene-container")
    .append("p")
    .append("id", "scene1-paragraph")
    .append("text")
    .text("Main Body for the slide 1. Basic overview of narrative goes here...");
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
    .append("id", "scene1-paragraph")
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
    .append("id", "scene1-paragraph")
    .append("text")
    .text("Template for slide 3.");
}

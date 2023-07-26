let slide = 1;

function initialize() {
    generateSlide1();
    disablePreviousButton();
}

function onNextSlide(){
    //check the current slide and move forward
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
    //check the current slide and go back
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
    .text("Template for slide 1.");
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
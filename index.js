function helloWorld() {
    d3.select("body")
    .append("p")
    .attr("id", "d3-gen-paragraph1")
    .append("text")
    .text("Hello from D3.js world!");
}
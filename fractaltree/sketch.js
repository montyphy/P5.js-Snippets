var lengthSlider;
var thicknessSlider;
var rotationSlider;
var thresholdSlider;

function setup() {
  var canvas = createCanvas(800, 600);
  canvas.parent("canvas");

  lengthSlider = createSlider(20, 200, 150, 1);
  lengthSlider.parent("tree-length");

  thicknessSlider = createSlider(1, 20, 8, 1);
  thicknessSlider.parent("tree-thickness");

  rotationSlider = createSlider(0, TWO_PI, PI/6, 0.01);
  rotationSlider.parent("tree-rotation");

  thresholdSlider = createSlider(1, 15, 5, 1);
  thresholdSlider.parent("tree-threshold");
}

function draw() {
  background(0);

  translate(width/2, height);

  var trunkLength = lengthSlider.value();
  var colour = 255;
  var thickness = thicknessSlider.value();

  branch(trunkLength, thickness, colour);
}

function branch(length, thickness, colour) {
  stroke(colour, 255, 255);
  strokeWeight(thickness);
  line(0, 0, 0, -length);

  var nl = length * 0.7;
  var nt = thickness * 0.8;
  var nc = colour * 0.9;
  if (nl > thresholdSlider.value()) {
    translate(0, -length);

    push();
    rotate(rotationSlider.value());
    branch(nl, nt, nc);
    pop();

    push();
    rotate(-rotationSlider.value());
    branch(nl, nt, nc);
    pop();
  }
}

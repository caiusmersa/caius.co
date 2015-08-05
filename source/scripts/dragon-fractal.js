var canvas = document.getElementById("pic");
var it_slider = document.getElementById("it_slider");
var color_check = document.getElementById("color_check");
var grid_check = document.getElementById("grid_check");
var context = canvas.getContext("2d");
var gradient;
var iterations = 14, folds, mirror, pos_x, pos_y, dir, last_x, last_y;
it_slider.value = 14;
var useColors = true;
color_check.checked = true;
var useGrid = false;
grid_check.checked = false;
var x, y, i;

function createGradient(color) {
  gradient = context.createLinearGradient(800, 150, 1370, 500);
  gradient.addColorStop(0, "white");
  gradient.addColorStop(1, color);
}
createGradient("navy");   //Default grad. color

function randColor() {
  return Math.floor(Math.random() * 256);
}

function render() {
  //Draw the background gradient
  context.fillStyle = gradient;
  context.fillRect(0, 0, 970, 600);
  if (useGrid) {
    //Draw the background grid
    for (x = 1; x < 970; x += 10) {
      context.moveTo(x, 0);
      context.lineTo(x, 600);
    }

    for (y = 1; y < 600; y += 10) {
      context.moveTo(0, y);
      context.lineTo(970, y);
    }
  }

  context.strokeStyle = "#C6CBDE";
  context.stroke();

  //Draw the dragon curve
  folds = iterations > 0 ? "R" : "";
  for (i = 2; i <= iterations; i++) {
    mirror = "";
    for (x = folds.length - 1; x >= 0; x--) {
      mirror += folds[x] === "R" ? "L" : "R";
    }
    folds = folds + "R" + mirror;
  }

  var colorBlockSize = Math.pow(2, parseInt(Math.random() * iterations, 10) + 1);
  var numBlocks = iterations > 0 ? Math.pow(2, iterations) / colorBlockSize : 1;

  var lineLen = iterations >= 10 ? iterations >= 15 ? 1 : 4 : iterations >= 7 ? 9 : 30;
  context.strokeStyle = useColors ? 'rgb(' + randColor() + "," + randColor() + "," + randColor() + ")" : "#000";
  context.beginPath();
  pos_x = iterations < 15 ? 700 : 200;
  pos_y = iterations < 15 ? 350 : 200;
  context.moveTo(pos_x, pos_y);
  pos_y += lineLen;
  context.lineTo(pos_x, pos_y);
  var colorBlockCount = 1;

  dir = 3;
  for (i = 0; i < folds.length; i++) {
    dir = ((folds[i] === "R" ? (dir - 1) : (dir + 1)) + 4) % 4;
    context.moveTo(pos_x, pos_y);
    if (dir % 2 === 0) {
      pos_x += (dir - 1) * lineLen;
    } else {
      pos_y += (dir - 2) * lineLen;
    }

    context.lineTo(pos_x, pos_y);
    colorBlockCount += 1;
    if (colorBlockCount === colorBlockSize) {
      if (useColors) {
        context.strokeStyle = 'rgb(' + randColor() + "," + randColor() + "," + randColor() + ")";
      }
      context.stroke();
      context.beginPath();
      colorBlockCount = 0;
    }
  }

  context.strokeStyle = useColors ? 'rgb(' + randColor() + "," + randColor() + "," + randColor() + ")" : "#000";
  context.stroke();

  //Draw the misc. text
  context.textAlign = "right";
  context.textBaseline = "bottom";
  context.font = "bold 20px Anonymous Pro";
  context.fillStyle = "#000";
  context.fillText("iterations: " + iterations, 965, 595);
  context.fillText(Math.pow(2, iterations) + (iterations > 0 ? " segments" : " segment") + " of pixel length " + lineLen, 965, 570);
  context.textAlign = "left";
  context.fillText(useColors ? numBlocks + " randomly colored subset(s)" : "No colors", 5, 595);
  if (useColors) {
    var string = numBlocks + " randomly colored";
    for (i = string.length; i >= string.length - 15; i--) {
      context.fillStyle = 'rgb(' + randColor() + "," + randColor() + "," + randColor() + ")";
      context.fillText(string.substring(0, i), 5, 595);
    }
    context.fillStyle = "#000";
    context.fillText(numBlocks, 5, 595);
  }
}
render();

function randomGradient() {
  var rand = Math.random();
  if (rand > 0.66) {
    createGradient("maroon");
  } else if (rand > 0.33) {
    createGradient("navy");
  } else {
    createGradient("olive");
  }
  render();
}
canvas.addEventListener("click", randomGradient, false);

function changeIterations() {
  iterations = it_slider.value;
  render();
}
it_slider.addEventListener("keyup", changeIterations, false);
it_slider.addEventListener("change", changeIterations, false);

function changeColorUse() {
  useColors = color_check.checked;
  render();
}
color_check.addEventListener("CheckboxStateChange", changeColorUse, false);

function changeGridUse() {
  useGrid = grid_check.checked;
  render();
}
grid_check.addEventListener("CheckboxStateChange", changeGridUse, false);

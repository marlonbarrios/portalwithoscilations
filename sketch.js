let canvas;
let steps = 25;
let speed = 4;

function setup() {
  createCanvas(512, 512);
  mbsFramework();
  document.title = 'Portal with Oscillations';
}

function windowResized() {
  resizeCanvas(512, 512);
}

function draw() {
  background(255, 25);
  if (mouseIsPressed) {
    background(255);
  }

  noFill();
  strokeCap(ROUND);
  
  // Add padding so lines don't touch edges
  let padding = 20;
  let drawWidth = width - (padding * 2);
  let drawHeight = height - (padding * 2);
  let size = drawWidth / steps;

  for (let i = 0; i < steps; i++) {
    for (let j = 0; j < steps; j++) {
      let x = padding + i * size;
      let y = padding + j * size;
      let centerX = width / 2;
      let centerY = height / 2;
      let d = dist(x, y, centerX, centerY);
      let offsetX = map(d, 0, width, -PI, PI);
      let offsetY = map(d, 0, height, -PI, PI);
      strokeWeight(d * 0.01);
      if (key == '1') {
        speed = 1;
      }
      if (key == '2') {
        speed = 4;
      }
      if (key == '3') {
        speed = 6;
      }
      if (key == '4') {
        speed = 8;
      }
      if (key == '5') {
        speed = 10;
      }
      let a = cos(frameCount * 0.04 + offsetX) * speed;
      let b = sin(frameCount * 0.04 + offsetY) * speed;
      push();
      translate(x + size * 0.5, y + size * 0.5);
      rotate(a);
      noFill();
      // Reduce line length to stay within bounds
      let lineLength = size * 0.8;
      line(-lineLength, 0, lineLength * 0.08, 1);
      rotate(b);
      line(0, -lineLength, 0, lineLength * 0.08);
      pop();
    }
  }
}

function keyPressed() {
  let m = month();
  let d = day();
  let y = year();
  let t = hour() + ':' + minute();
  if (key == 'S' || key == 's')
    saveCanvas(canvas, 'canvas' + m + d + y + t, 'png');
}

function mbsFramework() {
  canvas = createCanvas(512, 512);
  canvas.style.borderRadius = '10px';
  canvas.style.boxShadow = '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)';
  cursor(CROSS);
}

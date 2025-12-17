const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [512, 512],
  animate: true,
  fps: 60
};

let steps = 25;
let speed = 4;
let mousePressed = false;
let currentKey = '';

// Helper functions
const map = (value, start1, stop1, start2, stop2) => {
  return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
};

const dist = (x1, y1, x2, y2) => {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
};

// Set up event listeners globally
let canvasElement = null;

window.addEventListener('mousedown', (e) => {
  if (canvasElement && canvasElement.contains(e.target)) {
    mousePressed = true;
  }
});

window.addEventListener('mouseup', () => {
  mousePressed = false;
});

window.addEventListener('keydown', (e) => {
  currentKey = e.key;
  if (e.key === '1') speed = 1;
  if (e.key === '2') speed = 4;
  if (e.key === '3') speed = 6;
  if (e.key === '4') speed = 8;
  if (e.key === '5') speed = 10;
  
  // Save canvas
  if ((e.key === 'S' || e.key === 's') && canvasElement) {
    const now = new Date();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    const y = now.getFullYear();
    const t = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
    const link = document.createElement('a');
    link.download = `canvas${m}${d}${y}${t}.png`;
    link.href = canvasElement.toDataURL('image/png');
    link.click();
  }
});

const sketch = ({ context, width, height, frame }) => {
  // Set up canvas styles
  const canvas = context.canvas;
  canvasElement = canvas;
  
  canvas.style.borderRadius = '10px';
  canvas.style.boxShadow = '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)';
  canvas.style.cursor = 'crosshair';
  
  document.title = 'Portal with Oscillations';

  return ({ context, width, height, frame }) => {
    // Background with alpha for trail effect
    context.fillStyle = mousePressed ? 'rgb(255, 255, 255)' : 'rgba(255, 255, 255, 0.1)';
    context.fillRect(0, 0, width, height);

    // Clear if mouse is pressed (full white background)
    if (mousePressed) {
      context.fillStyle = 'rgb(255, 255, 255)';
      context.fillRect(0, 0, width, height);
    }

    context.strokeStyle = 'black';
    context.lineCap = 'round';
    context.fillStyle = 'transparent';
    
    const size = width / steps;
    const centerX = width / 2;
    const centerY = height / 2;

    for (let i = 0; i < steps; i++) {
      for (let j = 0; j < steps; j++) {
        const x = i * size;
        const y = j * size;
        const d = dist(x, y, centerX, centerY);
        const offsetX = map(d, 0, width, -Math.PI, Math.PI);
        const offsetY = map(d, 0, height, -Math.PI, Math.PI);
        context.lineWidth = d * 0.01;
        
        const a = Math.cos(frame * 0.04 + offsetX) * speed;
        const b = Math.sin(frame * 0.04 + offsetY) * speed;
        
        context.save();
        context.translate(x + size * 0.5, y + size * 0.5);
        context.rotate(a);
        context.beginPath();
        context.moveTo(-size, 0);
        context.lineTo(size * 0.08, 1);
        context.stroke();
        context.rotate(b);
        context.beginPath();
        context.moveTo(0, -size);
        context.lineTo(0, size * 0.08);
        context.stroke();
        context.restore();
      }
    }
  };
};

canvasSketch(sketch, settings);

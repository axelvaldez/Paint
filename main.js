// setup canvas
const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 50;

// set context properties
ctx.strokeStyle = '#000000';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 4;

// set variables
var drawing = false,
    lastX = 0,
    lastY = 0;

 // draw
 function draw(e){
    if(!drawing) return;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    lastX = e.offsetX;
    lastY = e.offsetY;
}

// event listeners for drawing
canvas.addEventListener('mousedown', (e) => {
    drawing = true;
    lastX = e.offsetX;
    lastY = e.offsetY;
});
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => drawing = false);
canvas.addEventListener('mouseleave', () => drawing = false);

// set up size selector
function changeSize(e){
    e.preventDefault();
    if(this.classList.contains('active')) return;
    document.querySelector('.size.active').classList.remove('active');
    this.classList.add('active');
    ctx.lineWidth = this.dataset.size;
}

const sizes = document.querySelectorAll('.size');
sizes.forEach(size => size.addEventListener('click', changeSize));


// set up color selector
function changeColor(e){
    e.preventDefault();
    if(this.classList.contains('active')) return;
    document.querySelector('.color.active').classList.remove('active');
    this.classList.add('active');
    ctx.strokeStyle = this.dataset.color;
}

const colors = document.querySelectorAll('.color');
colors.forEach(color => color.addEventListener('click', changeColor));

// clear canvas
function clearCanvas(e){
    e.preventDefault();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

const btnClear = document.querySelector('.action.clear');
btnClear.addEventListener('click', clearCanvas);

// save image
function saveImage(e){
    const image = canvas.toDataURL();
    const time = new Date();
    const filename = `sketch-${time.getFullYear()}${time.getMonth()}${time.getDay()}${time.getHours()}${time.getMinutes()}${time.getSeconds()}`
    this.setAttribute('href', image);
    this.setAttribute('download', filename);
}

const btnSave = document.querySelector('.action.save');
btnSave.addEventListener('click', saveImage);
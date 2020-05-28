

let prevX,prevY,currX,currY;
let draw = false;
let pointSize=3;

const URL = window.URL;
let cvs = document.getElementById('canvas');
let ctx = cvs.getContext('2d');
let res = document.getElementById('results');

cvs.addEventListener('mousemove', init, false);

window.onload = function() {
	let inputImage = document.getElementById('inputImage');
	inputImage.addEventListener('change', handleImageFiles, false);
}
let n=1;
$("#canvas").click(function(evt) {
	
	let x = parseInt(evt.originalEvent.layerX);
	let y = parseInt(evt.originalEvent.layerY);
	drawCoordinates(x,y);
	if (n<3) {
		point(x,y,n);
		n++;
	}
	//point(x,y);
});

function mousePos(evt) {
	let rect = cvs.getBoundingClientRect();
	let x = parseInt(evt.clientX - rect.left);
	let y = parseInt(evt.clientY - rect.top);
	let p = ctx.getImageData(x, y, 1, 1).data;
	results.innerHTML = '<table style="width:100%;table-layout:fixed"><td>X: ' 
		+ x + '</td><td>Y: ' + y + '</td><td>Red: ' 
		+ p[0] + '</td><td>Green: ' + p[1] + '</td><td>Blue: ' 
		+ p[2] + '</td><td>Alpha: ' + p[3]+"</td></table>";
	return {x, y};
}

let ptable=document.getElementById('points-table');

function point(x,y,n) {
	let row=ptable.insertRow(-1);
	let cell0 = row.insertCell(0); 
	let cell1 = row.insertCell(1);
	let cell2 = row.insertCell(2);
	cell0.innerHTML = n;
	cell1.innerHTML = x;
	cell2.innerHTML = y;
}

function handleImageFiles(e) {	
	let url = URL.createObjectURL(e.target.files[0]);
	let img = new Image();
	img.onload = function() {
		cvs.width = img.width;
		cvs.height = img.height;
		ctx.drawImage(img, 0, 0);    
	}
	img.src = url;
}

function downloadImg() {
	button = document.getElementById('btn-download');
	//image=document.getElementById('mirror');
	let dataURL = cvs.toDataURL('image/png');
	let newData = dataURL.replace("image/png","image/octet-stream");
	//image.src = dataURL;
    button.href = newData;
}

// function canvastoimage() {
// 	//let canvas = document.getElementById('canvas');
// 	let dataURL = cvs.toDataURL('image/png');
// 	document.getElementById('mirrorcanvas').value =dataURL; //canvas.toDataURL();
// 	newimg= document.getElementById('mirrorcanvas').value;
// 	console.log(dataURL);
// 	console.log(newimg);
// }

function drawCoordinates(x,y){
    pointSize = 3; // Change according to the size of the point
    ctx.fillStyle = "#ff2626"; // Red color
    ctx.beginPath(); //Start path
    ctx.arc(x, y, pointSize, 0, Math.PI * 2, true); // Draw a point using the arc function of the canvas with a point structure.
    ctx.fill(); // Close the path and fill.
}



function init(evt) {

    w = cvs.width;
    h = cvs.height;

	cvs.onmousemove = mousePos;
    cvs.onpointermove = handlePointerMove;
    cvs.onpointerdown = handlePointerDown;
    cvs.onpointerup = stopDrawing;
    cvs.onpointerout = stopDrawing;
}


function drawLine() {
    var a = prevX,
        b = prevY,
        c = currX,
        d = currY;

    ctx.lineWidth = 4;
    ctx.lineCap = "round";

    ctx.beginPath();
    ctx.moveTo(a, b);
    ctx.lineTo(c, d);
    ctx.stroke();
    ctx.closePath();
}

function stopDrawing() {
    draw = false;
}

function recordPointerLocation(e) {
    prevX = currX;
    prevY = currY;
    currX = e.clientX - cvs.offsetLeft;
    currY = e.clientY - cvs.offsetTop;
}

function handlePointerMove(e) {
    if (draw) {
        recordPointerLocation(e);
        drawLine();
    }
}

function handlePointerDown(e) {
    recordPointerLocation(e);
    draw = true;
}

// $(".clear").click(function(evt) {
// 	w = cvs.width;
// 	h = cvs.height;
// 	if (confirm("Want to clear?")) {
//         ctx.clearRect(0, 0, w, h);
//     }
// });
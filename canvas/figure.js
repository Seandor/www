function drawStar(cxt, x, y, r, angle) {

	cxt.save();

	cxt.translate(x, y);
	// cxt.rotate(angle / 180 * Math.PI);

	// cxt.lineWidth = 1;
	cxt.scale(r, r);
	starPath(cxt);
	// cxt.stroke();
	cxt.fillStyle = "#fb3";
	cxt.fill();

	cxt.restore();
}

function starPath(cxt) {
	cxt.beginPath();
	for (var i = 0; i < 5; i++) {
		cxt.lineTo(Math.cos((18 + i*72)/180*Math.PI), 
			-Math.sin((18 + i*72)/180*Math.PI));
		cxt.lineTo(Math.cos((54 + i*72)/180*Math.PI)*0.5, 
			-Math.sin((54 + i*72)/180*Math.PI)*0.5);
	}
	cxt.closePath();
}
var WINDOW_WIDTH = document.body.clientWidth;
var WINDOW_HEIGHT = document.body.clientHeight;

window.onload = function() {	
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');
	
	canvas.width = WINDOW_WIDTH;
	canvas.height = WINDOW_HEIGHT;

	drawStar(context, 400, 400, 40, 30);
	
	// setInterval(
	// 	function() {
	// 		render(context);
	// 		update();
	// 	}
	// 	,
	// 	50
	// );
}

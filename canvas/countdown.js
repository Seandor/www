var WINDOW_WIDTH = document.body.clientWidth;
var WINDOW_HEIGHT = document.body.clientHeight;
RADIUS = Math.round(WINDOW_WIDTH*4/5 / 108) - 1;
var MARGIN_LEFT = Math.round(WINDOW_WIDTH/10);
var MARGIN_TOP = Math.round(WINDOW_HEIGHT/5);
var NUM_WIDTH = digit[0][0].length * 2 * RADIUS;
var COLON_WIDTH = digit[10][0].length * 2 * RADIUS;
var PADDING = 2 * (RADIUS+1);

var cur_time = new Date();

var balls = [];
const colors = ["#FFFF00", "#FF99CC", "#00CC66", "#3333FF", "#FF6666", "#FF9900", "#999999", "#669933", "#33FF00", "#33FFFF"];

window.onload = function() {	
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');
	
	canvas.width = WINDOW_WIDTH;
	canvas.height = WINDOW_HEIGHT;
	
	setInterval(
		function() {
			render(context);
			update();
		},
		50
	);
};

function update() {
	next_time = new Date();
	if (cur_time.getSeconds() != next_time.getSeconds()) {
		if (parseInt(cur_time.getHours()/10) != parseInt(next_time.getHours()/10)) {
			addBalls(MARGIN_LEFT, MARGIN_TOP, next_time.getHours()/10);
		}		
		if (parseInt(cur_time.getHours()%10) != parseInt(next_time.getHours()%10)) {
			addBalls(MARGIN_LEFT + NUM_WIDTH+PADDING, MARGIN_TOP, next_time.getHours()%10);
		}

		if (parseInt(cur_time.getMinutes()/10) != parseInt(next_time.getMinutes()/10)) {
			addBalls(MARGIN_LEFT + 2*(NUM_WIDTH+PADDING) + COLON_WIDTH+PADDING, MARGIN_TOP, next_time.getMinutes()/10);
		}		
		if (parseInt(cur_time.getMinutes()%10) != parseInt(next_time.getMinutes()%10)) {
			addBalls(MARGIN_LEFT + 3*(NUM_WIDTH+PADDING) + COLON_WIDTH+PADDING, MARGIN_TOP, next_time.getMinutes()%10);
		}

		if (parseInt(cur_time.getSeconds()/10) != parseInt(next_time.getSeconds()/10)) {
			addBalls(MARGIN_LEFT + 4*(NUM_WIDTH+PADDING) + 2*(COLON_WIDTH+PADDING), MARGIN_TOP, parseInt(next_time.getSeconds()/10));
		}		
		if (parseInt(cur_time.getSeconds()%10) != parseInt(next_time.getSeconds()%10)) {
			addBalls(MARGIN_LEFT + 5*(NUM_WIDTH+PADDING) + 2*(COLON_WIDTH+PADDING), MARGIN_TOP, parseInt(next_time.getSeconds()%10));
		}
		cur_time = next_time;
	}

	updateBalls();

	// console.log(balls.length);
}

function addBalls(x, y, num) {
	for (var i = 0; i < digit[num].length; i++)
		for (var j = 0; j < digit[num][i].length; j++) {
			if (digit[num][i][j] == 1) {
				var aBall = {
					x: x+(RADIUS+1)+j*(2*RADIUS+1),
					y: y+(RADIUS+1)+i*(2*RADIUS+1),
					g: 1.5+Math.random(),
					vx: Math.pow(-1, Math.ceil(Math.random()*1000)) * 5,
					vy: -5,
					color: colors[Math.floor(Math.random()*colors.length)]
				};
				balls.push(aBall);				
			}
		}
}

function updateBalls() {
	for (var i = 0; i < balls.length; i++) {
		balls[i].x += balls[i].vx;
		balls[i].y += balls[i].vy;
		balls[i].vy += balls[i].g;

		if (balls[i].y > (WINDOW_HEIGHT - RADIUS)) {
			balls[i].y = WINDOW_HEIGHT - RADIUS;
			balls[i].vy = -balls[i].vy * 0.6;
		}
		// if (balls[i].x < 0) {
		// 	// balls.splice(i,1); 
		// 	balls[i].vx = -balls[i].vx
		// }
		// if (balls[i].x > (WINDOW_WIDTH - RADIUS)) {
		// 	balls[i].x = WINDOW_WIDTH - RADIUS;
		// 	balls[i].vx = -balls[i].vx;
		// }
	}

	var count = 0;
	for (var i = 0; i < balls.length; i++) {
		if (balls[i].x - RADIUS > 0 && balls[i].x + RADIUS < WINDOW_WIDTH)
			balls[count++] = balls[i]
	}
	while (balls.length > count) {
		balls.pop();
	}
}

function render(cxt) {
	
	cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);

	var hours = cur_time.getHours();
	var minutes = cur_time.getMinutes();
	var seconds = cur_time.getSeconds();
	
	renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours/10), cxt);
	renderDigit(MARGIN_LEFT + NUM_WIDTH+PADDING, MARGIN_TOP, parseInt(hours%10), cxt);
	renderDigit(MARGIN_LEFT + 2*(NUM_WIDTH+PADDING), MARGIN_TOP, 10, cxt);

	renderDigit(MARGIN_LEFT + 2*(NUM_WIDTH+PADDING) + COLON_WIDTH+PADDING, MARGIN_TOP, parseInt(minutes/10), cxt);
	renderDigit(MARGIN_LEFT + 3*(NUM_WIDTH+PADDING) + COLON_WIDTH+PADDING, MARGIN_TOP, parseInt(minutes%10), cxt);
	renderDigit(MARGIN_LEFT + 4*(NUM_WIDTH+PADDING) + COLON_WIDTH+PADDING, MARGIN_TOP, 10, cxt);

	renderDigit(MARGIN_LEFT + 4*(NUM_WIDTH+PADDING) + 2*(COLON_WIDTH+PADDING), MARGIN_TOP, parseInt(seconds/10), cxt);
	renderDigit(MARGIN_LEFT + 5*(NUM_WIDTH+PADDING) + 2*(COLON_WIDTH+PADDING), MARGIN_TOP, parseInt(seconds%10), cxt);

	for (var i = 0; i < balls.length; i++) {
		cxt.fillStyle = balls[i].color;

		cxt.beginPath();
		cxt.arc(balls[i].x, balls[i].y, RADIUS, 0, 2*Math.PI);
		cxt.closePath();

		cxt.fill();
	}
}

function renderDigit(x, y, num, cxt) {
	cxt.fillStyle = "rgb(0,102,153)";
	for (var i = 0; i < digit[num].length; i++)
		for (var j = 0; j < digit[num][i].length; j++) {
			if (digit[num][i][j] == 1) {
				cxt.beginPath();
				cxt.arc(x+(RADIUS+1)+j*(2*RADIUS+1), y+(RADIUS+1)+i*(2*RADIUS+1), RADIUS, 0, 2*Math.PI);
				cxt.closePath();
				
				cxt.fill();
			}
		}
}


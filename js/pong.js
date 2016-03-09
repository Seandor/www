//global variables
var ctx;
var WIDTH = 800;
var HEIGHT = 600;
var ball_pos = new Array(2);
var ball_vel = new Array(2);
var ball_rad = 50;
var ball_img = new Image();
ball_img.src = "src/guatai.png";

function game_init() {
	ctx = document.getElementById('pong').getContext('2d');
	ball_pos[0] = WIDTH / 2;
	ball_pos[1] = HEIGHT / 2;
	ball_vel[0] = 4;
	ball_vel[1] = 2;
	// draw_ball(ball_pos,ball_rad,ball_img);
	setInterval(move_ball,50);

}

function draw_ball(ball_pos,ball_rad,img) {
	ctx.beginPath();
	ctx.arc(ball_pos[0],ball_pos[1],ball_rad,0,2*Math.PI);
	// ctx.drawImage(img,ball_pos[0]-ball_rad,ball_pos[1]-ball_rad,2*ball_rad,2*ball_rad);
	ctx.stroke();
}

function move_ball() {
	ctx.clearRect(ball_pos[0]-ball_rad,ball_pos[1]-ball_rad,2*ball_rad,2*ball_rad);

	if (ball_pos[0] <= ball_rad || (WIDTH-ball_pos[0]) <= ball_rad) {
		ball_vel[0] = -ball_vel[0];
	}
	if (ball_pos[1] <= ball_rad || (HEIGHT-ball_pos[1]) <= ball_rad) {
		ball_vel[1] = -ball_vel[1];
	}
	ball_pos[0] += ball_vel[0];
	ball_pos[1] += ball_vel[1];
	draw_ball(ball_pos,ball_rad,ball_img);
}
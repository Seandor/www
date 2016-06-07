/*
Grid util.
*/
function Grid(grid_width, grid_height) {
	this.grid_width = grid_width;
	this.grid_height = grid_height;
	this.cells = this.init();
}

Grid.prototype.init = function () {
	var a, i, j;
	var cells = [];
	for (i = 0; i < this.grid_height; i++) {
		a = [];
		for (j = 0; j < this.grid_width; j++) {
			a[j] = null;
		}
		cells[i] = a;
	}
	return cells;
};

// Given a direction and start cell to traverse the grid
// return the traversal list
Grid.prototype.traverse = function(start_cell, direction, num_steps) {
	var row, col;
	var traverse_list = [];
	for ( var i = 0; i < num_steps; i++ ) {
		row = start_cell[0] + i * direction[0];
		col = start_cell[1] + i * direction[1];
		traverse_list[i] = this.cells[row][col];
	}
	return traverse_list;
};

Grid.prototype.setTile = function (row, col, value) {
	this.cells[row][col] = value;
};

Grid.prototype.printCell = function () {
	for (var row = 0; row < this.grid_height; row++) {
		for (var col = 0; col < this.grid_width; col++) {
			console.log(this.cells[row][col]);
		}
		console.log('\n');
	}
};
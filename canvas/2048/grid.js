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
	// 0: UP 1: RIGHT 2: DOWN 3: LEFT
	var row, col;
	var traverse_list = [];
	for ( var i = 0; i < num_steps; i++ ) {
		row = start_cell[0] + i * direction.row;
		col = start_cell[1] + i * direction.col;
		traverse_list[i] = this.cells[row][col];
	}
	return traverse_list;
};

// Find an available random cell
Grid.prototype.randomAvailableCells = function () {
	var cells = this.availableCells();
	if (cells.length) {
		return cells[Math.floor(Math.random() * cells.length)];
	}
};

// Return a list of available cell index
Grid.prototype.availableCells = function () {
	var cells = [];
	this.eachCell( function (row, col, value) {
		if (value === null) {
			cells.push({row: row, col: col});
		}
	});
	return cells;
};

// Split this piece of code because
// It can be reused many times
Grid.prototype.eachCell = function (callback) {
	for (var row = 0; row < this.grid_height; row++) {
		for (var col = 0; col < this.grid_width; col++) {
			callback(row, col, this.cells[row][col]);
		}
	}
};

Grid.prototype.setTile = function (row, col, value) {
	this.cells[row][col] = value;
};

Grid.prototype.getTile = function (row, col) {
	return this.cells[row][col];
};

Grid.prototype.printCells = function () {
	this.eachCell( function (row, col, value) {
		console.log('Cell(' + row + ',' + col + '):' + value);
	});
};


// Test case

function testGrid() {
	var grid = new Grid(3, 4);
	var game = new twentyFortyEight();
	suite = new TestSuite();
	// initialize the grid with proper value
	var number = 0;
	grid.eachCell(function (row, col, value) {
		grid.setTile(row, col, number);
		number += 1;
	});

	grid.printCells();
	// test traverse functionality
	// 0  1  2
	// 3  4  5
	// 6  7  8
	// 9  10 11
	suite.runTest(grid.traverse([0, 0], game.getVector(0), 4), [0, 3, 6, 9], "Test case 1:"); // first column
	suite.runTest(grid.traverse([1, 0], game.getVector(3), 3), [3, 4, 5], "Test case 2:"); // second row
	suite.runTest(grid.traverse([0, 1], game.getVector(0), 4), [1, 4, 7, 10], "Test case 3:"); // second column
	suite.runTest(grid.traverse([0, 2], game.getVector(1), 3), [2, 1, 0], "Test case 4:"); // first row reverse
	suite.runTest(grid.traverse([3, 0], game.getVector(3), 3), [9, 10, 11], "Test case 5:"); // last row
	suite.runTest(grid.traverse([3, 2], game.getVector(2), 4), [11, 8, 5, 2], "Test case 6:"); // last column reverse

	grid.setTile(1, 1, 100);
	suite.runTest(grid.getTile(1, 1), 100, "Test case 7:");

	suite.reportResults();
}
/**
 * SpatialTable class
 * 
 * @license Copyright (c) 2015 Marian Rohoška (marian.rohoska@seznam.cz)
 * see LICENSE.txt for license rights and limitations of The MIT License (MIT)
 */

// Constructor for SpatialTable class
function SpatialTable(cellSize) {
	this.table = [];
	if (cellSize >= 20)
		this.cellSize = cellSize;
	else
		this.cellSize = 20;
}

// return key for x, y coordinates
SpatialTable.prototype.getKey = function(indexX, indexY) {
	//no need to get SpatialTable.length or go through indexes, so no need for real hash function
	return Math.round(indexX) + "," + Math.round(indexY);
};

// add NodeSVG to table
SpatialTable.prototype.addNode = function(nodeSVG) {
	var x = this.getMinMaxIndex(nodeSVG.getCoordsX());
	var y = this.getMinMaxIndex(nodeSVG.getCoordsY());
	for (var i = x[0], l = x[1]; i <= l; i++)
		for (var j = y[0], k = y[1]; j <= k; j++) {
			if (this.table[this.getKey(i, j)] == undefined)
				this.table[this.getKey(i, j)] = [];
			this.table[this.getKey(i, j)].push(nodeSVG);
		}
};

// get Nodes from table on x, y coordinates
SpatialTable.prototype.getNodesFromCoords = function(x, y) {
	return this.table[this.getKey(x / this.cellSize, y / this.cellSize)];
};

// return min and max index from coordinates
SpatialTable.prototype.getMinMaxIndex = function(coords) {
	var min = coords[0];
	var max = coords[0];
	for (var i = 0, l = coords.length; i < l; i++) {
		if (min > coords[i]) min = coords[i];
		if (max < coords[i]) max = coords[i];
	}
	return [min / this.cellSize, max / this.cellSize];
};
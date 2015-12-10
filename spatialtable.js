/**
 * SpatialTable class
 * 
 * @license Copyright (c) 2015 Marian Rohoška (marian.rohoska@seznam.cz)
 * see LICENSE.txt for license rights and limitations of The MIT License (MIT)
 */

// Constructor for SpatialTable class
function SpatialTable(cellSize) {
	this.table = [];
	if (cellSize > 20)
		this.cellSize = cellSize;
	else
		this.cellSize = 20;
}

// return key for x, y indexes
SpatialTable.prototype.getKey = function(indexX, indexY) {
	//no need to get SpatialTable.length or go through table, so no need for real hash function
	return indexX + "," + indexY;
};

// add node (NodeSVG) to table
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

//add array of nodes (NodeSVG) to table
SpatialTable.prototype.addNodes = function(nodes) {
	for (var i = 0, l = nodes.length; i < l; i++)
		this.addNode(nodes[i]);
};

// get Nodes from table on x, y coordinates
SpatialTable.prototype.getNodesFromCoords = function(x, y) {
	x = Math.floor(x / this.cellSize);
	y = Math.floor(y / this.cellSize);
	return this.table[this.getKey(x, y)];
};

// get Nodes from table in area between x1, y1 - x2, y2 coordinates
SpatialTable.prototype.getNodesFromArea = function(x1, y1, x2, y2) {
	var x = this.getMinMaxIndex([x1, x2]);
	var y = this.getMinMaxIndex([y1, y2]);
	var nodes = [];
	for (var i = x[0], xMax = x[1]; i <= xMax; i++)
		for (var j = y[0], yMax = y[1]; j <= yMax; j++) {
			var pNodes = this.table[this.getKey(i, j)];
			if (pNodes != undefined)
				for (var k = 0, pNodesMax = pNodes.length; k < pNodesMax; k++)
					if (!this.includes(nodes, pNodes[k]))
						nodes.push(pNodes[k]);
		}
	return nodes;
};

// return min and max index from coordinates
SpatialTable.prototype.getMinMaxIndex = function(coords) {
	var min = coords[0];
	var max = coords[0];
	for (var i = 0, l = coords.length; i < l; i++) {
		if (min > coords[i]) min = coords[i];
		if (max < coords[i]) max = coords[i];
	}
	min = Math.floor(min / this.cellSize);
	max = Math.floor(max / this.cellSize);
	return [min, max];
};

// check if array of NodeSVG includes node
SpatialTable.prototype.includes = function(nodesSVG, node) {
	for (var i = 0, l = nodesSVG.length; i < l; i++)
		if (nodesSVG[i].getId() == node.getId())
			return true;
	return false;
};

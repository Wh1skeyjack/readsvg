/**
 * NodeSVG class
 * 
 * @license Copyright (c) 2015 Marian Rohoška (marian.rohoska@seznam.cz)
 * see LICENSE.txt for license rights and limitations of The MIT License (MIT)
 */

// Constructor for NodeSVG
function NodeSVG() {
	this.coordsX = [];
	this.coordsY = [];
	this.desc = null;
	this.passable = false;
}

// Set coordsX and coordsY from SVG Path
NodeSVG.prototype.setCoords = function(svgPath) {
	for (var i = 0, l = svgPath.numberOfItems; i<l; i++) {
		var seg = svgPath.getItem(i);
		switch (seg.pathSegType) {
			case  3:	//move to
				this.coordsX.push(seg.x);
				this.coordsY.push(seg.y);
				break;
			case 5:		//line to
				this.coordsX.push(this.coordsX[0] + seg.x);
				this.coordsY.push(this.coordsY[0] + seg.y);
				break;
		}
	}
};

// <<<<<<<<<< regular setters for NodeSVG >>>>>>>>>>

NodeSVG.prototype.setCoordsX = function(coordsX) {
	this.coordsX = coordsX;
};

NodeSVG.prototype.setCoordsY = function(coordsY) {
	this.coordsY = coordsY;
};

NodeSVG.prototype.setDescription = function(desc) {
	this.desc = desc;
};

NodeSVG.prototype.setPassable = function(passable) {
	this.passable = passable;
};

// <<<<<<<<<< regular getters for NodeSVG >>>>>>>>>>

NodeSVG.prototype.getCoordsX = function() {
	return this.coordsX;
};

NodeSVG.prototype.getCoordsY = function() {
	return this.coordsY;
};

NodeSVG.prototype.getDescription = function() {
	return this.desc;
};

NodeSVG.prototype.isPassable = function() {
	return this.passable;
};
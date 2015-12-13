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
	this.id = null;
	this.desc = null;
	this.passable = false;
}

// Set coordsX and coordsY from SVG Path
NodeSVG.prototype.setCoords = function(svgPath) {
	for (var i = 0, l = svgPath.numberOfItems; i < l; i++) {
		var seg = svgPath.getItem(i);
		seg.x = Math.round(seg.x);
		seg.y = Math.round(seg.y);
		switch (seg.pathSegType) {
			case 2:	//move to (absolute)
			case 3:	//move to (first move to is  relative to [0,0], will not work if path is interrupted by this)
			case 4: //line to (absolute)
			case 6: //curve to (absolute)(just connects end points with line)
				this.coordsX.push(seg.x);
				this.coordsY.push(seg.y);
				break;
			case 5:	//line to (relative)
			case 7: //curve to (relative)(just connects end points with line)
				this.coordsX.push(this.coordsX[i-1] + seg.x);
				this.coordsY.push(this.coordsY[i-1] + seg.y);
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

NodeSVG.prototype.setId = function(id) {
	this.id = id;
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

NodeSVG.prototype.getId = function() {
	return this.id;
};

NodeSVG.prototype.getDescription = function() {
	return this.desc;
};

NodeSVG.prototype.isPassable = function() {
	return this.passable;
};
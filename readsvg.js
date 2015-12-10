/**
 * ReadSVG class
 * 
 * @license Copyright (c) 2015 Marian Rohoška (marian.rohoska@seznam.cz)
 * see LICENSE.txt for license rights and limitations of The MIT License (MIT)
 */

// Constructor for ReadSVG class
function ReadSVG() {
	this.nodes = [];
}

// save nodes from .svg file (path) into ReadSVG.nodes
ReadSVG.prototype.readFile = function(path) {
	var req = new XMLHttpRequest();
	req.open("GET" , path, false);
	req.send();
	var svgNodes = req.responseXML.getElementsByTagName("path");
	for (var i = 0, l = svgNodes.length; i < l; i++) {
		var node = new NodeSVG();
		node.setCoords(svgNodes[i].pathSegList);
		node.setId(svgNodes[i].getAttribute("id"));
		try {
			node.setDescription(svgNodes[i].getElementsByTagName("desc")[0].textContent);
		} catch(e) {
			//svg file have no empty tags if "desc" tag missing -> exception
			//obj.getDescription() is null by default, and no need to change it on exception
		}
		if (svgNodes[i].getAttribute("onclick") > 0)		//using inkscape attributes, in "onclick" attribute is stored if object is passable
			node.setPassable(true);
		this.nodes.push(node);
	}
};

// returns all ReadSVG.nodes (type: NodeSVG)
ReadSVG.prototype.getNodes = function() {
	return this.nodes;
};

// true - return all passable nodes; false - return all not passable nodes
ReadSVG.prototype.getPassableNodes = function(passable) {
	var reqNodes = [];
	for (var i = 0, l = this.nodes.length; i < l; i++)
		if (this.nodes[i].isPassable() == passable)
			reqNodes.push(this.nodes[i]);
	return reqNodes;
};

// return all nodes with description
ReadSVG.prototype.getDescNodes = function() {
	var reqNodes = [];
	for (var i = 0, l = this.nodes.length; i < l; i++)
		if (this.nodes[i].getDescription() != null)
			reqNodes.push(this.nodes[i]);
	return reqNodes;
};
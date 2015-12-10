/**
 * just some testing for readsvg.js
 * 
 * @license Copyright (c) 2015 Marian Rohoška (marian.rohoska@seznam.cz)
 * see LICENSE.txt for license rights and limitations of The MIT License (MIT)
 */

var printme = document.getElementById("print");
var walls = new SpatialTable(102);
var objects = new SpatialTable(102);

readFile("map.svg");
printSplit("objects from area between points [800, 800] [1100, 1100]");
printArrayOfNodes(objects.getNodesFromArea(800, 800, 1100, 1100));
printSplit("walls from area between points [800, 800] [1100, 1100]");
printArrayOfNodes(walls.getNodesFromArea(800, 800, 1100, 1100));
printSplit("objects from area near point [1100, 1100]");
printArrayOfNodes(objects.getNodesFromCoords(1100, 1100));
printSplit("walls from area near point [1100, 1100]");
printArrayOfNodes(walls.getNodesFromCoords(1100, 1100));

function readFile(path) {
	var file = new ReadSVG();
	file.readFile(path);
	walls.addNodes(file.getPassableNodes(false));
	objects.addNodes(file.getDescNodes());
}

function printArrayOfNodes(nodes) {
	for (var i = 0, l = nodes.length; i < l; i++) {
		var newDiv = document.createElement("div");
		var span1 = document.createElement("span");
		var span2 = document.createElement("span");
		var span3 = document.createElement("span");
		span1.textContent = nodes[i].getDescription() + " & " + nodes[i].isPassable();
		span2.textContent = "x: " + nodes[i].getCoordsX();
		span3.textContent = "y: " + nodes[i].getCoordsY();
		newDiv.appendChild(span1);
		newDiv.appendChild(span2);
		newDiv.appendChild(span3);
		printme.appendChild(newDiv);
	}
}

function printSplit(text) {
	var newDiv = document.createElement("div");
	var split = "--------------------------------------------------------------------------------";
	newDiv.textContent = split + " " + text + " " + split;
	printme.appendChild(newDiv);
}
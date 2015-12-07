/**
 * just some testing for readsvg.js
 * 
 * @license Copyright (c) 2015 Marian Rohoška (marian.rohoska@seznam.cz)
 * see LICENSE.txt for license rights and limitations of The MIT License (MIT)
 */

var firstdiv = document.getElementById("firstdiv");
var printme = document.getElementById("print");
var read = new ReadSVG();
read.readFile("map.svg");
var objects = read.getObjects();
var table = new SpatialTable(50);


for (var i = 0, l = objects.length; i < l; i++) {
	if (objects[i].getDescription() != null) {
		var newDiv = document.createElement("div");
		var span1 = document.createElement("span");
		var span2 = document.createElement("span");
		span1.textContent = objects[i].getCoordsX() + " & " + objects[i].getCoordsY() + " & " + objects[i].isPassable();
		span2.textContent = objects[i].getDescription();
		newDiv.appendChild(span1);
		newDiv.appendChild(span2);
		printme.appendChild(newDiv);
	}
}

for (var i = 0, l = objects.length; i < l; i++)
	table.addNode(objects[i]);

var div1 = document.createElement("div");
var testobject = table.getNodesFromCoords(1000, 1000)[2];
div1.innerHTML = testobject.getCoordsX() + "<br>" + testobject.getDescription() + "<br><br>";
firstdiv.appendChild(div1);

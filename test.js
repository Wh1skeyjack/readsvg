/**
 * just some testing for readsvg.js
 * 
 * @license Copyright (c) 2015 Marian Rohoška (marian.rohoska@seznam.cz)
 * see LICENSE.txt for license rights and limitations of The MIT License (MIT)
 */

var printme = document.getElementById("print");
var read = new ReadSVG("map.svg");
var objects = read.getObjects();

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
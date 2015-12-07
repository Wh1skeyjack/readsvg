/**
 * ReadSVG class
 * 
 * @license Copyright (c) 2015 Marian Rohoška (marian.rohoska@seznam.cz)
 * see LICENSE.txt for license rights and limitations of The MIT License (MIT)
 */

function ReadSVG(path) {
	this.objects = [];
	var req = new XMLHttpRequest();
	req.open("GET" , path, false);
	req.send();
	var svgObjs = req.responseXML.getElementsByTagName("path");
	for (var i = 0, l = svgObjs.length; i < l; i++) {
		var obj = new NodeSVG();
		obj.setCoords(svgObjs[i].pathSegList);
		try {
			obj.setDescription(svgObjs[i].getElementsByTagName("desc")[0].textContent);
		} catch(e) {
			//svg file have no empty tags if "desc" tag missing -> exception
			//obj.getDescription() is null by default, and no need to change it on exception
		}
		if (svgObjs[i].getAttribute("onclick") > 0)		//using inkscape attributes, in "onclick" attribute is stored if object is passable
			obj.setPassable(true);
		this.objects.push(obj);
	}
}

ReadSVG.prototype.getObjects = function() {
	return this.objects;
};
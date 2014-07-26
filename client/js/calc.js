'use strict';

var CALC = {
	// calculates a normalized vector that points from (x1, y1) to (x2, y2)
	getVectorWithDirection: function(x1, y1, x2, y2) {
		var direction = {
				x: x2 - x1,
				y: y2 - y1,
			},
			length = Math.sqrt((direction.x * direction.x) + (direction.y * direction.y));

		// division by zero possible (!)
		return {
			x: (direction.x / length) || 0,
			y: (direction.y / length) || 0
		};
	},

	getDistance: function(x1, y1, x2, y2) {
		var dx = (x1 - x2),
			dy = (y1 - y2);

		return Math.sqrt(dx * dx + dy * dy);
	}
};
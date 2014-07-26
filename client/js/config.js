'use strict';

var width = window.innerWidth,
	height = window.innerHeight,
	size = 0,
	padding = 50;

if (width < height) {
	size = width;
} else {
	size = height;
}

var CFG = {
	GAME: {
		NPC_GROUPSIZE: 3
	},
	SENTINEL: {
		FLAG: 0,
		BASE: {
			x: padding,
			y: size - padding
		},
		TOWERS: [{
			x: padding,
			y: size * 0.2
		}, {
			x: padding,
			y: size * 0.5
		}, {
			x: size * 0.25,
			y: size - size * 0.25
		}, {
			x: size * 0.4,
			y: size - size * 0.4
		}, {
			x: size * 0.5,
			y: size - padding
		}, {
			x: size * 0.8,
			y: size - padding
		}],
		LANES: [
			[{
				x: padding,
				y: size - padding
			}, {
				x: padding,
				y: padding
			}, {
				x: size - padding,
				y: padding
			}],
			[{
				x: padding,
				y: size - padding
			}, {
				x: size / 2,
				y: size / 2
			}, {
				x: size - padding,
				y: padding
			}],
			[{
				x: padding,
				y: size - padding
			}, {
				x: size - padding,
				y: size - padding
			}, {
				x: size - padding,
				y: padding
			}]
		]
	},

	SCOURGE: {
		FLAG: 1,
		BASE: {
			x: size - padding,
			y: padding
		},
		TOWERS: [{
			x: size * 0.5,
			y: padding
		}, {
			x: size * 0.2,
			y: padding
		}, {
			x: size - size * 0.25,
			y: size * 0.25
		}, {
			x: size - size * 0.4,
			y: size * 0.4
		}, {
			x: size - padding,
			y: size * 0.5
		}, {
			x: size - padding,
			y: size * 0.8
		}],
		LANES: [
			[{
				x: size - padding,
				y: padding
			}, {
				x: padding,
				y: padding
			}, {
				x: padding,
				y: size - padding
			}],
			[{
				x: size - padding,
				y: padding
			}, {
				x: size / 2,
				y: size / 2
			}, {
				x: padding,
				y: size - padding
			}],
			[{
				x: size - padding,
				y: padding
			}, {
				x: size - padding,
				y: size - padding
			}, {
				x: padding,
				y: size - padding
			}]
		]
	}
};
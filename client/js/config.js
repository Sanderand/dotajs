'use strict';

var width = 500,
	height = 500,
	size = 100,
	padding = size * 0.05;

function getPointInCanvasDimension(position) {
	var percentageX = position.x / size,
		percentageY = position.y / size;

	return {
		x: percentageX * width,
		y: percentageY * height
	};
}

var CFG = {
	getColorForFraction: function(fraction) {
		var result;
		if (fraction == this.SENTINEL.FLAG) {
			result = this.SENTINEL.COLOR;
		} else {
			result = this.SCOURGE.COLOR;
		}
		return result
	},
	getNameForFraction: function(fraction) {
		var result;
		if (fraction == this.SENTINEL.FLAG) {
			result = 'Sentinel';
		} else {
			result = 'Scourge';
		}
		return result
	},
	GAME: {
		NPC_GROUPSIZE: 3,
		SPAWN_INTERVAL: 7500,

		BASE: {
			POWER: 10000
		},
		CREEP: {
			POWER: 100,
			ATTACK_DMG: 20,
			ATTACK_SPEED: 200,
			ATTACK_RADIUS: 3,
			ATTENTION_RADIUS: 3,

			SPEED: 0.1,
			MAX_INITIAL_OFFSET: 3,
			DISTANCE_THRESHOLD: 2
		},
		TOWER: {
			POWER: 1000,
			ATTACK_DMG: 20,
			ATTACK_SPEED: 200,
			ATTACK_RADIUS: 1,
			ATTENTION_RADIUS: 2
		}
	},
	SENTINEL: {
		FLAG: 0,
		COLOR: 0x00ff00,
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
		COLOR: 0xff0000,
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
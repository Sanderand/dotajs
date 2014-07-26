'use strict';

function Player(name, position) {
	return {
		view: new PIXI.Graphics(),
		name: name || 'player',
		position: {
			x: 100,
			y: 100
		} || position,
		vector: {
			x: 0,
			y: 0
		},
		speed: 0,
		maxSpeed: 4,
		acceleration: 0.1,
		slope: 0.25,
		DISTANCE_THRESHOLD: 3,

		move: function(input) {
			if (this.goToPoint) {
				var dx = this.position.x - this.goToPoint.x,
					dy = this.position.y - this.goToPoint.y,
					distance = Math.sqrt(dx * dx + dy * dy);

				if (distance > this.DISTANCE_THRESHOLD) {
					this.position.x += this.direction.x * this.maxSpeed;
					this.position.y += this.direction.y * this.maxSpeed;
				} else {
					delete this.goToPoint;
				}
			}
		},

		pointTowards: function(x, y) {
			this.goToPoint = {
				x: x,
				y: y
			};

			this.direction = {
				x: x - this.position.x,
				y: y - this.position.y,
			}

			//normalize direction vector
			var len = Math.sqrt((this.direction.x * this.direction.x) + (this.direction.y * this.direction.y));
			if (len != 0) {
				this.direction.x *= 1 / len;
				this.direction.y *= 1 / len;
			}
		},

		render: function() {
			this.view.clear();
			this.view.beginFill(0x000000);
			this.view.drawRect(this.position.x - 4, this.position.y - 4, 8, 8);
		}
	};
}
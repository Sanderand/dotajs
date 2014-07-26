'use strict';

function NPC(scene, lane, party) {
	return {
		scene: scene,
		view: new PIXI.Graphics(),
		color: 0x000000,

		speed: 0,
		maxSpeed: 4,
		acceleration: 0.1,
		slope: 0.25,

		party: party || 0,
		lane: lane,
		nextLanePoint: 0,

		ATTENTION_RADIUS: 50,
		DISTANCE_THRESHOLD: 5,
		SPAWN_POSITION_OFFSET: 20,

		initialize: function() {
			this.scene.addChild(this.view);

			if (party == CFG.SENTINEL.FLAG) {
				this.color = 0x00ff00;
			} else {
				this.color = 0xff0000;
			}
		},

		move: function() {
			if (!this.position) {
				var offset = {
					x: Math.random() * this.SPAWN_POSITION_OFFSET - this.SPAWN_POSITION_OFFSET / 2,
					y: Math.random() * this.SPAWN_POSITION_OFFSET - this.SPAWN_POSITION_OFFSET / 2
				};
				this.position = {
					x: this.lane[0].x + offset.x,
					y: this.lane[0].y + offset.y
				};
				this.nextLanePoint++;
				this.pointTowards(this.lane[this.nextLanePoint].x, this.lane[this.nextLanePoint].y)
			} else {
				if (this.goToPoint) {
					var dx = this.position.x - this.goToPoint.x,
						dy = this.position.y - this.goToPoint.y,
						distance = Math.sqrt(dx * dx + dy * dy);

					if (distance > this.DISTANCE_THRESHOLD) {
						this.position.x += this.direction.x * this.maxSpeed;
						this.position.y += this.direction.y * this.maxSpeed;
					} else {
						// reached that point
						this.nextLanePoint++;

						if (this.lane[this.nextLanePoint]) {
							this.pointTowards(this.lane[this.nextLanePoint].x, this.lane[this.nextLanePoint].y)
						} else {
							this.die();
						}
					}
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

		die: function() {
			this.scene.removeChild(this.view);
			this.view.clear();
			this.DEAD = true;
		},

		render: function() {
			this.view.clear();

			// radius
			this.view.beginFill(this.color, 0.15);
			this.view.drawCircle(this.position.x, this.position.y, this.ATTENTION_RADIUS);
			
			// npc
			this.view.beginFill(this.color, 1);
			this.view.drawRect(this.position.x - 3, this.position.y - 3, 6, 6);
		}
	};
}
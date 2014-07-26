'use strict';

function NPC(scene, lane, party, position) {
	return {
		scene: scene,
		view: new PIXI.Graphics(),
		color: 0x000000,

		position: position,
		speed: 0,
		maxSpeed: 4,
		acceleration: 0.1,
		slope: 0.25,

		party: party || 0,
		lane: lane,
		nextLanePoint: 0,

		DEAD: false,
		power: 100,
		STRENGTH: 10,

		ATTACK_RADIUS: 35,
		ATTENTION_RADIUS: 50,
		DISTANCE_THRESHOLD: 5,
		SPAWN_POSITION_OFFSET: 30,

		initialize: function() {
			if (party == CFG.SENTINEL.FLAG) {
				this.color = 0x00ff00;
			} else {
				this.color = 0xff0000;
			}

			this.ID = Math.round(Math.random() * 1000000);
			this.spawn();
			this.scene.addChild(this.view);
		},

		spawn: function() {
			var offset = {
				x: Math.random() * this.SPAWN_POSITION_OFFSET - this.SPAWN_POSITION_OFFSET / 2,
				y: Math.random() * this.SPAWN_POSITION_OFFSET - this.SPAWN_POSITION_OFFSET / 2
			};

			if (this.lane) {
				this.position = {
					x: this.lane[0].x + offset.x,
					y: this.lane[0].y + offset.y
				};

				this.nextLanePoint++;
				this.pointTowards(this.lane[this.nextLanePoint].x, this.lane[this.nextLanePoint].y);
			} else {
				this.ATTACK_RADIUS = this.ATTENTION_RADIUS;
			}
		},

		doAI: function(allNPCs) {
			if (this.lane) {
				this.ATTACKING = undefined;
				this.pointTowards(this.lane[this.nextLanePoint].x, this.lane[this.nextLanePoint].y);
			}
			
			// find NPC in ATTENTION_RADIUS
			for (var i = 0; i < allNPCs.length; i++) {
				if (allNPCs[i].ID !== this.ID && allNPCs[i].party !== this.party) {
					var dx = this.position.x - allNPCs[i].position.x,
						dy = this.position.y - allNPCs[i].position.y,
						distance = Math.sqrt(dx * dx + dy * dy);

					if (distance < this.ATTENTION_RADIUS) {
						this.ATTACKING = allNPCs[i];
					}
				}
			}

			if (this.ATTACKING) {
				var attackersPosition = this.ATTACKING.position;
				this.pointTowards(attackersPosition.x, attackersPosition.y);
				this.ATTACKING.power -= this.STRENGTH * (0.75 + Math.random() * 0.5);

				if (this.ATTACKING.power < 1) {
					this.ATTACKING.die();
				}
			}
		},

		move: function() {
			if (this.goToPoint) {
				var dx = this.position.x - this.goToPoint.x,
					dy = this.position.y - this.goToPoint.y,
					distance = Math.sqrt(dx * dx + dy * dy);

				if (this.ATTACKING) {
					if (distance < this.ATTACK_RADIUS) {

					} else {
						this.moveForwards();
					}
				} else {
					if (distance < this.DISTANCE_THRESHOLD) {
						// reached that point
						this.nextLanePoint++;

						if (this.lane[this.nextLanePoint]) {
							this.pointTowards(this.lane[this.nextLanePoint].x, this.lane[this.nextLanePoint].y);
						} else {
							this.die();
						}
					} else {
						this.moveForwards();
					}
				}
			}
		},

		moveForwards: function() {
						this.position.x += this.direction.x * this.maxSpeed;
						this.position.y += this.direction.y * this.maxSpeed;
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
			if (this.DEAD === false) {
				this.scene.removeChild(this.view);
				this.view.clear();
				this.DEAD = true;
			}
		},

		render: function() {
			this.view.clear();

			// radius
			this.view.beginFill(this.color, 0.05);
			this.view.drawCircle(this.position.x, this.position.y, this.ATTENTION_RADIUS);

			// radius
			this.view.beginFill(this.color, 0.05);
			this.view.drawCircle(this.position.x, this.position.y, this.ATTACK_RADIUS);

			// npc
			this.view.beginFill(this.color, 1);
			this.view.drawRect(this.position.x - 3, this.position.y - 3, 6, 6);
		}
	};
}
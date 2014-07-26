'use strict';

function NPC(scene, lane, party, position) {
	return {
		scene: scene,
		view: new PIXI.Graphics(),
		color: 0x000000,

		position: position,
		direction: {},
		speed: 0,
		maxSpeed: 4,
		acceleration: 0.1,
		slope: 0.25,

		initialPower: 100,
		power: 100,

		party: party || 0,
		lane: lane,
		nextLanePoint: 0,

		DEAD: false,
		ATTACK: 5,
		ATTACK_SPEED: 30,
		ATTACK_TIMEOUT: undefined,

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
			if (this.canMove()) {
				var offset = {
					x: Math.random() * this.SPAWN_POSITION_OFFSET - this.SPAWN_POSITION_OFFSET / 2,
					y: Math.random() * this.SPAWN_POSITION_OFFSET - this.SPAWN_POSITION_OFFSET / 2
				};

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

		canMove: function() {
			return (this.lane !== undefined);
		},

		doAI: function(allNPCs) {
			var newEnemy = this.findNextEnemyInAttentionRange(allNPCs);

			if (newEnemy) {
				this.ENEMY = newEnemy;
				if (this.enemyInAttackRange()) {
					if (!this.ATTACK_TIMEOUT) {
						this.attack();
					}
				}
			} else {
				this.ENEMY = undefined;
				if (this.canMove()) {
					if (this.lane[this.nextLanePoint]) {
						this.pointTowards(this.lane[this.nextLanePoint].x, this.lane[this.nextLanePoint].y);
					}
				}
			}
		},

		findNextEnemyInAttentionRange: function(allNPCs) {
			for (var i = 0; i < allNPCs.length; i++) {
				if (allNPCs[i].ID !== this.ID && allNPCs[i].party !== this.party) {
					var distance = CALC.getDistance(this.position.x, this.position.y, allNPCs[i].position.x, allNPCs[i].position.y);
					if (distance < this.ATTENTION_RADIUS) {
						return allNPCs[i];
					}
				}
			}
		},

		attack: function() {
			if (this.DEAD || this.ENEMY === undefined) {
				if (this.ATTACK_TIMEOUT) {
					clearTimeout(this.ATTACK_TIMEOUT);
				}
			} else {
				var attackChance = 0.75, // at least 75% damage, max 100%
					scope = this;

				this.ENEMY.power -= attackChance * this.ATTACK + Math.random() * (1 - attackChance);

				if (this.ENEMY.power < 1) {
					this.ENEMY.die();
					this.ENEMY = undefined;
				}

				this.ATTACK_TIMEOUT = setTimeout(function() {
					scope.attack();
				}, scope.ATTACK_SPEED);
			}
		},

		enemyInAttackRange: function() {
			var distanceToEnemy = CALC.getDistance(this.position.x, this.position.y, this.ENEMY.position.x, this.ENEMY.position.y);
			return (distanceToEnemy < this.ATTACK_RADIUS);
		},

		move: function() {
			if (this.canMove()) {
				if (this.ENEMY) {
					if (!this.enemyInAttackRange()) {
						this.pointTowards(this.ENEMY.position.x, this.ENEMY.position.y);
						this.moveStep();
					}
				} else {
					if (this.lane[this.nextLanePoint]) {
						this.pointTowards(this.lane[this.nextLanePoint].x, this.lane[this.nextLanePoint].y);
						this.moveStep();
					}
				}

				// always check if NPC made it to the next point
				if (this.lane[this.nextLanePoint]) {
					var distanceToNextLanePoint = CALC.getDistance(this.position.x, this.position.y, this.lane[this.nextLanePoint].x, this.lane[this.nextLanePoint].y);
					if (distanceToNextLanePoint < this.DISTANCE_THRESHOLD) {
						this.nextLanePoint++;
					}
				}
			}
		},

		moveStep: function() {
			this.position.x += this.direction.x * this.maxSpeed;
			this.position.y += this.direction.y * this.maxSpeed;
		},

		pointTowards: function(x, y) {
			this.direction = CALC.getVectorWithDirection(this.position.x, this.position.y, x, y);
		},

		die: function() {
			if (this.DEAD === false) {
				this.scene.removeChild(this.view);
				this.view.clear();
				this.DEAD = true;

				if (this.ATTACK_TIMEOUT) {
					clearTimeout(this.ATTACK_TIMEOUT);
				}
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

			// power bar
			var powerBarWidth = 30,
				powerBarHeight = 3,
				powerWidth = Math.round(this.power / this.initialPower * powerBarWidth);

			this.view.beginFill(0x444444);
			this.view.drawRect(this.position.x - powerBarWidth / 2, this.position.y - 15, powerBarWidth, powerBarHeight);
			this.view.beginFill(this.color);
			this.view.drawRect(this.position.x - powerBarWidth / 2, this.position.y - 15, powerWidth, powerBarHeight);

			// npc
			this.view.beginFill(this.color, 1);
			this.view.drawRect(this.position.x - 3, this.position.y - 3, 6, 6);
		}
	};
}
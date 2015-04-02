'use strict';

// will be inherited
var NPC = {
	construct: function(scene, fraction, config) {
		if (config === undefined) {
			config = {};
		}

		this.scene = scene;
		this.fraction = fraction;

		this.color = CFG.getColorForFraction(this.fraction);
		this.view = new PIXI.Graphics();
		this.position = config.position || {};

		this.initialPower = config.power;
		this.power = this.initialPower;

		this.dead = false;
		this.waiting = false;
		this.attackDamage = config.attackDamage;
		this.attackSpeed = config.attackSpeed;

		this.attackRadius = config.attackRadius;
		this.attentionRadius = config.attentionRadius;
		this.ID = Math.round(Math.random() * 1000000); // todo: put somewhere else

		this.scene.addChild(this.view);
		this.initialize();
	},

	initialize: function() {},

	update: function() {},

	handleBehaviour: function(allNPCs) {
		if (this.ENEMY) {
			if (this.ENEMY.dead) {
				this.ENEMY = undefined;
			} else {
				if (this.enemyInAttackRange() && this.waiting === false) {
					this.attack();
				}
			}
		} else {
			// look for enemies
			var newEnemy = this.findEnemyInAttentionRange(allNPCs);
			if (newEnemy) {
				this.ENEMY = newEnemy;
			}
		}
	},

	findEnemyInAttentionRange: function(allNPCs) {
		for (var i = 0; i < allNPCs.length; i++) {
			if (allNPCs[i].ID !== this.ID && allNPCs[i].fraction !== this.fraction && allNPCs[i].dead === false) {
				var distance = CALC.getDistance(this.position.x, this.position.y, allNPCs[i].position.x, allNPCs[i].position.y);
				if (distance < this.attentionRadius) {
					return allNPCs[i];
				}
			}
		}
	},

	attack: function() {
		if (this.dead === false && this.ENEMY.dead === false) {
			var attackChance = 0.75, // at least 75% damage, max 100%
				scope = this;

			this.ENEMY.power -= attackChance * this.attackDamage + Math.random() * (1 - attackChance);

			if (this.ENEMY.power < 1) {
				this.ENEMY.die();
				this.ENEMY = undefined;
			}

			this.waiting = true;
			setTimeout(function() {
				scope.waiting = false;
			}, this.attackSpeed);
		}
	},

	enemyInAttackRange: function() {
		var distanceToEnemy = CALC.getDistance(this.position.x, this.position.y, this.ENEMY.position.x, this.ENEMY.position.y);
		return (distanceToEnemy <= this.attackRadius);
	},

	pointTowards: function(x, y) {
		this.direction = CALC.getVectorWithDirection(this.position.x, this.position.y, x, y);
	},

	die: function() {
		if (this.dead === false) {
			this.scene.removeChild(this.view);
			this.view.clear();
			this.dead = true;
		}
	},

	render: function() {
		var transformedPosition = getPointInCanvasDimension(this.position);
		this.view.clear();

		if (this.ENEMY) {
			var enemyTransformedPosition = getPointInCanvasDimension(this.ENEMY.position);
			
			this.view.lineStyle(1, this.color, 1);
			this.view.moveTo(transformedPosition.x, transformedPosition.y);
			this.view.lineTo(enemyTransformedPosition.x, enemyTransformedPosition.y);
		}

		// power bar
		var powerBarWidth = 30,
			powerBarHeight = 3,
			powerWidth = Math.round(this.power / this.initialPower * powerBarWidth);

		this.view.beginFill(0x444444);
		this.view.drawRect(transformedPosition.x - powerBarWidth / 2, transformedPosition.y - 15, powerBarWidth, powerBarHeight);
		this.view.beginFill(this.color);
		this.view.drawRect(transformedPosition.x - powerBarWidth / 2, transformedPosition.y - 15, powerWidth, powerBarHeight);

		// npc
		this.view.beginFill(this.color, 1);
		this.view.drawRect(transformedPosition.x - 3, transformedPosition.y - 3, 6, 6);
	}
};
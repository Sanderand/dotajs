function Creep(scene, fraction, config, lane) {
	var newInstance = Object.create(NPC);

	newInstance.initialize = function() {
		this.lane = lane;
		this.positioningOffset = 50;
		this.distanceThreshold = 50;
		this.nextLanePoint = 1;
		this.speed = 3;
		this.direction = {};
		this.position = {
			x: this.lane[0].x + (Math.random() * this.positioningOffset - this.positioningOffset / 2),
			y: this.lane[0].y + (Math.random() * this.positioningOffset - this.positioningOffset / 2)
		};
		this.pointTowards(this.lane[this.nextLanePoint].x, this.lane[this.nextLanePoint].y);
	};

	newInstance.update = function() {
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
			if (distanceToNextLanePoint < this.distanceThreshold) {
				this.nextLanePoint++;
			}
		}
	};

	newInstance.moveStep = function() {
		this.position.x += this.direction.x * this.speed;
		this.position.y += this.direction.y * this.speed;
	};

	newInstance.construct(scene, fraction, config); // parent's constructor
	return newInstance;
}
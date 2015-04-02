'use strict';

var Game = {
	NPCs: [],
	me: new Player(),

	initialize: function() {
		this.setupPixi();
		this.setupObjects();
		this.setupEventListeners();

		// start the loop
		setInterval(this.loop.bind(this), 30);
	},

	setupPixi: function() {
		this.stage = new PIXI.Stage(0x888888);
		this.scene = new PIXI.DisplayObjectContainer();
		this.renderer = PIXI.autoDetectRenderer(width, height);
		this.stage.addChild(this.scene);

		// add canvas to dom
		document.body.appendChild(this.renderer.view);
	},

	setupObjects: function() {
		this.spawnTowers();
		this.spawnNPCs();
		this.spawnBases();
		this.scene.addChild(this.me.view);
	},

	spawnNPCs: function() {
		CFG.SENTINEL.LANES.forEach(function(lane) {
			this.spawnNPCsAtLane(lane, CFG.GAME.NPC_GROUPSIZE, CFG.SENTINEL.FLAG);
		}.bind(this));

		CFG.SCOURGE.LANES.forEach(function(lane) {
			this.spawnNPCsAtLane(lane, CFG.GAME.NPC_GROUPSIZE, CFG.SCOURGE.FLAG);
		}.bind(this));

		setTimeout(this.spawnNPCs.bind(this), CFG.GAME.SPAWN_INTERVAL);
	},

	spawnTowers: function() {
		CFG.SENTINEL.TOWERS.forEach(function(towerPostion) {
			this.spawnTower(towerPostion, CFG.SENTINEL.FLAG);
		}.bind(this));

		CFG.SCOURGE.TOWERS.forEach(function(towerPostion) {
			this.spawnTower(towerPostion, CFG.SCOURGE.FLAG);
		}.bind(this));
	},

	spawnTower: function(position, fraction) {
		this.NPCs.push(new Tower(this.scene, fraction, {
			position: position,
			power: CFG.GAME.TOWER.POWER,
			attackDamage: CFG.GAME.TOWER.ATTACK_DMG,
			attackSpeed: CFG.GAME.TOWER.ATTACK_SPEED,
			attackRadius: CFG.GAME.TOWER.ATTACK_RADIUS,
			attentionRadius: CFG.GAME.TOWER.ATTENTION_RADIUS
		}));
	},

	spawnNPCsAtLane: function(lane, amount, fraction) {
		for (var i = 0; i < amount; i++) {
			this.NPCs.push(new Creep(this.scene, fraction, {
				power: CFG.GAME.CREEP.POWER,
				attackDamage: CFG.GAME.CREEP.ATTACK_DMG,
				attackSpeed: CFG.GAME.CREEP.ATTACK_SPEED,
				attackRadius: CFG.GAME.CREEP.ATTACK_RADIUS,
				attentionRadius: CFG.GAME.CREEP.ATTENTION_RADIUS
			}, lane));
		}
	},

	spawnBases: function() {
		this.NPCs.push(new Base(this.scene, CFG.SENTINEL.FLAG, {
			power: CFG.GAME.BASE.POWER,
			position: CFG.SENTINEL.BASE
		}));

		this.NPCs.push(new Base(this.scene, CFG.SCOURGE.FLAG, {
			power: CFG.GAME.BASE.POWER,
			position: CFG.SCOURGE.BASE
		}));
	},

	setupEventListeners: function() {
		window.addEventListener('mouseup', function(e) {
			this.me.pointTowards(e.x, e.y);
		}.bind(this));
	},

	loop: function() {
		// get server input

		// update objects
		this.me.move(Input);
		this.updateNPCs();

		// handle collisions

		// render
		this.render();
	},

	updateNPCs: function() {
		// ai behaviour
		for (var i = 0; i < this.NPCs.length; i++) {
			this.NPCs[i].handleBehaviour(this.NPCs);
		}

		// update
		for (i = 0; i < this.NPCs.length; i++) {
			this.NPCs[i].update();
		}

		// check for events
		for (i = this.NPCs.length - 1; i >= 0; i--) {
			// deaths
			if (this.NPCs[i].dead === true) {
				// win
				if (this.NPCs[i].base === true) {
					console.debug(CFG.getNameForFraction(this.NPCs[i].fraction) + ' lost');
				}
				this.NPCs.splice(i, 1);
				window.console.debug('death');
			}
		}
	},

	render: function() {
		this.me.render();
		this.renderNPCs();

		this.renderer.render(this.stage);
	},

	renderNPCs: function() {
		this.NPCs.forEach(function(NPC) {
			NPC.render();
		});
	}
};

Game.initialize();
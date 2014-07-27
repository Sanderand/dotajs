'use strict';

var Game = {
	NPCs: [],
	me: new Player(),

	initialize: function() {
		this.setupPixi();
		this.setupObjects();
		this.setupEventListeners();

		// start the loop
		var scope = this;
		setInterval(function() {
			scope.loop();
		}, 30);
	},

	setupPixi: function() {
		this.stage = new PIXI.Stage(0x888888);
		this.scene = new PIXI.DisplayObjectContainer();
		this.renderer = PIXI.autoDetectRenderer(CFG.size, CFG.size);
		this.stage.addChild(this.scene);

		// add canvas to dom
		document.body.appendChild(this.renderer.view);
	},

	setupObjects: function() {
		// this.spawnTowers();
		this.spawnNPCs();
		this.spawnBases();
		this.scene.addChild(this.me.view);
	},

	spawnNPCs: function() {
		var scope = this;

		CFG.SENTINEL.LANES.forEach(function(lane) {
			scope.spawnNPCsAtLane(lane, CFG.GAME.NPC_GROUPSIZE, CFG.SENTINEL.FLAG);
		});

		CFG.SCOURGE.LANES.forEach(function(lane) {
			scope.spawnNPCsAtLane(lane, CFG.GAME.NPC_GROUPSIZE, CFG.SCOURGE.FLAG);
		});

		// setTimeout(function() {
		// 	scope.spawnNPCs();
		// }, 2500);
	},

	spawnTowers: function() {
		var scope = this;

		CFG.SENTINEL.TOWERS.forEach(function(towerPostion) {
			scope.spawnTower(towerPostion, CFG.SENTINEL.FLAG);
		});

		CFG.SCOURGE.TOWERS.forEach(function(towerPostion) {
			scope.spawnTower(towerPostion, CFG.SCOURGE.FLAG);
		});
	},

	spawnTower: function(position, fraction) {
		this.NPCs.push(new Tower(this.scene, fraction, {
			position: position,
			power: 1000,
			attackDamage: 20,
			attackSpeed: 200,
			attackRadius: 75,
			attentionRadius: 75
		}));
	},

	spawnNPCsAtLane: function(lane, amount, fraction) {
		for (var i = 0; i < amount; i++) {
			this.NPCs.push(new Creep(this.scene, fraction, {
				power: 100,
				attackDamage: 20,
				attackSpeed: 100,
				attackRadius: 30,
				attentionRadius: 50
			}, lane));
		}
	},

	spawnBases: function() {
		this.NPCs.push(new Base(this.scene, CFG.SENTINEL.FLAG, {
			power: 10000,
			position: CFG.SENTINEL.BASE
		}));

		this.NPCs.push(new Base(this.scene, CFG.SCOURGE.FLAG, {
			power: 10000,
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
					alert(CFG.getNameForFraction(this.NPCs[i].fraction) + ' lost');
				}
				this.NPCs.splice(i, 1);
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
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
		this.spawnTowers();
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

		setTimeout(function() {
			scope.spawnNPCs();
		}, 2500);
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

	spawnTower: function(position, party) {
		var newTower = new NPC(this.scene, undefined, party, position);
		newTower.initialize();
		this.NPCs.push(newTower);
	},

	spawnNPCsAtLane: function(lane, amount, party) {
		for (var i = 0; i < amount; i++) {
			var newNPC = new NPC(this.scene, lane, party);
			newNPC.initialize();
			this.NPCs.push(newNPC);
		}
	},

	spawnBases: function() {
		var newBase = new NPC(this.scene, undefined, CFG.SENTINEL.FLAG, CFG.SENTINEL.BASE);
		newBase.initialize();
		this.NPCs.push(newBase);

		newBase = new NPC(this.scene, undefined, CFG.SCOURGE.FLAG, CFG.SCOURGE.BASE);
		newBase.initialize();
		this.NPCs.push(newBase);
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
		// ai response
		for (var i = 0; i < this.NPCs.length; i++) {
			this.NPCs[i].doAI(this.NPCs);
		}

		// move
		for (i = 0; i < this.NPCs.length; i++) {
			this.NPCs[i].move();
		}

		// check for deaths
		for (i = this.NPCs.length - 1; i >= 0; i--) {
			if (this.NPCs[i].DEAD === true) {
				this.NPCs.splice(i, 1);
				// console.log('npc died; remaining = ' + this.NPCs.length);
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
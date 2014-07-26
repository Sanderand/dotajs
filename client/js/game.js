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
		this.renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
		this.stage.addChild(this.scene);

		// add canvas to dom
		document.body.appendChild(this.renderer.view);
	},

	setupObjects: function() {
		for (var i = 0; i < 1; i++) {
			var newNPC = new NPC();
			this.scene.addChild(newNPC.view);
			this.NPCs.push(newNPC);
		}

		this.scene.addChild(this.me.view);
	},

	setupEventListeners: function() {
		var asd = this;
		window.addEventListener('mouseup', function(e) {
			this.me.pointTowards(e.x, e.y);
		}.bind(this));
	},

	loop: function() {
		// get server input

		// update objects

		this.me.move(Input);
		this.NPCs.forEach(function(NPC) {
			NPC.move();
		});

		// render
		this.render();
	},

	render: function() {
		this.me.render();
		this.NPCs.forEach(function(NPC) {
			NPC.render();
		});
		this.renderer.render(this.stage);
	}
};

Game.initialize();
'use strict';

var Game = {
	initialize: function() {
		Input.initialize();
		this.setupPixi();

		// start the loop
		var scope = this;
		setInterval(function() {
			scope.loop();
		}, 150);
	},

	setupPixi: function() {
		this.stage = new PIXI.Stage(0x888888);
		this.renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
		this.scene = new PIXI.DisplayObjectContainer();

		// add canvas to dom
		document.body.appendChild(this.renderer.view);
	},

	loop: function() {
		console.log('render');

		// get server input
		// get user input
		// update objects
		// center player in center
		// render

		this.renderer.render(this.stage);
	},

	render: function() {

	}
};

Game.initialize();
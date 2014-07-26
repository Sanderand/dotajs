'use strict';

var Input = {
	pressed: {},

	W: 87,
	A: 65,
	S: 83,
	D: 68,

	isDown: function(keyCode) {
		return this.pressed[keyCode];
	},

	onKeydown: function(keyCode) {
		this.pressed[keyCode] = true;
	},

	onKeyup: function(keyCode) {
		delete this.pressed[keyCode];
	}
};

window.addEventListener('keyup', function(event) {
	Input.onKeyup(event.keyCode);
}, false);

window.addEventListener('keydown', function(event) {
	Input.onKeydown(event.keyCode);
}, false);
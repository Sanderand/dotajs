'use strict';

var Input = {
	keys: [{
		code: 87,
		name: 'w',
		state: false
	}, {
		code: 65,
		name: 'a',
		state: false
	}, {
		code: 83,
		name: 's',
		state: false
	}, {
		code: 68,
		name: 'd',
		state: false
	}],

	initialize: function() {
		var scope = this;

		window.addEventListener('keydown', function(e) {
			scope.onKeyDown(e.keyCode);
		}, true);

		window.addEventListener("keyup", function(e) {
			scope.onKeyUp(e.keyCode);
		}, true);

		'use strict';

console.info('Input: initialized');
	},

	onKeyDown: function(keyCode) {
		this.keys.forEach(function(key) {
			if (key.code == keyCode) {
				return key.state = true;
			}
		});
	},

	onKeyUp: function(keyCode) {
		this.keys.forEach(function(key) {
			if (key.code == keyCode) {
				return key.state = false;
			}
		});
	},

	isKeyPressed: function(keyName) {
		var result = false;

		this.keys.forEach(function(key) {
			if (key.name == keyName && key.state === true) {
				return result = true;
			}
		});

		return result;
	}
};
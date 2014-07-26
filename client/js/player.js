'use strict';

function Player(name, position) {
	return {
		name: name || 'noname',
		position: {
			x: 0,
			y: 0
		} || position,
		rotation: 0,
		speed: 1,
		acceleration: 0.1,
		slope: 0.25,

		foo: function() {
			console.log('hello world!');
		}
	};
}
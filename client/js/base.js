function Base(scene, fraction, config) {
	var newInstance = Object.create(NPC);

	newInstance.base = true;
	newInstance.update = function() {};
	newInstance.handleBehaviour = function() {};

	newInstance.construct(scene, fraction, config); // parent's constructor
	return newInstance;
}
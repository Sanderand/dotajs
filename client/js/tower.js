function Tower(scene, fraction, config) {
	var newInstance = Object.create(NPC);
	newInstance.construct(scene, fraction, config); // parent's constructor
	return newInstance;
}
module.exports = function () {
	let path = require('path')
	const moduleAlias = require('module-alias')
	moduleAlias.addAlias('@config', path.resolve('./config/'))
	moduleAlias.addAlias('@querySelector', path.resolve('./querySelector/'))
	const assert = require('chai').assert;

	let tolerance = {
		tolerance: 5,
		antialiasingTolerance: 8,
	}


	return {
		path,
		assert,
		moduleAlias,
		tolerance
	}
}

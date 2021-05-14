module.exports = function() {
	let path = require('path')
	const moduleAlias = require('module-alias')
	moduleAlias.addAlias('@config', path.resolve('./config/'))
	moduleAlias.addAlias('@querySelector', path.resolve('./querySelector/'))
	moduleAlias.addAlias('@api', path.resolve('./API/'))
	const assert = require('chai').assert

	let tolerance = {
		tolerance: 8,
		antialiasingTolerance: 4,
		allowViewportOverflow: true,
		captureElementFromTop: true,
		compositeImage: true,
		screenshotDelay: 10,
		ignoreElements: ['.spinner_block']
	}

	let server = {
		urls: {
			test: 'http://test.letbefit.ru/',
			testSpb: 'http://spbtest.letbefit.ru'
		},
		timeouts: {
			waitForShow: 1000
		}
	}

	return {
		path,
		assert,
		moduleAlias,
		tolerance,
		server
	}
}

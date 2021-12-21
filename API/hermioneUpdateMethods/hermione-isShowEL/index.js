const assert = require('assert')

module.exports = (hermione, opts) => {
	hermione.on(hermione.events.NEW_BROWSER, browser => {
		browser.addCommand('isShowLoader', (selector, time = 5000, msg) => {
			return browser
				.waitUntil(
					async function() {
						return await browser.isVisible(selector).then(data => {
							return data
						})
					},
					time,
					'Loader ERROR'
				)
				.waitUntil(
					async function() {
						return await browser.isVisible(selector).then(data => {
							return !data
						})
					},
					time,
					'Loader ERROR'
				)
		})
	})
}

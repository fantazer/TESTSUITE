const assert = require('assert')

module.exports = (hermione, opts) => {
	hermione.on(hermione.events.NEW_BROWSER, browser => {
		browser.addCommand('insertPhone', (selector, msg, data) => {
			return browser.then(() => {
				return (async () => {
					for (let item of data) {
						await browser.addValue(selector, item)
					}
				})()
			})
		})
	})
}

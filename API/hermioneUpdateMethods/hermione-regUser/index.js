const assert = require('assert')
let path = require('path')
const regUser = require(path.resolve('API/methods/system/regUser.js'))

module.exports = (hermione, opts) => {
	hermione.on(hermione.events.NEW_BROWSER, browser => {
		browser.addCommand('regUser', (data, msg) => {
			return browser.then(() => {
				return (async () => {
					return await regUser(data)
				})()
			})
		})
	})
}

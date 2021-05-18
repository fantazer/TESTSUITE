const assert = require('assert')
let path = require('path')
const getUser = require(path.resolve('API/methods/system/getUser.js'))

module.exports = (hermione, opts) => {
	hermione.on(hermione.events.NEW_BROWSER, browser => {
		browser.addCommand('getUser', (data, msg) => {
			return browser.then(() => {
				return (async () => {
					return await getUser(data)
				})()
			})
		})
	})
}

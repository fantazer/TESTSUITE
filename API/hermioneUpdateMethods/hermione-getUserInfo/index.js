const assert = require('assert')
let path = require('path')
const getUserInfo = require(path.resolve('API/methods/system/getUserInfo.js'))

module.exports = (hermione, opts) => {
	hermione.on(hermione.events.NEW_BROWSER, browser => {
		browser.addCommand('getUserInfo', (data, msg) => {
			return browser.then(() => {
				return (async () => {
					return await getUserInfo(data)
				})()
			})
		})
	})
}

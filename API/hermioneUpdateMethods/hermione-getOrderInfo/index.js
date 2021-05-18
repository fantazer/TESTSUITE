const assert = require('assert')
let path = require('path')
const getOrderInfo = require(path.resolve('API/methods/system/getOrderInfo.js'))

module.exports = (hermione, opts) => {
	hermione.on(hermione.events.NEW_BROWSER, browser => {
		browser.addCommand('getOrderInfo', (data, msg) => {
			return browser.then(() => {
				return (async () => {
					return await getOrderInfo(data)
				})()
			})
		})
	})
}

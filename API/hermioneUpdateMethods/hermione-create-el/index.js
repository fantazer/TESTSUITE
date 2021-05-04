const assert = require('assert')

module.exports = (hermione,opts)=>{
	hermione.on(hermione.events.NEW_BROWSER,(browser)=>{
		browser.addCommand("isElement",(selector,msg)=>{
			return browser.waitUntil(async function () {
					return await browser.$(selector).click()
				}, 10000, msg)
		})
	})
}
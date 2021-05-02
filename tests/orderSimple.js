const assert = require('chai').assert;
const config = require('../config/config.json');
const url = config.urls.client;
const actionSelf = require('../API/order');
const contractFormStart = require('../API/selector/contractFormStart.json')
const contractFormSuccessMSG = require('../API/selector/contractFormSuccessMSG.json')

const statement = [
		{
			"value":contractFormStart.sizes.size1,
			"name":"first",
			"cost":"990 руб"
		},
		{
			"value":contractFormStart.sizes.size2,
			"name":"second",
			"cost":"1000 руб"
		}
	]

describe('Test1', function () {
	statement.forEach((el)=>{
		it(el.name, function () {
		let browser = this.browser
		return browser.url(url.root)
				.waitForExist(contractFormStart.item, 50000)
				.scroll(contractFormStart.item)
				.click(el.value)
				.pause(2000)
				.setValue(contractFormStart.phoneSingle, contractFormStart.phoneVal)
				/*.then(() => {
					return actionSelf(browser, contractFormStart)
				})*/
				.pause(1000)
				.waitUntil(async function () {
					return await browser.$(contractFormStart.sandBtn).click()
				}, 10000, 'test')
				.pause(1000)
				.click(contractFormStart.modalGetOrderFast)
				.pause(1000)
				.waitForExist(contractFormSuccessMSG.head, 10000)
				.pause(1000)
				.getText(contractFormSuccessMSG.cost)
				.then(function (text) {
					assert.equal(text, '990 руб.')
				})
				.pause(1000)
				.assertView("el.name", '#header > div.content.content--mark.content--mobile-clear > div > div',
						{
							tolerance: 5,
							antialiasingTolerance: 8,
						}
				)
	});
	})

});

// hermione gui --update-refs
// selenium-standalone start
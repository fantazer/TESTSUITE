let path = require('path')
let mainConfig = require(path.resolve('mainConfig.js'))()
const query = require('@querySelector/mainPage/header.json')

describe('Header', function() {
	it('callBack', function() {
		let browser = this.browser
		return browser
			.url(mainConfig.server.urls.test + '?new')
			.waitForExist(query.callBack.callBackStart, 50000)
			.click(query.callBack.callBackStart)
			.pause(3000)
			.assertView(
				'callBackModal',
				query.callBack.callBackModal,
				mainConfig.tolerance
			)
			.setValue(query.callBack.callBackModalInput, '001000000')
			.click(query.callBack.callBackBtn)
			.pause(4000)
			.assertView(
				'callBackModalTrue',
				query.callBack.callBackModalTrue,
				mainConfig.tolerance
			)
			.getText(query.callBack.callBackModalTrueTitle)
			.then(function(text) {
				mainConfig.assert.equal(
					text,
					'Ваш запрос отправлен! Мы свяжемся с вами в ближайшее время'
				)
			})
			.pause(3000)
	})
})

// hermione gui --update-refs
// selenium-standalone start

/*
	Описание теста: Проверка "Перезвоните мне"
*/

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
			.pause(2000)
			.assertView(
				'callBackModal',
				query.callBack.callBackModal,
				mainConfig.tolerance
			)
			.insertPhone(query.callBack.callBackModalInput, false, query.phoneFalse)
			.pause(2000)
			.click(query.callBack.callBackBtn)
			.pause(2000)
			.assertView(
				'callBackPhoneFalse',
				query.callBack.callBackModal,
				mainConfig.tolerance
			)
			.pause(2000)
			.insertPhone(query.callBack.callBackModalInput, false, query.phoneTrue)
			.pause(2000)
			.click(query.callBack.callBackBtn)
			.pause(2000)
			.assertView(
				'callBackModalTrue',
				query.callBack.callBackModalTrue,
				mainConfig.tolerance
			)
	})
})

// hermione gui --update-refs
// selenium-standalone start

/*
	Описание теста: Проверка "Перезвоните мне"
*/

let path = require('path')
let mainConfig = require(path.resolve('mainConfig.js'))()
const query = require('@querySelector/mainPage/header.json')
const fakeData = require('@querySelector/fakeData.json')

for (let el in mainConfig.server.stateTest) {
	let serverState = mainConfig.server.stateTest[el]
	let serverStateURL = serverState.url
	describe(serverState.name, function() {
		hermione.skip.notIn('clientChrome', 'Only Desktop')
		describe('Header', function() {
			it('callBack', function() {
				let browser = this.browser
				return browser
					.url(serverStateURL)
					.waitForExist(query.callBack.callBackStart, 50000)
					.click(query.callBack.callBackStart)
					.pause(2000)
					.assertView(
						'callBackModal',
						query.callBack.callBackModal,
						mainConfig.tolerance
					)
					.insertPhone(
						query.callBack.callBackModalInput,
						false,
						fakeData.phoneFalse
					)
					.pause(2000)
					.click(query.callBack.callBackBtn)
					.pause(2000)
					.assertView(
						'callBackPhoneFalse',
						query.callBack.callBackModal,
						mainConfig.tolerance
					)
					.pause(2000)
					.insertPhone(
						query.callBack.callBackModalInput,
						false,
						fakeData.phoneTrue
					)
					.pause(2000)
					.click(query.callBack.callBackBtn)
					.pause(2000)
					.assertView(
						'callBackModalTrue',
						query.callBack.callBackModalTrue,
						mainConfig.tolerance
					)
					.then(() => {
						console.log('=== TEST Header/СallBack END TRUE ===')
					})
			})
		})
	})
}
// hermione gui --update-refs
// selenium-standalone start

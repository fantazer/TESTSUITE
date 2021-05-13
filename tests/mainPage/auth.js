/*
	Описание теста: Проверка Авторизации
*/

let path = require('path')
let mainConfig = require(path.resolve('mainConfig.js'))()

const query = require('@querySelector/mainPage/header.json')
const getUser = require('@api/methods/system/getUser.js')
const getUserInfo = require('@api/methods/system/getUserInfo.js')

describe('Header', function() {
	it('Auth', function() {
		let browser = this.browser
		return (
			browser
				.url(mainConfig.server.urls.test + '?new')
				.waitForExist(query.auth.authStart, 20000)
				.click(query.auth.authStart)
				.pause(2000)
				//Ввод телефона
				.assertView('enterAuth', query.auth.authModal, mainConfig.tolerance)
				.then(data => {
					return (async () => {
						let getUserVal = await getUser()
						//console.log(getUserVal)
						if (getUserVal.data === null) {
							for (item of getUserVal.phoneArray) {
								await browser.addValue(query.auth.authPhoneInput, item)
							}
						} else {
							throw new Error('Number is PRESENT')
						}
					})()
				})
				.pause(2000)
				.click(query.auth.authPhoneSendBtn)
				//Ввод Имени
				.isElement(query.auth.authNameInput, 'test isElement')
				.pause(2000)
				.assertView(
					'authModalName',
					query.auth.authModalName,
					mainConfig.tolerance
				)
				.setValue(query.auth.authNameInput, 'GEROME')
				.pause(1000)
				.click(query.auth.authNameSendBtn)
				//Ввод кода из CMC
				.pause(2000)
				.getCookie('SmsCode')
				.then(data => {
					console.log('======SMS======', data)
					return (async () => {
						await browser.setValue(query.auth.authSmsInput, data.value)
					})()
				})
				.click(query.auth.authSmsSendBtn)
				.pause(2000)
				.then(data => {
					return (async () => {
						let profileVal = await getUserInfo()
						console.log('===========')
						console.log(profileVal.id)
						console.log('===========')
						if (profileVal == undefined) {
							throw new Error('USER IS LOST')
						}
						return profileVal
					})()
				})
				.pause(2000)
		)
	})
})

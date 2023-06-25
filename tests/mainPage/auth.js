/*
	Описание теста: Проверка Авторизации
*/

let path = require('path')
let mainConfig = require(path.resolve('mainConfig.js'))()
const query = require('@querySelector/mainPage/header.json')

for (let el in mainConfig.server.stateTest) {
	let serverState = mainConfig.server.stateTest[el]
	let serverStateURL = serverState.url
	describe(serverState.name, function() {
		hermione.skip.notIn('clientChrome', 'Only Desktop')
		describe('Header', function() {
			it('Auth', function() {
				const generatePhone = require('@api/methods/system/generatePhone.js')
				let generatePhoneVal = generatePhone()
				let browser = this.browser
				return (
					browser
						.url(serverStateURL + '?ISTEST')
						.waitForExist(query.auth.authStart, 20000)
						.selectorExecute('.modal-filter', function(el) {
							return el[0].setAttribute('style', 'background-color: black;')
						})
						.click(query.auth.authStart)
						.pause(2000)
						//Ввод телефона
						.assertView('enterAuth', query.auth.authModal, mainConfig.tolerance)
						.getUser(generatePhoneVal.phone, false)
						.insertPhone(
							query.auth.authPhoneInput,
							false,
							generatePhoneVal.array
						)
						.pause(2000)
						.click(query.auth.authPhoneSendBtn)
						//Ввод Имени
						.isElement(query.auth.authNameInput, 'Enter Name')
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
							//console.log('======SMS======', data)
							return (async () => {
								await browser.setValue(query.auth.authSmsInput, data.value)
							})()
						})
						.click(query.auth.authSmsSendBtn)
						.pause(2000)
						.getUserInfo(generatePhoneVal.phone, false)
						.pause(2000)
						.then(() => {
							console.log('=== TEST Header/Auth END TRUE ===')
						})
				)
			})
		})
	})
}

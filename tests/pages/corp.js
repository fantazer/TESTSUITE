/*
	Описание теста: Проверка страницы /programmy/corp/
	- Скрин всей страницы
	- Проверка формы заявки
	- все поля пустые
	- неверный телефон
	- все поля заполнены
	- отправи формы
	- Проверка окна успеха
	- Скрин всей страницы
*/

let path = require('path')
let mainConfig = require(path.resolve('mainConfig.js'))()
const query = require('@querySelector/pages/pages.json')
const fakeData = require('@querySelector/fakeData.json')

for (let el in mainConfig.server.stateTest) {
	let serverState = mainConfig.server.stateTest[el]
	let serverStateURL = serverState.url + mainConfig.server.pages.corp.url
	describe(serverState.name, function() {
		describe('Pages', function() {
			it('Корпоративный заказ', function() {
				let browser = this.browser
				return (
					browser
						.url(serverStateURL)
						.url(serverStateURL + '?ISTEST')
						.windowHandleSize({width: 1920, height: 1024})
						.waitForExist('.page', 50000)
						.pause(2000)
						.assertView('page', '.page', {
							...mainConfig.tolerance,
							ignoreElements: [query.corp.items, query.corp.schedule]
						})

						//Сheck request form
						.click(query.corp.formBtn)
						.pause(1000)
						.assertView(
							'formInvalidation',
							query.corp.form,
							mainConfig.tolerance
						)

						//Set name
						.setValue(query.corp.name, 'GEROME')

						//Check false phone/mail
						.insertPhone(query.corp.phone, false, fakeData.phoneFalse)
						.click(query.corp.formBtn)
						.pause(1000)
						.assertView(
							'formInvalidationPhone',
							query.corp.form,
							mainConfig.tolerance
						)

						//Check true phone/mail
						.insertPhone(query.corp.phone, false, fakeData.phoneTrue)
						.click(query.corp.formBtn)

						//check modal
						.pause(3500)
						.assertView('modal', query.corp.modalTrue, {
							...mainConfig.tolerance
						})
						.click(query.corp.modalTrueBtn)
						.pause(2000)

						//finish
						.assertView('finish', '.page', mainConfig.tolerance)
						.pause(1000)
				)
			})
		})
	})
}
// hermione gui --update-refs
// selenium-standalone start

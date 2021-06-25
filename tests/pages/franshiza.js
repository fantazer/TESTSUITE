/*
	Описание теста: Проверка страницы /franshiza/
	- Скрин всей страницы
	- Авторизация тренера
	- скрин окна авторизации тренера
	- неверный телефон тренера
	- верный телефон тренера
	- ввод неверной sms
	- ввод верного sms
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
let urlPage =
	mainConfig.server.urls.test + mainConfig.server.pages.franshiza.url
const fakeData = require('@querySelector/fakeData.json')
describe('Pages', function() {
	it('Франшиза', function() {
		let browser = this.browser
		return (
			browser
				.url(urlPage)
				.url(urlPage + '?ISTEST')
				.windowHandleSize({width: 1920, height: 1024})
				.waitForExist('.page', 50000)
				.pause(2000)
				.assertView('page', '.page', mainConfig.tolerance)

				//Сheck request form
				.click(query.franshiza.formBtn)
				.pause(1000)
				.assertView(
					'formInvalidation',
					query.franshiza.form,
					mainConfig.tolerance
				)

				//Set name
				.setValue(query.franshiza.name, 'GEROME')

				//Check false phone/mail
				.insertPhone(query.franshiza.phone, false, fakeData.phoneFalse)
				.setValue(query.franshiza.mail, fakeData.mailFalse)
				.click(query.franshiza.formBtn)
				.pause(1000)
				.assertView(
					'formInvalidationMailPhone',
					query.franshiza.form,
					mainConfig.tolerance
				)

				//Check true phone/mail
				.insertPhone(query.franshiza.phone, false, fakeData.phoneTrue)
				.setValue(query.franshiza.mail, fakeData.mailTrue)
				.setValue(query.franshiza.text, fakeData.comment)
				.click(query.franshiza.formBtn)

				//check modal
				.pause(3500)
				.assertView('modal', query.franshiza.modalTrue, {
					...mainConfig.tolerance
				})
				.click(query.franshiza.modalTrueBtn)
				.pause(2000)

				//finish
				.assertView('finish', '.page', mainConfig.tolerance)
				.pause(1000)
		)
	})
})

// hermione gui --update-refs
// selenium-standalone start
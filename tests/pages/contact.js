/*
	Описание теста: Проверка страницы /contact/
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
let urlPage = mainConfig.server.urls.test + mainConfig.server.pages.contact.url
const fakeData = require('@querySelector/fakeData.json')
describe('Pages', function() {
	it('Контакты', function() {
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
				.click(query.contact.formBtn)
				.pause(1000)
				.assertView(
					'formInvalidation',
					query.contact.form,
					mainConfig.tolerance
				)

				//Set name
				.setValue(query.contact.name, 'GEROME')

				.setValue(query.contact.mail, fakeData.mailTrue)
				.setValue(query.contact.text, fakeData.comment)
				.click(query.contact.formBtn)

				//check modal
				.pause(3500)
				.assertView('modal', query.contact.modalTrue, {
					...mainConfig.tolerance
				})
				.click(query.contact.modalTrueBtn)
				.pause(2000)

				//finish
				.assertView('finish', '.page', mainConfig.tolerance)
				.pause(1000)
		)
	})
})

// hermione gui --update-refs
// selenium-standalone start

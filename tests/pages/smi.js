/*
	Описание теста: Проверка страницы /smi/
	- Скрин всей страницы
	- Проверка полей формы на валидацию
	- Отправка формы
*/

let path = require('path')
let mainConfig = require(path.resolve('mainConfig.js'))()
const query = require('@querySelector/pages/pages.json')
let urlPage = mainConfig.server.urls.test + mainConfig.server.pages.smi.url
const fakeData = require('@querySelector/fakeData.json')
describe('Pages', function() {
	it('СМИ', function() {
		let browser = this.browser
		return (
			browser
				.url(urlPage)
				.url(urlPage + '?ISTEST')
				.windowHandleSize({width: 1920, height: 1024})
				.waitForExist('.page', 50000)
				.pause(2000)
				.assertView('page', '.page', mainConfig.tolerance)
				//Check false form
				.click(query.SMI.formBtn)
				.pause(1000)
				.assertView('formFalse', query.SMI.form, mainConfig.tolerance)
				.pause(1000)
				//Set name
				.setValue(query.SMI.mail, fakeData.mailTrue)
				.pause(1000)
				.click(query.SMI.formBtn)
				//check modal
				.pause(2500)
				.assertView('modal', query.SMI.modalTrue, {
					...mainConfig.tolerance
				})
				.click(query.SMI.modalTrueBtn)
				.pause(2000)
				.assertView('finish', query.SMI.form, {
					...mainConfig.tolerance
				})
		)
	})
})

// hermione gui --update-refs
// selenium-standalone start